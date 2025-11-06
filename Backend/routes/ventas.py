from fastapi import APIRouter
from typing import List
from controllers import ventas as ctrl
from models.ventas import Ventas, VentasIn

router = APIRouter(prefix = "/ventas", tags = ["ventas"])

@router.get("/", response_model = list[Ventas])
async def get_ventas():
    return await ctrl.listar_ventas()

@router.post("/", response_model = dict)
async def post_venta(venta: VentasIn):
    return await ctrl.crear_venta(venta)

@router.put("/{id}", response_model = dict)
async def put_venta(id: int, venta: VentasIn):
    return await ctrl.actualizar_venta(id, venta)

@router.delete("/{id}", response_model = dict)
async def delete_venta(id: int):
    return await ctrl.eliminar_venta(id)