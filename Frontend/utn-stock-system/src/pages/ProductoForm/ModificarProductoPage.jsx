import { useState, useEffect } from "react";
import Button from "../../components/ui/Button";

export default function ModificarProductoPage({ producto, onConfirmEdit, onClose }){
    const [formData, setFormData] = useState({
        id: '',
        nombre: '',
        descripcion: '',
        stock: '',
        precioCompra: '',
        precioVenta: '',
        categoria: ''
    });

    useEffect(() => {
        if (producto) {
            setFormData({
                id: producto.id,
                nombre: producto.nombre || '',
                descripcion: producto.descripcion || '',
                stock: producto.stock || 0,
                precioCompra: producto.precioCompra || 0,
                precioVenta: producto.precioVenta || 0,
                categoria: producto.categoria || ''
            });
        }
    }, [producto]);

    if (!producto){
        return (
            <div className="alert alert-danger" role="alert">
                Error: No se pudo cargar la información del producto.
            </div>
        )
    }

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onConfirmEdit(formData);
    }

    return (
        <form onSubmit={handleSubmit}>
            <div className="mb-3">
                <label htmlFor="nombre" className="form-label">Nombre</label>
                <input type="text" className="form-control" id="nombre" name="nombre" value={formData.nombre} onChange={handleChange} required />
            </div>
            <div className="mb-3">
                <label htmlFor="descripcion" className="form-label">Descripción</label>
                <textarea className="form-control" id="descripcion" name="descripcion" rows="3" value={formData.descripcion} onChange={handleChange}></textarea>
            </div>
            <div className="row">
                <div className="col-md-6 mb-3">
                    <label htmlFor="stock" className="form-label">Stock</label>
                    <input type="number" className="form-control" id="stock" name="stock" value={formData.stock} onChange={handleChange} required />
                </div>
                <div className="col-md-6 mb-3">
                    <label htmlFor="categoria" className="form-label">Categoría</label>
                    <input type="text" className="form-control" id="categoria" name="categoria" value={formData.categoria} onChange={handleChange} />
                </div>
            </div>
            <div className="row">
                <div className="col-md-6 mb-3">
                    <label htmlFor="precioCompra" className="form-label">Precio de Compra</label>
                    <input type="number" step="0.01" className="form-control" id="precioCompra" name="precioCompra" value={formData.precioCompra} onChange={handleChange} required />
                </div>
                <div className="col-md-6 mb-3">
                    <label htmlFor="precioVenta" className="form-label">Precio de Venta</label>
                    <input type="number" step="0.01" className="form-control" id="precioVenta" name="precioVenta" value={formData.precioVenta} onChange={handleChange} required />
                </div>
            </div>
            <div className="d-flex justify-content-end gap-2 mt-4">
                <Button type="button" variant="secondary" onClick={onClose}>Cancelar</Button>
                <Button type="submit" variant="primary">Guardar Cambios</Button>
            </div>
        </form>
    )
}