import React from "react";
import { Link, useLocation } from "react-router-dom";
import { Box, CloseButton, Flex, Icon, Image } from "@chakra-ui/react";
import {
  FiHome,
  FiSettings,
  FiClipboard,
  FiTruck,
  FiBarChart,
} from "react-icons/fi";

const rutas = [
  { nombre: "Inicio", icono: FiHome, ruta: "/" },
  { nombre: "Solicitudes", icono: FiClipboard, ruta: "/solicitudes" },
  { nombre: "Inventario", icono: FiTruck, ruta: "/inventario" },
  { nombre: "Reportes", icono: FiBarChart, ruta: "/reportes" },
  { nombre: "Configuraciones", icono: FiSettings, ruta: "/configuraciones" },
];

export default function BarraNavegacion({ children }) {
  return (
    <Box minH="100vh" bg="gray.100">
      <ContenidoBarra display={{ base: "none", md: "block" }} />
      <Box ml={{ base: 0, md: 300 }} p="4">
        {children}
      </Box>
    </Box>
  );
}

const ContenidoBarra = ({ onClose, ...rest }) => {
  return (
    <Box
      bg="white"
      w={{ base: "full", md: 300 }}
      pos="fixed"
      h="full"
      {...rest}
    >
      <Flex h="20" alignItems="center" mx="8" justifyContent="center">
        <Image
          src="src/assets/imagenes/xalapa-logo.png"
          width={12}
          height={12}
        />
        <Box mx="2" />
        <Image
          src="src/assets/imagenes/dif-xalapa-logo.png"
          width={12}
          height={12}
        />

        <CloseButton display={{ base: "flex", md: "none" }} onClick={onClose} />
      </Flex>

      {rutas.map((ruta) => (
        <BotonNavegacion key={ruta.nombre} icono={ruta.icono} ruta={ruta.ruta}>
          {ruta.nombre}
        </BotonNavegacion>
      ))}

      <Image
        src="src/assets/imagenes/barra-navegacion/barra-navegacion-fondo.png"
        position="absolute"
        bottom="0"
      />
    </Box>
  );
};

const BotonNavegacion = ({ icono, children, ruta, ...rest }) => {
  const { pathname } = useLocation();
  const isActive = pathname === ruta;
  return (
    <Link to={ruta} style={{ textDecoration: "none" }}>
      <Flex
        align="center"
        p="4"
        mx="4"
        my="1"
        borderRadius="lg"
        role="group"
        cursor="pointer"
        _hover={{
          bg: "#252526",
          color: "white",
        }}
        bg={isActive ? "#252526" : undefined}
        color={isActive ? "white" : undefined}
        {...rest}
      >
        {icono && (
          <Icon
            mr="4"
            fontSize="16"
            _groupHover={{
              color: "white",
            }}
            as={icono}
          />
        )}
        {children}
      </Flex>
    </Link>
  );
};
