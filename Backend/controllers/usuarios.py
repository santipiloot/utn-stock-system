from database import db
from fastapi import HTTPException
from models.usuarios import UsuariosIn

async def listar_usuarios():
    query = "SELECT id, nombre, username FROM usuarios"
    return await db.fetch_all(query)

async def crear_usuario(usuario: UsuariosIn):
    query = "INSERT INTO usuarios (nombre, username, contrsena) VALUES (:nombre, :username, :contrasena)"
    await db.execute(query, {"nombre": usuario.nombre, "username": usuario.username, "contrasena": usuario.contrasena})
    return {"message": "Usuario creado correctamente"}

async def actualizar_usuario(id: int, usuario: UsuariosIn):
    query = "UPDATE usuarios SET nombre = :nombre, username = :username, contrasena = :contrasena WHERE id = :id"
    result = await db.execute(query, {"id":id, "nombre": usuario.nombre, "username": usuario.username, "contaseña": usuario.contrasena})
    if not result:
        raise HTTPException(status_code = 404, message = "Usuario no encontrado")
    return {"message": f"Usuario {id} actualizado correctamente"}

async def eliminar_usuario(id:int):
    query = "DELETE FROM usuarios WHERE id = :id"
    result = await db.execute(query, {"id": id})
    if not result:
        raise HTTPException(status_code = 404, message = "Usuario no encontrado")