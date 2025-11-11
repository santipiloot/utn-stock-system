import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { PDFDownloadLink } from "@react-pdf/renderer";
import InformePDF from "../pdf/InformePDF";

function NavBar() {
  const [informeSemanal, setInformeSemanal] = useState(null);
  const [informeVentas, setInformeVentas] = useState(null);
  const [informeVentasUsuarios, setInformeVentasUsuarios] = useState(null);
  const [loading, setLoading] = useState(false);
  const [dataLoaded, setDataLoaded] = useState(false);

  const handleInforme = async () => {
    setLoading(true);
    setDataLoaded(false);
    try {
      const [semanalRes, ventasRes, ventaUsuarioRes] = await Promise.all([
        fetch("http://localhost:8000/informes/informe-semanal"),
        fetch("http://localhost:8000/informes/informe-ventas"),
        fetch("http://localhost:8000/informes/informe-ventas-usuarios"),
      ]);

      setInformeSemanal(await semanalRes.json());
      setInformeVentas(await ventasRes.json());
      setInformeVentasUsuarios(await ventaUsuarioRes.json());
      setDataLoaded(true);
    } catch (error) {
      console.error("Error al obtener los informes:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <div className="container-fluid">
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav ms-auto">
              {" "}
              <li className="nav-item">
                <NavLink className="nav-link" to="/usuarios">
                  Usuarios
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to="/productos">
                  Gestionar Productos
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to="/venta-productos">
                  Vender Productos
                </NavLink>
              </li>
              <li className="nav-item">
                {!dataLoaded ? (
                  <button
                    className="btn btn-outline-info"
                    onClick={handleInforme}
                    disabled={loading}
                  >
                    {loading ? "Generando..." : "Generar Informe PDF"}
                  </button>
                ) : (
                  <PDFDownloadLink
                    document={
                      <InformePDF
                        semanal={informeSemanal}
                        ventas={informeVentas}
                        ventaUsuario={informeVentasUsuarios}
                      />
                    }
                    fileName="informe.pdf"
                  >
                    {({ loading }) => (loading ? 'Cargando documento...' : 'Descargar PDF')}
                  </PDFDownloadLink>
                )}
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
}

export default NavBar;