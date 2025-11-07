export default function VistaProductoPage({ producto, onClose }){

    if (!producto) {
        return (
            <div className="alert alert-danger" role="alert">
                Error: No se pudieron cargar los detalles del producto.
            </div>
        );
    }

    return (
        <div className="card shadow-sm h-100">
            <div className="card-body">
                <h5 className="card-title">{producto.nombre}</h5>
                <p className="mb-1">{producto.descripcion}</p>
            </div>
        </div>
    )
}