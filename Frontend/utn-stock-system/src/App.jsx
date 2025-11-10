import React from 'react'
import { Route, Routes } from 'react-router-dom'
import NavBar from './components/ui/NavBar'
import LoginPage from './pages/Login/LoginPage'
import TablaProductosPage from './pages/Productos/TablaProductosPAge'
import VentaProductoPage from './pages/ProductoForm/VentaProductoPage'

function App() {

  return (
    <div>

      <NavBar/>

    <Routes>

      <Route path='/' element={<LoginPage/>}/>
      <Route path='/usuarios' element={""}/>
      <Route path='/productos' element={<TablaProductosPage/>}/>
      <Route path='/venta-productos' element={<VentaProductoPage/>}/>

    </Routes>

    </div>
    
  )
}

export default App
