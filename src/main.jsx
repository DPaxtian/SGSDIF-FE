import React from 'react'
import ReactDOM from 'react-dom/client'
import { ChakraProvider } from '@chakra-ui/react'
import App from './App.jsx'
import './Login.css'
import Login from './componentes/inicio-sesion/Login.jsx'
import Redireccionador from './componentes/rutas/redireccionador-rutas.jsx'


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ChakraProvider>
      <Redireccionador/>
    </ChakraProvider>
  </React.StrictMode>,
)
