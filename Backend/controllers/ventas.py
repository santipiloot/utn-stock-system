from fastapi import HTTPException
from database import db
from models.ventas import VentasIn

async def listar_ventas():
    query = "SELECT id, usuario_id, fecha, total FROM ventas"
    return await db.fetch_all(query)

async def crear_venta(venta: VentasIn):
    query = "INSERT INTO ventas (usuario_id, fecha, total) VALUES (:usuario_id, :fecha, :total)"
    values = venta.dict()
    await db.execute(query, values)
    return {"message": "Venta creada correctamente"}

async def actualizar_venta(id: int, venta: VentasIn):
    query = "UPDATE ventas SET usuario_id = :usuario_id, fecha = :fecha, total = :total WHERE id = :id"
    values = {"id": id, **venta.dict()}
    result = await db.execute(query, values)
    if not result:
        raise HTTPException(status_code=404, detail="Venta no encontrada")
    return {"message": f"Venta {id} actualizada correctamente"}

async def eliminar_venta(id: int):
    query = "DELETE FROM ventas WHERE id = :id"
    result = await db.execute(query, {"id": id})
    if not result:
        raise HTTPException(status_code=404, detail="Venta no encontrada")
    return {"message": f"Venta {id} eliminada correctamente"}