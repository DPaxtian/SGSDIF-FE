import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
    Box,
    SimpleGrid,
    Center,
    Text,
    Circle,
    useColorModeValue,
    Icon,
} from '@chakra-ui/react';
import { FaClipboardList, FaCheck, FaChartArea, FaDolly } from 'react-icons/fa';

const FeatureBox = ({ title, icon, onBoxClick }) => {
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
            transition="all 0.2s ease-in-out"
            _hover={{
                bg: hoverBg,
                transform: 'scale(1.05)',
                '> .icon': {
                    transform: 'scale(1.25)',
                },
            }}
            onClick={onBoxClick}
        >
            <Circle size="80px" className="icon" bg={bg} mb={4} transition="all 0.2s ease-in-out">
                <Icon as={icon} w={10} h={10} />
            </Circle>
            <Text fontWeight="bold">{title}</Text>
        </Center>
    );
};

const App = () => {
    const navigate = useNavigate();

    const handleBoxClick = (path) => {
        navigate(path);
    };

    return (
        <Box p={10} height="100vh">
            <SimpleGrid columns={{ base: 2, md: 2 }} spacing={10} alignItems="center" justifyContent="center" height="full">
                <FeatureBox title="Nueva solicitud" icon={FaClipboardList} onBoxClick={() => handleBoxClick('/nueva-solicitud')} />
                <FeatureBox title="Aprobar solicitudes" icon={FaCheck} onBoxClick={() => handleBoxClick('/en-proceso')} />
                <FeatureBox title="Generar reporte" icon={FaChartArea} onBoxClick={() => handleBoxClick('/en-proceso')} />
                <FeatureBox title="Agregar apoyo al inventario" icon={FaDolly} onBoxClick={() => handleBoxClick('/en-proceso')} />
            </SimpleGrid>
        </Box>
    );
};

export default App;
