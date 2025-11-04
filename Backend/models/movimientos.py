from pydantic import BaseModel

class Novimiento(BaseModel):
    id: int
    id_producto: int
    cantidad: int
    total_venta: float
    ventas_id: int
    tipo: enumerate

class MovimientoIn(BaseModel):
    id_producto: int
    cantidad: int
    total_venta: float
    ventas_id: int
    tipo: enumerate