from database import db
from models.productos import ProductoIn
from fastapi import HTTPException

async def listar_productos():
    query = """
        SELECT id, nombre, categoria_id, descripcion, stock, precio_compra, precio_venta
        FROM productos
    """
    return await db.fetch_all(query)

async def crear_producto(producto: ProductoIn):
    query = """
        INSERT INTO productos (nombre, categoria_id, descripcion, stock, precio_compra, precio_venta)
        VALUES (:nombre, :categoria_id, :descripcion, :stock, :precio_compra, :precio_venta)
    """
    values = producto.dict()
    await db.execute(query, values)
    return {"message": "Producto creado correctamente"}

async def eliminar_producto(id: int):
    query = "DELETE FROM productos WHERE id = :id"
    result = await db.execute(query, {"id": id})
    if not result:
        raise HTTPException(status_code=404, detail="Producto no encontrado")
    return {"message": f"Producto {id} eliminado correctamente"}

async def actualizar_producto(id: int, producto: ProductoIn):
    query = """
        UPDATE productos
        SET nombre = :nombre,
            categoria_id = :categoria_id,
            descripcion = :descripcion,
            stock = :stock,
            precio_compra = :precio_compra,
            precio_venta = :precio_venta
        WHERE id = :id
    """
    values = {"id": id, **producto.dict()}
    await db.execute(query, values)
    return {"message": f"Producto {id} actualizado correctamente"}
