from fastapi import HTTPException
from database import db

async def crear_movimiento(usuario_id: int) -> int:
    sp_query= "CALL sp_agregarMovimiento(:usuario_id);"
    row = await db.fetch_one(sp_query, values = {"usuario_id": usuario_id})
    
    if not row or not row["movimiento_id"]:
        raise HTTPException(status_code=500, detail="Error al crear el movimiento")

    return row["movimiento_id"]