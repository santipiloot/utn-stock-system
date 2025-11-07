import { useState } from "react";
import Input from "../../components/ui/Input";
import Button from "../../components/ui/Button";

export default function LoginPage(){
    const [form, setForm] = useState({ username: "", password: ""});

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value});
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Conectar con FastAPI aca (proximamente)
        console.log("Enviando credenciales: ", form);
    };

    return (
        <div className="d-flex justify-content-center align-items-center vh-100 bg-light">
            <div className="card shadow p-4" style={{ width: "350px" }}>
                <h3 className="text-center mb-4">Iniciar Sesión</h3>
                <form onSubmit={handleSubmit}>
                    <Input 
                        label="Usuario"
                        name="username"
                        value={form.username}
                        onChange={handleChange}
                    />
                    <Input 
                        label="Contraseña"
                        type="password"
                        name="password"
                        value={form.password}
                        onChange={handleChange}
                    />
                    <Button type="submit">
                        Ingresar
                    </Button>
                </form>
            </div>
        </div>
    )
}