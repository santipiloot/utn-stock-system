from pydantic import BaseModel

class Ventas(BaseModel):
    id: int
    usuario_id: int
    fecha: str
    total: float

class VentasIn(BaseModel):
    usuario_id: int
    fecha: str
    total: float