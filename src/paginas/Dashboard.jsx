import React from 'react';
import { Button, Flex, VStack, HStack, useColorModeValue } from '@chakra-ui/react';
import { FaRegThumbsUp, FaBoxOpen, FaClipboardList, FaRegLightbulb } from 'react-icons/fa';

const App = () => {
  // Colores de fondo de los botones que cambian con el color mode
  const bgButton1 = useColorModeValue('purple.500', 'purple.200');
  const bgButton2 = useColorModeValue('teal.500', 'teal.200');
  const bgButton3 = useColorModeValue('orange.500', 'orange.200');
  const bgButton4 = useColorModeValue('cyan.500', 'cyan.200');

  return (
    <Flex direction={{ base: 'column', md: 'row' }} wrap="wrap" justifyContent="center" alignItems="center" h="100vh" p={8}>
      <VStack spacing={4} align="stretch">
        <Button leftIcon={<FaRegThumbsUp />} bg={bgButton1} color="white" _hover={{ bg: useColorModeValue('purple.600', 'purple.300') }}>
          Aprobar solicitudes
        </Button>
        <Button leftIcon={<FaClipboardList />} bg={bgButton3} color="white" _hover={{ bg: useColorModeValue('orange.600', 'orange.300') }}>
          Generar reporte
        </Button>
      </VStack>

      <VStack spacing={4} align="stretch" ml={{ md: 4 }}>
        <Button leftIcon={<FaBoxOpen />} bg={bgButton2} color="white" _hover={{ bg: useColorModeValue('teal.600', 'teal.300') }}>
          Agregar apoyo al inventario
        </Button>
        <Button leftIcon={<FaRegLightbulb />} bg={bgButton4} color="white" _hover={{ bg: useColorModeValue('cyan.600', 'cyan.300') }}>
          Nueva solicitud
        </Button>
      </VStack>
    </Flex>
  );
};

export default App;
