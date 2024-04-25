import React from 'react';
import ReactDOM from 'react-dom/client';
import { ChakraProvider } from '@chakra-ui/react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import App from './App.jsx';
import Login from './Login.jsx';
import ConstructionPage from './paginas/PaginaEnConstruccion';
import AgregarNuevaSolicitudPrimeraParte from './paginas/solicitudes/AgregarNuevaSolicitudPrimeraParte';
import AgregarNuevaSolicitudSegundaParte from './paginas/solicitudes/AgregarNuevaSolicitudSegundaParte';
import './index.css';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <ChakraProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/dashboard" element={<App />} />
          <Route path="/en-proceso" element={<ConstructionPage />} />
          <Route path="/nueva-solicitud" element={<AgregarNuevaSolicitudPrimeraParte />} />
          <Route path="/nueva-solicitud/segunda-parte" element={<AgregarNuevaSolicitudSegundaParte />} />
        </Routes>
      </BrowserRouter>
    </ChakraProvider>
  </React.StrictMode>,
);
