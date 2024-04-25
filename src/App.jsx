import React from 'react';
import { Button, Flex, Box, Image, Avatar, Text, ChakraProvider } from "@chakra-ui/react";
import { FaHome, FaBox, FaFileAlt, FaTools, FaPowerOff, FaChartBar } from 'react-icons/fa';
import { theme } from './estilos/theme';
import { buttonStyle } from './estilos/buttonStyle';
import { Link } from 'react-router-dom';
import Dashboard from './paginas/Dashboard';


function App() {
  return (
    <ChakraProvider theme={theme}>
        <Flex height="100vh" overflow="hidden" width="100vw">
          <Flex
            flex="0 0 auto"
            width="180px"
            flexDirection="column"
            justifyContent="flex-start"
            alignItems="center"
            backgroundImage="../src/assets/img/nav_background.png"
            backgroundSize="65%"
            backgroundPosition="left bottom"
            backgroundRepeat="no-repeat"
            paddingTop="0"
            paddingBottom="0"
            margin="0"
          >
            <Box
              display="flex"
              flexDirection="column"
              alignItems="center"
              justifyContent="center"
              width="100%"
              marginTop="0"
              marginBottom="0"
              paddingBottom="30px"
              paddingTop="15px"
            >
              <Image src="/src/assets/img/dif_logo.png" h="40px" alt="DIF Xalapa" marginBottom="16px" />
              <Avatar name="Dan Abrahmov" src="https://bit.ly/dan-abramov" size="xl" marginBottom="8px" />
              <Text fontSize="md" color="#310E3A">Marlon Montiel Pérez</Text>
              <Text fontSize="xs" color="#310E3A">Buen dia!</Text>
            </Box>
            <Flex flexDirection="column" alignItems="center" width="100%">
              <Link to="/" style={{ width: '100%' }}>
                <Button leftIcon={<FaHome />} sx={buttonStyle}>Dashboard</Button>
              </Link>
              <Link to="/en-proceso" style={{ width: '100%' }}>
                <Button leftIcon={<FaBox />} sx={buttonStyle}>Solicitudes</Button>
              </Link>
              <Link to="/en-proceso" style={{ width: '100%' }}>
                <Button leftIcon={<FaFileAlt />} sx={buttonStyle}>Inventario</Button>
              </Link>
              <Link to="/en-proceso" style={{ width: '100%' }}>
                <Button leftIcon={<FaChartBar />} sx={buttonStyle}>Reportes</Button>
              </Link>
              <Link to="/en-proceso" style={{ width: '100%' }}>
                <Button leftIcon={<FaTools />} sx={buttonStyle}>Configuraciones</Button>
              </Link>
              <Link to="/" style={{ width: '100%' }}>
              <Button leftIcon={<FaPowerOff />} sx={buttonStyle}>Cerrar sesión</Button>
              </Link>
            </Flex>
          </Flex>
          <Box flex="1">
            <Dashboard />
          </Box>
        </Flex>
    </ChakraProvider>
  );
}

export default App;
