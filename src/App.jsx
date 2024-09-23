import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import RegistroUsuario from './pages/EjemploPaladinez/RegistroUsuario';
import CapturaFacial from './pages/EjemploPaladinez/CapturaFacial';
import InicioSesionFacial from './pages/EjemploPaladinez/InicioSesionFacial';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} /> 
        <Route path="/registroUsuario" element={<RegistroUsuario />} /> 
        <Route path="/capturaFacial" element={<CapturaFacial />} /> 
        <Route path="/inicioSesionFacial" element={<InicioSesionFacial />} /> 
      </Routes>
    </Router>
  );
}

export default App;
