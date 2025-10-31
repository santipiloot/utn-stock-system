from fastapi import HTTPException
from database import db
from models.categorias import CategoriaIn

async def listar_categorias():
    query = "SELECT id, nombre FROM categorias"
    return await db.fetch_all(query)

async def crear_categoria(categoria: CategoriaIn):
    query = "INSERT INTO categorias (nombre) VALUES (:nombre)"
    await db.execute(query, {"nombre": categoria.nombre})
    return {"message": "Categoría creada correctamente"}

async def actualizar_categoria(id: int, categoria: CategoriaIn):
    query = "UPDATE categorias SET nombre = :nombre WHERE id = :id"
    result = await db.execute(query, {"id": id, "nombre": categoria.nombre})
    if not result:
        raise HTTPException(status_code=404, detail="Categoría no encontrada")
    return {"message": f"Categoría {id} actualizada correctamente"}

async def eliminar_categoria(id: int):
    query = "DELETE FROM categorias WHERE id = :id"
    result = await db.execute(query, {"id": id})
    if not result:
        raise HTTPException(status_code=404, detail="Categoría no encontrada")
    return {"message": f"Categoría {id} eliminada correctamente"}
