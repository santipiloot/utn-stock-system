import Button from "../ui/Button";

export default function TablaUsuarios({ usuarios, onEdit, onDelete }){
    if (!usuarios || usuarios.length === 0){
        return <p className="text-center mt-4">No hay usuarios disponibles.</p>;
    }

    return (
        <div className="table-responsive">
            <table className="table table-hover align-middle">
                <thead className="table-light">
                    <tr>
                        <th>Nombre</th>
                        <th className="text-center">Username</th>
                        <th className="text-center">Acciones</th>
                    </tr>
                </thead>

                <tbody>
                    {usuarios.map((u) => (
                        <tr key={u.id}>
                            <td>{u.nombre}</td>
                            <td className="text-center">{u.username}</td>
                            <td className="text-center">
                                <div className="d-flex justify-content-center gap-2">
                                    <Button variant="danger" onClick={() => onDelete(u.id)}>Eliminar</Button>
                                    <Button variant="primary" onClick={() => onEdit(u.id)}>Editar</Button>
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}