import { useState, useEffect, useMemo } from "react";
import Button from "../../components/ui/Button";

function VentaProductoPage() {
  const [productos, setProductos] = useState([]);
  const [carrito, setCarrito] = useState([]);
  const [movimientoId, setMovimientoId] = useState(null);


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

  const getMovimiento = async () => {
    try {
      const resMovimiento = await fetch(`http://localhost:8000/movimientos/${usuario_id}`);
      if (!resMovimiento.ok) throw new Error("Error al crear un nuevo movimiento de venta.");
      const data = await resMovimiento.json();
      setMovimientoId(data); 
      setCarrito([]); 
    } catch (error) {
      console.error("Error fetching movimiento:", error);
      alert(error.message);
    }
  };

  useEffect(() => {
    // 
    getMovimiento();
    getProductos();
  }, []);

  const agregarACarrito = async (producto) => {
    if (!movimientoId || producto.stock <= 0) {
      alert("No se ha podido obtener el movimiento de venta.");
      return;
    }
    const itemParaAgregar = {
      movimientoId: movimientoId,
      productoId: producto.id,
      cantidad: 1
    };

    const response = await fetch("http://localhost:8000/detalle/agregar-producto", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(itemParaAgregar),
    });
    const data = await response.json();
    // if (!response.ok) {
    //   alert(data.detail);
    //   return;
    // }
    setCarrito(data);
    getProductos();
  };

  const quitarDelCarrito = async (productoId) => {
    if (!movimientoId) {
      alert("No se ha podido obtener el movimiento de venta.");
      return;
    }
    const itemParaQuitar = {
      movimientoId: movimientoId,
      productoId: productoId,
    };

    const response = await fetch("http://localhost:8000/detalle/quitar-producto", {
        method: 'POST', 
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(itemParaQuitar),
    });

    const data = await response.json();
    if (!response.ok) {
        alert(data.detail || "Error al quitar el producto del carrito.");
        return;
    }
    setCarrito(data);
    getProductos();
  };

  const totalCarrito = useMemo(() => {
    return carrito.reduce((total, item) => total + item.importe, 0);
  }, [carrito]);

  const confirmarVenta = async () => {
    if (carrito.length === 0) {
      alert("El carrito está vacío.");
      return;
    }

    try {
      alert("Venta confirmada con éxito!");

      setCarrito([]);
      setMovimientoId(null);
      getProductos();
      // Get a new movement for the next sale.
      getMovimiento();
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
                  <th>Stock</th>
                  <th>Precio</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {productos.map((prod) => (
                  <tr key={prod.id} className={prod.stock <= 0 ? "table-danger" : ""}>
                    <td>{prod.nombre}</td>
                    <td>{prod.stock}</td>
                    <td>${prod.precio_venta.toFixed(2)}</td>
                    <td>
                      <button className="btn btn-success btn-sm py-0 px-2" onClick={() => agregarACarrito(prod)} disabled={prod.stock <= 0}>+</button>
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
                <th>P. Unit.</th>
                <th className="text-center">Cantidad</th>
                <th>Importe</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {carrito.map((item) => (
                <tr key={item.producto_id}>
                  <td>{item.descripcion}</td>
                  <td>${item.precio_unitario.toFixed(2)}</td>
                  <td className="text-center">
                    <span className="mx-2">{item.cantidad}</span>
                  </td>
                  <td>${item.importe.toFixed(2)}</td>
                  <td>
                    <Button className="btn btn-danger btn-sm" onClick={() => quitarDelCarrito(item.producto_id)}>Quitar</Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <hr />
          <div className="text-end">
            <h3>Total: ${totalCarrito.toFixed(2)}</h3>
            <Button className="btn btn-primary" onClick={confirmarVenta} disabled={carrito.length === 0}>
              Confirmar Venta
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default VentaProductoPage;