import { useState } from "react";
import Button from "../../components/ui/Button";

export default function AgregarUsuarioPage({ onConfirmAdd, onClose }){
    const [formData, setFormData] = useState({
        nombre: '',
        username: '',
        contrasena: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        // Preparamos los datos para enviar a la API
        onConfirmAdd(formData);
    }

    return (
        <form onSubmit={handleSubmit}>
            <div className="mb-3">
                <label htmlFor="nombre" className="form-label">Nombre</label>
                <input type="text" className="form-control" id="nombre" name="nombre" value={formData.nombre} onChange={handleChange} required />
            </div>
            <div className="mb-3">
                <label htmlFor="username" className="form-label">Usuario</label>
                <input type="text" className="form-control" id="username" name="username" value={formData.username} onChange={handleChange} required />
            </div>
            <div className="mb-3">
                <label htmlFor="contrasena" className="form-label">Contraseña</label>
                <input type="password" className="form-control" id="contrasena" name="contrasena" value={formData.contrasena} onChange={handleChange} required />
            </div>
            <div className="d-flex justify-content-end gap-2 mt-4">
                <Button type="button" variant="secondary" onClick={onClose}>Cancelar</Button>
                <Button type="submit" variant="success">Agregar Usuario</Button>
            </div>
        </form>
    )
}