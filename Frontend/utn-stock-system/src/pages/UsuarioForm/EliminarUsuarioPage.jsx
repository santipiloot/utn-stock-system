import Button from "../../components/ui/Button"

export default function EliminarUsuarioPage({ usuario, onConfirmDelete, onClose }){
    if (!usuario){
        return (
            <div className="alert alert-danger" role="alert">
                Error: No se pudo cargar la información del usuario.
            </div>
        )
    }

    const handleDelete = () => {
        onConfirmDelete(usuario.id);
    }

    return (
        <div >
            <p>¿Estás seguro de que deseas eliminar el usuario <strong>{usuario.username}</strong>?</p>
            <div className="d-flex justify-content-end gap-2 mt-4">
                <Button variant="secondary" onClick={onClose}>Cancelar</Button>
                <Button variant="danger" onClick={handleDelete}>Sí, eliminar</Button>
            </div>
        </div>
    )
}