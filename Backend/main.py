from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from database import db
from routes import productos, categorias, usuarios, ventas, movimientos

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"], 
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(productos.router)
app.include_router(categorias.router)
app.include_router(usuarios.router)
app.include_router(ventas.router)
app.include_router(movimientos.router)

@app.on_event("startup")
async def startup():
    await db.connect()

@app.on_event("shutdown")
async def shutdown():
    await db.disconnect()