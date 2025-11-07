import Button from "../ui/Button";

export default function TablaProductos({ productos, onView, onEdit, onDelete }){
    if (!productos || productos.length === 0){
        return <p className="text-center mt-4">No hay productos disponibles.</p>;
    }

    return (
        <div className="table-responsive">
            <table className="table table-hover align-middle">
                <thead className="table-light">
                    <tr>
                        <th>Producto</th>
                        <th className="text-center">Stock</th>
                        <th className="text-center">Categoría</th>
                        <th className="text-center">Compra</th>
                        <th className="text-center">Venta</th>
                        <th className="text-center">Acciones</th>
                    </tr>
                </thead>

                <tbody>
                    {productos.map((p) => (
                        <tr key={p.id}>
                            <td>{p.nombre}</td>
                            <td className="text-center">{p.stock}</td>
                            <td className="text-center">{p.categoria}</td>
                            <td className="text-center">{p.precioCompra}</td>
                            <td className="text-center">{p.precioVenta}</td>
                            <td className="text-center">
                                <div className="d-flex justify-content-center gap-2">
                                    <Button variant="info" onClick={() => onView(p.id)}>Ver</Button>
                                    <Button variant="danger" onClick={() => onDelete(p.id)}>Eliminar</Button>
                                    <Button variant="primary" onClick={() => onEdit(p.id)}>Editar</Button>
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}