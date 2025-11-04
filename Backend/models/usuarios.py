from pydantic import BaseModel

class Usuarios(BaseModel):
    id: int
    nombre: str
    username: str
    contrasena: str

class UsuariosIn(BaseModel):
    nombre: str
    username: str
    contrasena: str