from typing import List
from fastapi import APIRouter
from controllers import informe as ctrl

router = APIRouter()

@router.get("/informe-semanal")
async def get_informe_semanal():
    return await ctrl.informe_semanal()

@router.get("/informe-ventas")
async def get_informe_ventas():
    return await ctrl.informe_ventas()

@router.get("/informe-ventas-usuarios")
async def get_informe_ventas_usuarios():
    return await ctrl.informe_ventas_usuarios()