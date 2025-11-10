from pydantic import BaseModel

class AgregarProducto(BaseModel):
    movimientoId: int
    productoId: int
    cantidad: int

class EliminarProducto(BaseModel):
    movimientoId: int
    productoId: int
    
class Item(BaseModel):
    movimiento_id: int
    producto_id: int
    cantidad: int
    descripcion: str
    precio_unitario: float
    importe: float