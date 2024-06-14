import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Box, Flex } from "@chakra-ui/react";
import BarraNavegacion from "./componentes/barra-navegacion/barra-navegacion";
import SolicitudesPagina from "./paginas/solicitudes/solicitudes-pagina";
import AgregarSolicitudPagina from "./paginas/solicitudes/agregar-solicitud-pagina";
import InventarioMenu from './paginas/inventario/inventario-pagina'
import AgregarApoyoInventario from "./paginas/inventario/agregar-apoyo-pagina";
import ReportePagina from "./paginas/reportes/generar-reporte-pagina";
import RegistrarApoyo from "./paginas/registrar-apoyo/RegistrarApoyo";

const App = () => {
  return (
      <Flex>
          <Box w="300px" bg="gray.200">
              <BarraNavegacion />
          </Box>
          <Box flex="1" p="10" alignContent="center">
              {/* Aquí se renderizan las rutas que vienen desde el componente padre */}
              <Routes>
                  {configuracionRutas.map((ruta) => (
                      <Route key={ruta.ruta} path={ruta.ruta} element={ruta.elemento} />
                  ))}
              </Routes>
          </Box>
      </Flex>
  );
};

const configuracionRutas = [
  { ruta: "/", elemento: <h1>Inicio</h1> },
  { ruta: "/registro", elemento: <h1>Registro</h1> },
  { ruta: "/solicitudes", elemento: <SolicitudesPagina /> },
  { ruta: "/solicitudes/agregar-solicitud", elemento: <AgregarSolicitudPagina /> },
  { ruta: "/inventario", elemento: <InventarioMenu /> },
  { ruta: "/inventario/agregar-apoyo", elemento: <AgregarApoyoInventario /> },
  { ruta: "/reportes", elemento: <ReportePagina/> },
  { ruta: "/registrar-apoyo", elemento: <RegistrarApoyo /> },
  { ruta: "/reportes", elemento: <h1>Reportes</h1> },
  { ruta: "/configuraciones", elemento: <h1>Configuraciones</h1> },
];

export default App;
