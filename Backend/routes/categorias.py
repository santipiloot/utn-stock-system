from fastapi import APIRouter
from typing import List
from controllers import categorias as ctrl
from models.categorias import Categoria, CategoriaIn

router = APIRouter(prefix="/categorias", tags=["categorias"])

@router.get("/", response_model=List[Categoria])
async def get_categorias():
    return await ctrl.listar_categorias()

@router.post("/", response_model=dict)
async def post_categoria(categoria: CategoriaIn):
    return await ctrl.crear_categoria(categoria)

@router.put("/{id}", response_model=dict)
async def put_categoria(id: int, categoria: CategoriaIn):
    return await ctrl.actualizar_categoria(id, categoria)

@router.delete("/{id}", response_model=dict)
async def delete_categoria(id: int):
    return await ctrl.eliminar_categoria(id)
