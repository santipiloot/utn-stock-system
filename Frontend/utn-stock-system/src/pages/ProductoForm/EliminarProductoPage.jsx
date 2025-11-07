import Button from "../../components/ui/Button"

export default function EliminarProductoPage({ producto, onConfirmDelete, onClose }){
    if (!producto){
        return (
            <div className="alert alert-danger" role="alert">
                Error: No se pudo cargar la información del producto.
            </div>
        )
    }

    const handleDelete = () => {
        onConfirmDelete(producto.id);
    }

    return (
        <div >
            <p>¿Estás seguro de que deseas eliminar el producto <strong>{producto.nombre}</strong>?</p>
            <div className="d-flex justify-content-end gap-2 mt-4">
                <Button variant="secondary" onClick={onClose}>Cancelar</Button>
                <Button variant="danger" onClick={handleDelete}>Sí, eliminar</Button>
            </div>
        </div>
    )
}