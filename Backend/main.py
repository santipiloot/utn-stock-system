from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from database import db
from routes import productos, categorias, usuarios, movimientos, detalles, informes

app = FastAPI()

origenes = ["http://localhost:5173",  "http://localhost:8000" , "*"]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origenes, 
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(productos.router, prefix = "/productos")
app.include_router(categorias.router, prefix = "/categorias")
app.include_router(usuarios.router, prefix = "/usuarios")
app.include_router(movimientos.router, prefix = "/movimientos")
app.include_router(detalles.router, prefix = "/detalle")
app.include_router(informes.router, prefix = "/informes")

@app.on_event("startup")
async def startup():
    await db.connect()

@app.on_event("shutdown")
async def shutdown():
    await db.disconnect()