from pydantic import BaseModel

class Producto(BaseModel):
    id: int
    nombre: str
    categoria_id: int
    descripcion: str
    stock: int
    precio_compra: float
    precio_venta: float

class ProductoIn(BaseModel):
    nombre: str
    categoria_id: int
    descripcion: str
    stock: int
    precio_compra: float
    precio_venta: float
