import { useState, useEffect } from "react";
import TablaProductos from "../../components/products/TablaProductos";
import Button from "../../components/ui/Button";

// Para ventana modal
import VentanaModalBase from "../../components/ui/VentanaModalBase";
import VistaProductoPage from "../ProductoForm/VistaProductoPage";
import ModificarProductoPage from "../ProductoForm/ModificarProductoPage";
import EliminarProductoPage from "../ProductoForm/EliminarProductoPage";
import AgregarProductoPage from "../ProductoForm/AgregarProductoPage";
// import { use } from "react";

export default function TablaProductosPage(){
    // Ejemplo para probar
    // const [productos, setProductos] = useState([
    //     { id: 1, nombre: "Café molido", categoria:"Comida", stock: 25, precioCompra: 1300, precioVenta: 1500, descripcion: "Paquete de café tostado y molido de 250g, ideal para cafetera de filtro."},
    //     { id: 2, nombre: "Yerba mate", categoria:"Comida", stock: 15, precioCompra: 2100, precioVenta: 2300, descripcion: "Yerba mate tradicional con palo de 1kg, sabor suave y duradero."},
    //     { id: 3, nombre: "Gaseosa cola", categoria:"Bebidas", stock: 40, precioCompra: 950, precioVenta: 1150, descripcion: "Bebida carbonatada sabor cola en botella de 1.5 litros."},
    //     { id: 4, nombre: "Detergente líquido", categoria:"Limpieza", stock: 30, precioCompra: 800, precioVenta: 1050, descripcion: "Detergente concentrado para ropa, bajo en espuma, botella de 1 litro."},
    //     { id: 5, nombre: "Pan de molde integral", categoria:"Panadería", stock: 20, precioCompra: 700, precioVenta: 900, descripcion: "Pan de molde con semillas y harina integral, 18 rebanadas."},
    //     { id: 6, nombre: "Leche entera UHT", categoria:"Lácteos", stock: 50, precioCompra: 650, precioVenta: 850, descripcion: "Leche larga vida (UHT) entera, envase de 1 litro."},
    //     { id: 7, nombre: "Jugo de naranja (1L)", categoria:"Bebidas", stock: 35, precioCompra: 1100, precioVenta: 1350, descripcion: "Jugo de naranja exprimido pasteurizado, sin azúcares añadidos, caja de 1 litro."},
    //     { id: 8, nombre: "Shampoo (500ml)", categoria:"Higiene Personal", stock: 22, precioCompra: 1500, precioVenta: 1900, descripcion: "Shampoo para todo tipo de cabello, con extractos naturales, botella de 500 ml."},
    //     { id: 9, nombre: "Atún enlatado", categoria:"Comida", stock: 45, precioCompra: 1250, precioVenta: 1550, descripcion: "Lata de atún en aceite vegetal, peso neto 170 gramos."},
    //     { id: 10, nombre: "Papas fritas (grande)", categoria:"Snacks", stock: 28, precioCompra: 900, precioVenta: 1200, descripcion: "Bolsa grande de papas fritas sabor original, 200 gramos."}
    // ]);

    const [productos, setProductos] = useState([]);

    const getProductos = async () => {
    const response = await fetch("http://localhost:8000/productos");
    const data = await response.json();
    console.log("Productos: ", data);
    setProductos(data);
  };

    // Estados para controlar ventana modal
    const [showModal, setShowModal] = useState(false);
    const [modalType, setModalType] = useState('');
    const [currentProductId, setCurrentProductId] = useState(null);

    useEffect(() => {
        getProductos();
    }, []);


    // Funcion para cerrar modal
    const handleCloseModal = () => {
        setShowModal(false);
        setModalType('');
        setCurrentProductId(null);
    }

    // Handles que abriran el modal
    const handleView = (id) => {
        setCurrentProductId(id);
        setModalType('view');
        setShowModal(true);
    };

    const handleEdit = (id) => {
        setCurrentProductId(id);
        setModalType('edit');
        setShowModal(true);
    };

    const handleDelete = (id) => {
        setCurrentProductId(id);
        setModalType('delete');
        setShowModal(true);
    };

    const handleAdd = () => {
        setCurrentProductId(null);
        setModalType('add');
        setShowModal(true);
    };

    // Funcion de renderizado para ventana modal
    const renderModalContent = () => {
        
        const producto = currentProductId ? productos.find(p => p.id === currentProductId) : null;

        switch(modalType) {
            case 'view':
                return {
                    title: 'Detalles del producto',
                    body: <VistaProductoPage producto={producto} onClose={handleCloseModal}/>
                };
            case 'edit':
                return{
                    title: 'Editar Producto',
                    body: <ModificarProductoPage producto={producto} onConfirmEdit={handleConfirmEdit} onClose={handleCloseModal}/>
                };
            case 'delete':
                return {
                    title: 'Confirmacion de Eliminación',
                    body: <EliminarProductoPage producto={producto} onConfirmDelete={handleConfirmDelete} onClose={handleCloseModal}/>
                };
            case 'add':
                return {
                    title: 'Agregar Nuevo Producto',
                    body: <AgregarProductoPage onConfirmAdd={handleConfirmAdd} onClose={handleCloseModal}/>
                };
            default:
                return { title: '', body: null};
        }
    };

    const handleConfirmDelete = async (id) => {
        try {
            const response = await fetch(`http://localhost:8000/productos/${id}`, {
                method: 'DELETE',
            });
            if (!response.ok) {
                throw new Error('Error al eliminar el producto');
            }
            await response.json();
            await getProductos(); // Recargamos los productos
            handleCloseModal(); // Cierra el modal después de eliminar
        } catch (error) {
            console.error("Error en la eliminación:", error);
        }
    };

    const handleConfirmEdit = async (id, updatedProducto) => {
        try {
            const response = await fetch(`http://localhost:8000/productos/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(updatedProducto),
            });
            if (!response.ok) {
                throw new Error('Error al actualizar el producto');
            }
            await response.json();
            await getProductos(); // Recargamos los productos
            handleCloseModal();
        } catch (error) {
            console.error("Error en la actualización:", error);
        }
    };

    const handleConfirmAdd = async (newProducto) => {
        try {
            const response = await fetch(`http://localhost:8000/productos`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(newProducto),
            });
            if (!response.ok) {
                throw new Error('Error al agregar el producto');
            }
            await response.json();
            await getProductos(); // Recargamos los productos
            handleCloseModal();
        } catch (error) {
            console.error("Error en la creación:", error);
        }
    };


    const { title: modalTitle, body: modalBody } = renderModalContent();

    return (
        <div className="container py-4">
            <div className="text-center mb-3">
                <h2>Gestión de Productos</h2>
            </div>

            <div>
                <Button className='btn btn-success mt-2' onClick={handleAdd}>
                    + Nuevo Producto
                </Button>
            </div>

            <TablaProductos 
                productos={productos}
                onView={handleView}
                onEdit={handleEdit}
                onDelete={handleDelete}
            />

        <VentanaModalBase
                show={showModal}
                onHide={handleCloseModal}
                title={modalTitle}
            >
                {modalBody}
        </VentanaModalBase>
        </div>
    );
}