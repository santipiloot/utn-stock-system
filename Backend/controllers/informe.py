from fastapi import HTTPException
from database import db

async def informe_semanal():
    query = """
        SELECT
            m.fecha,
            p.nombre AS producto_nombre,
            c.nombre AS categoria_nombre,
            SUM(d.cantidad) AS cantidad_vendida,
            u.nombre AS usuario_nombre,
            SUM(d.cantidad * d.precio) AS ingresos_generados
        FROM movimientos m
        JOIN usuarios u ON m.usuario_id = u.id
        JOIN detalles d ON m.id = d.movimiento_id
        JOIN productos p ON d.producto_id = p.id
        JOIN categorias c ON p.categoria_id = c.id
        WHERE m.fecha >= CURDATE() - INTERVAL 7 DAY
        GROUP BY m.fecha, p.nombre, c.nombre, u.nombre
        ORDER BY m.fecha DESC, ingresos_generados DESC;
    """
    resultados = await db.fetch_all(query)
    if not resultados:
        raise HTTPException(status_code=404, detail="No se encontraron datos para el informe")
    return resultados

async def informe_ventas():
    
    query = """
        SELECT
            p.nombre AS producto_nombre,
            SUM(d.cantidad) AS total_vendido,
            SUM(d.cantidad * d.precio) AS ingresos_totales
        FROM detalles d
        JOIN productos p ON d.producto_id = p.id
        GROUP BY p.nombre
        ORDER BY total_vendido DESC;
    """
    resultados = await db.fetch_all(query)
    if not resultados:
        raise HTTPException(status_code=404, detail="No se encontraron datos para el informe de productos más vendidos")
    return resultados

async def informe_ventas_usuarios():
    query = """
        SELECT
            u.nombre AS usuario_nombre,
            COUNT(DISTINCT m.id) AS numero_de_ventas,
            COALESCE(SUM(d.cantidad * d.precio), 0) AS ingresos_totales
        FROM usuarios u
        LEFT JOIN movimientos m ON u.id = m.usuario_id
        LEFT JOIN detalles d ON m.id = d.movimiento_id
        GROUP BY u.id, u.nombre
        ORDER BY ingresos_totales DESC;
    """
    resultados = await db.fetch_all(query)
    # No se lanza un error si no hay resultados, ya que siempre devolverá los usuarios.
    return resultados