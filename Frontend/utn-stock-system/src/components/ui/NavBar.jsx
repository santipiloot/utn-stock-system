import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { PDFDownloadLink } from "@react-pdf/renderer";
import InformePDF from "../pdf/informe";

function NavBar() {
  const [informeData, setInformeData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  // Esta función se llamará cuando el usuario haga clic
  const handleDownloadClick = async () => {
    if (informeData) { // Si ya tenemos los datos, no hacemos nada
      return;
    }

    setIsLoading(true);
    setError(null);
    try {
      const [resSemanal, resVentas, resVentasUsuarios] = await Promise.all([
        fetch("http://localhost:8000/informes/informe-semanal"),
        fetch("http://localhost:8000/informes/informe-ventas"),
        fetch("http://localhost:8000/informes/informe-ventas-usuarios"),
      ]);

      const dataSemanal = resSemanal.ok ? await resSemanal.json() : [];
      const dataVentas = resVentas.ok ? await resVentas.json() : [];
      const dataVentasUsuarios = resVentasUsuarios.ok ? await resVentasUsuarios.json() : [];

      setInformeData({ dataSemanal, dataVentas, dataVentasUsuarios });
    } catch (err) {
      setError("No se pudo generar el informe.");
      console.error("Error fetching report data:", err);
    } finally {
      setIsLoading(false);
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
              <li className="nav-item" onClick={handleDownloadClick}>
                {isLoading ? (
                  <span className="nav-link">Cargando informe...</span>
                ) : error ? (
                  <span className="nav-link text-danger">{error}</span>
                ) : informeData ? (
                  <PDFDownloadLink
                    document={<InformePDF data={informeData} />}
                    fileName="informe_stock_system.pdf"
                    className="nav-link"
                  >
                    Descargar Informe
                  </PDFDownloadLink>
                ) : (
                  <a href="#" className="nav-link">Generar Informe</a>
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
