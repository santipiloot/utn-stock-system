from pydantic import BaseModel

class Categoria(BaseModel):
    id: int
    nombre: str

class CategoriaIn(BaseModel):
    nombre: str