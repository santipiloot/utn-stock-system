import { useState, useEffect } from "react";
import TablaProductos from "../../components/products/TablaProductos";
import Button from "../../components/ui/Button";

// Ventanas modales
import VentanaModalBase from "../../components/ui/VentanaModalBase";
import AgregarUsuarioPage from "../UsuarioForm/AgregarUsuarioPage";
import EliminarUsuarioPage from "../UsuarioForm/EliminarUsuarioPage";
import ModificarUsuarioPage from "../UsuarioForm/ModificarUsuarioPage";
import TablaUsuarios from "../../components/users/TablaUsuarios";

export default function AdminDashboardPage(){
    const [usuarios, setUsuarios] = useState([]);

    const getUsuarios = async () => {
        const response = await fetch("http://localhost:8000/usuarios");
        const data = await response.json();
        console.log("Usuarios: ", data);
        setUsuarios(data);
    };

    // Estados para controlar ventana modal
    const [showModal, setShowModal] = useState(false);
    const [modalType, setModalType] = useState('');
    const [currentUsuarioId, setCurrentUsuarioId] = useState(null);

    useEffect(() => {
        getUsuarios();
    }, []);

    // Funcion para cerrar modal
    const handleCloseModal = () => {
        setShowModal(false);
        setModalType('');
        setCurrentUsuarioId(null);
    }

    // Handles que abriran el modal
    const handleView = (id) => {
        setCurrentUsuarioId(id);
        setModalType('view');
        setShowModal(true);
    };

    const handleEdit = (id) => {
        setCurrentUsuarioId(id);
        setModalType('edit');
        setShowModal(true);
    };

    const handleDelete = (id) => {
        setCurrentUsuarioId(id);
        setModalType('delete');
        setShowModal(true);
    };

    const handleAdd = () => {
        setCurrentUsuarioId(null);
        setModalType('add');
        setShowModal(true);
    };

    // Handles de confirmacion
    const handleConfirmDelete = async (id) => {
        try {
            const response = await fetch(`http://localhost:8000/usuarios/${id}`, {
                method: 'DELETE',
            });
            if (!response.ok) {
                throw new Error('Error al eliminar el usuario');
            }
            await response.json();
            await getUsuarios(); // Recargamos los productos
            handleCloseModal(); // Cierra el modal después de eliminar
        } catch (error) {
            console.error("Error en la eliminación:", error);
        }
    };

    const handleConfirmEdit = async (id, updatedUsuario) => {
        try {
            const response = await fetch(`http://localhost:8000/usuarios/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(updatedUsuario),
            });
            if (!response.ok) {
                throw new Error('Error al actualizar el usuario');
            }
            await response.json();
            await getUsuarios(); // Recargamos los usuarios
            handleCloseModal();
        } catch (error) {
            console.error("Error en la actualización:", error);
        }
    };

    const handleConfirmAdd = async (newUsuario) => {
        try {
            console.log("Usuario: ", newUsuario);
            const response = await fetch(`http://localhost:8000/usuarios`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(newUsuario),
            });
            if (!response.ok) {
                throw new Error('Error al agregar el usuario');
            }
            await response.json();
            await getUsuarios(); // Recargamos los usuarios
            handleCloseModal();
        } catch (error) {
            console.error("Error en la creación:", error);
        }
    };

    // Funcion de renderizado para ventana modal
        const renderModalContent = () => {
            
            const usuario = currentUsuarioId ? usuarios.find(p => p.id === currentUsuarioId) : null;
    
            switch(modalType) {
                case 'edit':
                    return{
                        title: 'Editar Producto',
                        body: <ModificarUsuarioPage usuario={usuario} onConfirmEdit={handleConfirmEdit} onClose={handleCloseModal}/>
                    };
                case 'delete':
                    return {
                        title: 'Confirmacion de Eliminación',
                        body: <EliminarUsuarioPage usuario={usuario} onConfirmDelete={handleConfirmDelete} onClose={handleCloseModal}/>
                    };
                case 'add':
                    return {
                        title: 'Agregar Nuevo Usuario',
                        body: <AgregarUsuarioPage onConfirmAdd={handleConfirmAdd} onClose={handleCloseModal}/>
                    };
                default:
                    return { title: '', body: null};
            }
        };
    
    const { title: modalTitle, body: modalBody } = renderModalContent();

    return (
        <div className="container py-4">
            <div className="text-center mb-3">
                <h2>Administracion de Usuarios</h2>
            </div>
        
            <div>
                <Button className='btn btn-success mt-2' onClick={handleAdd}>
                    + Nuevo Usuario
                </Button>
            </div>
        
            <TablaUsuarios 
                usuarios={usuarios}
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