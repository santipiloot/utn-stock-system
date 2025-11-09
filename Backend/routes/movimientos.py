from fastapi import APIRouter
import controllers.movimientos as ctrl

router = APIRouter()

@router.get("/{usuario_id}", response_model=int)
async def crear_movimiento(usuario_id: int):
    return await ctrl.crear_movimiento(usuario_id)