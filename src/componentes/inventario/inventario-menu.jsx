import React, { useState, useEffect } from 'react';
import {
    Table,
    Thead,
    Tbody,
    Tr,
    Th,
    Td,
    TableCaption,
    TableContainer,
    Button,
    Box,
    Stack,
    Heading,
    Input,
    IconButton,
    useToast,
} from '@chakra-ui/react';
import { AddIcon, SearchIcon } from '@chakra-ui/icons';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const InventoryTable = () => {
    const [inventory, setInventory] = useState([]);
    const [filter, setFilter] = useState('');
    const token = localStorage.getItem('token_acceso');
    const toast = useToast();
    const navigate = useNavigate();

    useEffect(() => {
        const obtenerDatos = async () => {
            try {
                const apoyos_encontrados = await axios.get(import.meta.env.VITE_APP_API_URL_OBTENER_TODOS_APOYOS, {
                    headers: {
                        'token_acceso': token
                    }
                });

                if (apoyos_encontrados.data.code === 500) {
                    toast({
                        title: "Error",
                        description: "El sistema no está disponible, inténtalo más tarde",
                        status: "error",
                        duration: 3000,
                        isClosable: true,
                    });
                } else {
                    setInventory(apoyos_encontrados.data.data);
                }

                console.log(apoyos_encontrados);
            } catch (error) {
                toast({
                    title: "Error",
                    description: "Error al obtener los datos",
                    status: "error",
                    duration: 3000,
                    isClosable: true,
                });
            }
        };

        obtenerDatos();
    }, [token, toast]);

    return (
        <Box p={4} height="100%" border="1px" borderColor="#252526" borderRadius="10">
            <Stack direction="row" justifyContent="space-between" mt={5} spacing={4}>
                <Button rightIcon={<SearchIcon />} color="white" background="#380F42">
                    Filtrar
                </Button>
                <Button color="white" background="#380F42" onClick={() => navigate('/inventario/registrar-apoyo')}>
                    Registrar Apoyo
                </Button>
                <Button leftIcon={<AddIcon />} color="white" background="#380F42">
                    Añadir apoyo
                </Button>
            </Stack>
            <TableContainer mt={5}>
                <Table variant="simple">
                    <TableCaption>Inventario de artículos</TableCaption>
                    <Thead>
                        <Tr>
                            <Th>Identificador</Th>
                            <Th>Nombre</Th>
                            <Th isNumeric>Cantidad</Th>
                            <Th>Tipo</Th>
                            <Th>Descripción</Th>
                            <Th></Th>
                        </Tr>
                    </Thead>
                    <Tbody>
                        {inventory.map(item => (
                            <Tr key={item._id}>
                                <Td>{item.identificador}</Td>
                                <Td>{item.nombre}</Td>
                                <Td isNumeric>{item.cantidad}</Td>
                                <Td>{item.tipo}</Td>
                                <Td>{item.descripcion}</Td>
                            </Tr>
                        ))}
                    </Tbody>
                </Table>
            </TableContainer>
        </Box>
    );
};

export default InventoryTable;
