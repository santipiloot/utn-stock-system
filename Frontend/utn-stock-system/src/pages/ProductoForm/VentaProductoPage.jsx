import Button from "../../components/ui/Button";

export default function VentaProductoPage({ onClose }) {

    return (
        <form> 
            {/* Producto */}
            <div className="mb-3">
                <label htmlFor="producto" className="form-label">Producto</label>
                <select 
                    id="producto" 
                    className="form-select" 
                    required
                >
                    <option value="">Seleccione un producto</option>
                </select>
            </div>

            {/* Cantidad */}
            <div className="mb-3">
                <label htmlFor="cantidad" className="form-label">Cantidad</label>
                <input 
                    type="number" 
                    id="cantidad" 
                    className="form-control" 
                    min="1" 
                    required 
                />
            </div>

            {/* Precio Total */}
            <div className="mb-3">
                <label htmlFor="total" className="form-label">Precio Total</label>
                <input 
                    type="text" 
                    id="total" 
                    className="form-control" 
                    disabled 
                    placeholder="$0.00"
                />
            </div>

            {/* Botones */}
            <div className="d-flex justify-content-end gap-2 mt-4">
                <Button type="button" variant="secondary">
                    Cancelar
                </Button>
                <Button type="submit" variant="primary">
                    Registrar Venta
                </Button>
            </div>
        </form>
    );
}