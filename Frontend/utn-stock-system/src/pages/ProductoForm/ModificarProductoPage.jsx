import { useState, useEffect } from "react";
import Button from "../../components/ui/Button";

export default function ModificarProductoPage({ producto, onConfirmEdit, onClose }){
    const [formData, setFormData] = useState({
        id: '',
        nombre: producto?.nombre || '',
        descripcion: producto?.descripcion || '',
        stock: producto?.stock || 0,
        precio_compra: producto?.precio_compra || 0,
        precio_venta: producto?.precio_venta || 0,
        categoria_id: ''
    });
    const [categorias, setCategorias] = useState([]);

    useEffect(() => {
        // Cargar categorías desde la API
        const fetchCategorias = async () => {
            try {
                const response = await fetch("http://localhost:8000/categorias");
                const data = await response.json();
                setCategorias(data);
            } catch (error) {
                console.error("Error al cargar categorías:", error);
            }
        };

        fetchCategorias();

        if (producto) {
            setFormData({
                nombre: producto.nombre || '',
                descripcion: producto.descripcion || '',
                stock: producto.stock || 0,
                precio_compra: producto.precio_compra || 0,
                precio_venta: producto.precio_venta || 0,
                // Buscamos el ID de la categoría correspondiente al nombre
                categoria_id: categorias.find(c => c.nombre === producto.categoria)?.id || ''
            });
        }
    }, [producto, categorias]); // Dependemos de producto y de que las categorías se hayan cargado

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

    const handleSubmit = async (e) => {
        e.preventDefault();
        // Preparamos los datos para enviar a la API, asegurando que los números sean números
        const dataToSend = {
            nombre: formData.nombre,
            descripcion: formData.descripcion,
            stock: parseInt(formData.stock, 10),
            precio_compra: parseFloat(formData.precio_compra),
            precio_venta: parseFloat(formData.precio_venta),
            categoria_id: parseInt(formData.categoria_id, 10)
        };
        onConfirmEdit(producto.id, dataToSend); // Llamamos a onConfirmEdit con el id y los datos
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
                    <select className="form-select" id="categoria_id" name="categoria_id" value={formData.categoria_id} onChange={handleChange} required>
                        <option value="">Seleccione una categoría</option>
                        {categorias.map(cat => (
                            <option key={cat.id} value={cat.id}>{cat.nombre}</option>
                        ))}
                    </select>
                </div>
            </div>
            <div className="row">
                <div className="col-md-6 mb-3">
                    <label htmlFor="precio_compra" className="form-label">Precio de Compra</label>
                    <input type="number" step="0.01" className="form-control" id="precio_compra" name="precio_compra" value={formData.precio_compra} onChange={handleChange} required />
                </div>
                <div className="col-md-6 mb-3">
                    <label htmlFor="precio_venta" className="form-label">Precio de Venta</label>
                    <input type="number" step="0.01" className="form-control" id="precio_venta" name="precio_venta" value={formData.precio_venta} onChange={handleChange} required />
                </div>
            </div>
            <div className="d-flex justify-content-end gap-2 mt-4">
                <Button type="button" variant="secondary" onClick={onClose}>Cancelar</Button>
                <Button type="submit" variant="primary">Guardar Cambios</Button>
            </div>
        </form>
    )
}
