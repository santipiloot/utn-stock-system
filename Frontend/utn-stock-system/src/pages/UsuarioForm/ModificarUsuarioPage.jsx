import { useState, useEffect } from "react";
import Button from "../../components/ui/Button";

export default function ModificarUsuarioPage({ usuario, onConfirmEdit, onClose }){
    const [formData, setFormData] = useState({
        id: '',
        nombre: usuario?.nombre || '',
        username: usuario?.username || ''
    });

    useEffect(() => {
        // Este efecto se encarga de actualizar el formulario cuando el usuario cambia.
        if (usuario) {
            setFormData({
                nombre: usuario.nombre || '',
                username: usuario.username || ''
            });
        }
    }, [usuario]); // Se ejecuta si el usuario cambia.

    if (!usuario){
        return (
            <div className="alert alert-danger" role="alert">
                Error: No se pudo cargar la información del usuario.
            </div>
        )
    }

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        // Preparamos los datos para enviar a la API, asegurando que los números sean números
        onConfirmEdit(usuario.id, formData); // Llamamos a onConfirmEdit con el id y los datos
    }

    return (
        <form onSubmit={handleSubmit}>
            <div className="mb-3">
                <label htmlFor="nombre" className="form-label">Nombre</label>
                <input type="text" className="form-control" id="nombre" name="nombre" value={formData.nombre} onChange={handleChange} required />
            </div>
            <div className="mb-3">
                <label htmlFor="usuario" className="form-label">Usuario</label>
                <input type="text" className="form-control" id="username" name="username" value={formData.username} onChange={handleChange} required />
            </div>
            <div className="d-flex justify-content-end gap-2 mt-4">
                <Button type="button" variant="secondary" onClick={onClose}>Cancelar</Button>
                <Button type="submit" variant="primary">Guardar Cambios</Button>
            </div>
        </form>
    )
}
