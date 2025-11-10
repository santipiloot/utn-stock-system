from fastapi import HTTPException
from database import db
from models.detalles import AgregarProducto, EliminarProducto

async def add_item(item: AgregarProducto):
    query = "CALL sp_agregar_producto_detalle(:movimientoId, :productoId, :cantidad);"
    rows = await db.fetch_all(query=query, values=item.dict())
    
    resultado = dict(rows[0])
    
    if resultado.get("tipo") == "ERROR":
        raise HTTPException(status_code=400, detail=resultado.get("mensaje"))
    return rows

async def remove_item(item: EliminarProducto):
    query = "CALL sp_eliminar_producto_detalle(:movimientoId, :productoId);"
    rows = await db.fetch_all(query=query, values=item.dict())
    return rows
    