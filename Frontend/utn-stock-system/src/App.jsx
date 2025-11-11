import React from 'react'
import { Route, Routes } from 'react-router-dom'
import NavBar from './components/ui/NavBar'
import Footer from './components/layout/Footer'
import LoginPage from './pages/Login/LoginPage'
import TablaProductosPage from './pages/Productos/TablaProductosPAge'
import VentaProductoPage from './pages/VentaProducto/VentaProductoPage'
import AdminDashboardPage from './pages/Admin/AdminDashboardPage'

function App() {

  return (
    <div>

      <NavBar/>

    <Routes>

      <Route path='/' element={<LoginPage/>}/>
      <Route path='/usuarios' element={<AdminDashboardPage/>}/>
      <Route path='/productos' element={<TablaProductosPage/>}/>
      <Route path='/venta-productos' element={<VentaProductoPage/>}/>

    </Routes>

    <Footer/>

    </div>
    
  )
}

export default App
