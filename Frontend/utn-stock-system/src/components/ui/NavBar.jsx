import React from "react";
import { NavLink } from "react-router-dom";

function NavBar() {
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
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
}

export default NavBar;
