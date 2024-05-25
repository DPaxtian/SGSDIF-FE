import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Box, Flex } from "@chakra-ui/react";
import BarraNavegacion from "./componentes/barra-navegacion/barra-navegacion";
import SolicitudesPagina from "./paginas/solicitudes-pagina";

const configuracionRutas = [
  { ruta: "/", elemento: <h1>Inicio</h1> },
  { ruta: "/inicio-sesion", elemento: <h1>Inicio Sesión</h1> },
  { ruta: "/registro", elemento: <h1>Registro</h1> },
  { ruta: "/solicitudes", elemento: <SolicitudesPagina /> },
  {
    ruta: "/solicitudes/agregar-solicitud",
    elemento: <h1>Agregar nueva solicitud</h1>,
  },
  { ruta: "/inventario", elemento: <h1>Inventario</h1> },
  { ruta: "/reportes", elemento: <h1>Reportes</h1> },
  { ruta: "/configuraciones", elemento: <h1>Configuraciones</h1> },
];

const RutasApp = () => (
  <Routes>
    {configuracionRutas.map((ruta) => (
      <Route key={ruta.ruta} path={ruta.ruta} element={ruta.elemento} />
    ))}
  </Routes>
);

function App() {
  return (
    <BrowserRouter>
      <Flex>
        <Box w="300px" bg="gray.200">
          <BarraNavegacion />
        </Box>
        <Box flex="1" p="10" alignContent="center">
          <RutasApp />
        </Box>
      </Flex>
    </BrowserRouter>
  );
}

export default App;
