import { useState, useEffect, useMemo } from "react";
import Button from "../../components/ui/Button";

function PaginaVenta() {
  const [productos, setProductos] = useState([]);
  const [carrito, setCarrito] = useState([]);

  const usuario_id = 1;

  const getProductos = async () => {
    try {
      const response = await fetch("http://localhost:8000/productos");
      if (!response.ok) throw new Error("No se pudieron cargar los productos");
      const data = await response.json();
      setProductos(data);
    } catch (error) {
      console.error("Error fetching productos:", error);
      alert(error.message);
    }
  };

  useEffect(() => {
    getProductos();
  }, []);

  const agregarACarrito = (producto) => {
    setCarrito((prevCarrito) => {
      const productoExistente = prevCarrito.find((item) => item.id === producto.id);
      if (productoExistente) {
        // Si ya existe, incrementa la cantidad
        return prevCarrito.map((item) =>
          item.id === producto.id ? { ...item, cantidad: item.cantidad + 1 } : item
        );
      } else {
        // Si no existe, lo agrega con cantidad 1
        return [...prevCarrito, { ...producto, cantidad: 1 }];
      }
    });
  };

  const modificarCantidad = (productoId, cantidad) => {
    setCarrito((prevCarrito) =>
      prevCarrito
        .map((item) =>
          item.id === productoId ? { ...item, cantidad: item.cantidad + cantidad } : item
        )
        .filter((item) => item.cantidad > 0) // Elimina el item si la cantidad es 0
    );
  };

  const totalCarrito = useMemo(() => {
    return carrito.reduce((total, item) => total + item.precio_venta * item.cantidad, 0);
  }, [carrito]);

  const confirmarVenta = async () => {
    if (carrito.length === 0) {
      alert("El carrito está vacío.");
      return;
    }

    try {
      // 1. Crear la movimiento para obtener el ID
      const resMovimiento = await fetch(`http://localhost:8000/movimientos/${usuario_id}`);
      if (!resMovimiento.ok) throw new Error("Error al crear el movimiento.");
      const movimientoId = await resMovimiento.json();

      // 2. Agregar cada item del carrito a la movimiento
      for (const item of carrito) {
        const itemParaAgregar = {
          movimientoId: movimientoId,
          productoId: item.id,
          cantidad: item.cantidad,
        };
        const resItem = await fetch("http://localhost:8000/detalle/agregar-producto", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(itemParaAgregar),
        });
        if (!resItem.ok) {
          const errorData = await resItem.json();
          throw new Error(`Error al agregar ${item.nombre}: ${errorData.detail}`);
        }
      }

      alert("Venta confirmada con éxito!");
      // 3. Limpiar el estado y recargar productos
      setCarrito([]);
      getProductos();
    } catch (error) {
      console.error("Error al confirmar la venta:", error);
      alert(error.message);
    }
  };

  return (
    <div className="container-fluid mt-4">
      <div className="row">
        {/* Columna de Productos */}
        <div className="col-md-5">
          <h3>Productos</h3>
          <div style={{ height: "75vh", overflowY: "auto" }}>
            <table className="table table-sm table-hover">
              <thead className="table-light">
                <tr>
                  <th>Nombre</th>
                  <th>Precio</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {productos.map((prod) => (
                  <tr key={prod.id}>
                    <td>{prod.nombre}</td>
                    <td>${prod.precio_venta.toFixed(2)}</td>
                    <td>
                      <button className="btn btn-success btn-sm py-0 px-2" onClick={() => agregarACarrito(prod)}>+</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Columna de Carrito */}
        <div className="col-md-7">
          <h3>Carrito</h3>
          <table className="table">
            <thead className="table-primary">
              <tr>
                <th>Producto</th>
                <th>Cantidad</th>
                <th>P. Unit.</th>
                <th>Total</th>
              </tr>
            </thead>
            <tbody>
              {carrito.map((item) => (
                <tr key={item.id}>
                  <td>{item.nombre}</td>
                  <td>
                    <button className="btn btn-outline-secondary btn-sm py-0 px-2" onClick={() => modificarCantidad(item.id, -1)}>-</button>
                    <span className="mx-2">{item.cantidad}</span>
                    <button className="btn btn-outline-secondary btn-sm py-0 px-2" onClick={() => modificarCantidad(item.id, 1)}>+</button>
                  </td>
                  <td>${item.precio_venta.toFixed(2)}</td>
                  <td>${(item.precio_venta * item.cantidad).toFixed(2)}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <hr />
          <div className="text-end">
            <h3>Total: ${totalCarrito.toFixed(2)}</h3>
            <Button clase="btn btn-primary" onClick={confirmarVenta} texto="Confirmar Venta">
              Confirmar Venta
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PaginaVenta;