from fastapi import APIRouter
from typing import List
from controllers import productos as ctrl 
from models.productos import Producto, ProductoIn

router = APIRouter(prefix="/productos", tags=["productos"])

@router.get("/")
async def get_productos():
    return await ctrl.listar_productos()

@router.post("/", response_model=dict)
async def post_producto(producto: ProductoIn):
    return await ctrl.crear_producto(producto)

@router.delete("/{id}", response_model=dict)
async def delete_producto(id: int):
    return await ctrl.eliminar_producto(id)

@router.put("/{id}", response_model=dict)
async def put_producto(id: int, producto: ProductoIn):
    return await ctrl.actualizar_producto(id, producto)
