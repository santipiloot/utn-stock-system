from fastapi import APIRouter
from typing import List
from controllers import usuarios as ctrl
from models.usuarios import Usuarios, UsuariosIn

router = APIRouter()

@router.get("/", response_model = list[Usuarios])
async def get_usuarios():
    return await ctrl.listar_usuarios()

@router.post("/", response_model = dict)
async def post_usuario(usuario: UsuariosIn):
    return await ctrl.crear_usuario(usuario)

@router.put("/{id}", response_model = dict)
async def put_usuario(id: int, usuario: UsuariosIn):
    return await ctrl.actualizar_usuario(id, usuario)

@router.delete("/{id}", response_model = dict)
async def delete_usuario(id: int):
    return await ctrl.eliminar_usuario(id)

