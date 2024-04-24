import React from 'react';
import {
  Box,
  SimpleGrid,
  Center,
  Text,
  Circle,
  VStack,
  useColorModeValue,
  Icon,
} from '@chakra-ui/react';
import { FaClipboardList, FaCheck, FaChartArea, FaDolly } from 'react-icons/fa';

const FeatureBox = ({ title, icon }) => {
  // Determina los colores para el hover
  const bg = useColorModeValue('gray.200', 'gray.700');
  const hoverBg = useColorModeValue('gray.300', 'gray.600');

  return (
    <Center
      p={5}
      flexDir="column"
      borderWidth="1px"
      borderRadius="lg"
      boxShadow="lg"
      bg={useColorModeValue('white', 'gray.800')}
      transition="all 0.2s ease-in-out" // Suaviza la transición de estilos
      _hover={{
        bg: hoverBg, // Oscurece el fondo
        transform: 'scale(1.05)', // Escala ligeramente el FeatureBox
        '.icon': {
          transform: 'scale(1.25)', // Aumenta el tamaño del ícono
        },
      }}
    >
      <Circle size="80px" className="icon" bg={bg} mb={4} transition="all 0.2s ease-in-out">
        <Icon as={icon} w={10} h={10} />
      </Circle>
      <Text fontWeight="bold">{title}</Text>
    </Center>
  );
};

const App = () => {
  return (
    <Box p={10} height="100vh">
      <SimpleGrid columns={{ base: 2, md: 2 }} spacing={10} alignItems="center" justifyContent="center" height="full">
        <FeatureBox title="Nueva solicitud" icon={FaClipboardList} />
        <FeatureBox title="Aprobar solicitudes" icon={FaCheck} />
        <FeatureBox title="Generar reporte" icon={FaChartArea} />
        <FeatureBox title="Agregar apoyo al inventario" icon={FaDolly} />
      </SimpleGrid>
    </Box>
  );
};

export default App;
