from typing import List
from fastapi import APIRouter
from models.detalles import AgregarProducto, EliminarProducto, Item
import controllers.detalles as ctrl

router = APIRouter()

@router.post("/agregar-producto", response_model=List[Item])
async def add_item(item: AgregarProducto):
    return await ctrl.AgregarProducto(item)


@router.post("/quitar-producto", response_model=List[Item])
async def remove_item(item: EliminarProducto):
    return await ctrl.EliminarProducto(item)
