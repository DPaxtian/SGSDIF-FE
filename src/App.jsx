import { useState } from 'react'
import { Button, Flex, Box, Container, Image, Avatar, Text } from "@chakra-ui/react";
import { FaHome, FaBox, FaFileAlt, FaTools, FaPowerOff, FaChartBar } from 'react-icons/fa';
import { ChakraProvider, extendTheme } from "@chakra-ui/react";
import { theme } from './estilos/theme';
import { buttonStyle } from './estilos/buttonStyle';
import Dashboard from './paginas/Dashboard';

const EnProcesoContent = () => <Box>En proceso de construccion :)!</Box>;

function App() {
  
  const [activeCategory, setActiveCategory] = useState("dashboard");

  const changeCategory = (category) => () => {
    setActiveCategory(category);
  };

  const renderContent = () => {
    switch (activeCategory) {
      case "dashboard":
        return <Dashboard />;
      case "enProceso":
        return <EnProcesoContent />;
    }
  };

  return (
    <ChakraProvider theme={theme}>
      <>
        <Flex
          height="100vh"
          overflow="hidden"
          width="100vw"
        >
          <Flex
            flex="0 0 auto"
            width="180px"
            flexDirection='column'
            justifyContent='flex-start'
            alignItems='center'
            backgroundImage="../src/assets/img/nav_background.png"
            backgroundSize='65%'
            backgroundPosition='left bottom'
            backgroundRepeat='no-repeat'
            paddingTop="0"
            paddingBottom="0"
            margin="0"
          >
            <Box
              display='flex'
              flexDirection='column'
              alignItems='center'
              justifyContent='center'
              width='100%'
              marginTop='0' 
              marginBottom='0'
              paddingBottom="30px"
              paddingTop="15px"
            >
              <Image src='/src/assets/img/dif_logo.png' h='40px' alt='DIF Xalapa' marginBottom='16px' />
              <Avatar name='Dan Abrahmov' src='https://bit.ly/dan-abramov' size='xl' marginBottom='8px' />
              <Text fontSize='md' color='#310E3A'>Nombre Usuario</Text>
              <Text fontSize='xs' color='#310E3A'>Buen dia!</Text>
            </Box>


            <Flex flexDirection='column' alignItems='center' width='100%'>
              <Button onClick={changeCategory("dashboard")} leftIcon={<FaHome />} width='100%' sx={buttonStyle}>Dashboard</Button>
              <Button onClick={changeCategory("enProceso")} leftIcon={<FaBox />} width='100%' sx={buttonStyle}>Solicitudes</Button>
              <Button onClick={changeCategory("enProceso")} leftIcon={<FaFileAlt />} width='100%' sx={buttonStyle}>Inventario</Button>
              <Button onClick={changeCategory("enProceso")} leftIcon={<FaChartBar />} width='100%' sx={buttonStyle}>Reportes</Button>
              <Button onClick={changeCategory("enProceso")} leftIcon={<FaTools />} width='100%' sx={buttonStyle}>Configuraciones</Button>
              <Button onClick={changeCategory("enProceso")} leftIcon={<FaPowerOff />} width='100%' sx={buttonStyle}>Cerrar sesión</Button>
            </Flex>

          </Flex>

          <Box flex="1">
          {renderContent()}
          </Box>
        </Flex>
      </>
    </ChakraProvider>
  )
}

export default App
