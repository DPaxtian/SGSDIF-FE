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
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    useToast,
    Collapse,
    FormControl,
    FormLabel,
    Input,
    Select,
} from '@chakra-ui/react';
import { AddIcon, SearchIcon } from '@chakra-ui/icons';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const InventoryTable = () => {
    const [inventory, setInventory] = useState([]);
    const [filteredInventory, setFilteredInventory] = useState([]);
    const [filter, setFilter] = useState({
        identificador: '',
        nombre: '',
        tipo: '',
    });
    const [showFilters, setShowFilters] = useState(false);
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
                    setFilteredInventory(apoyos_encontrados.data.data);
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

    const handleFilterChange = (e) => {
        const { name, value } = e.target;
        setFilter({
            ...filter,
            [name]: value,
        });
    };

    const applyFilters = () => {
        const filteredData = inventory.filter(item => 
            (filter.identificador === '' || item.identificador.toLowerCase().includes(filter.identificador.toLowerCase())) &&
            (filter.nombre === '' || item.nombre.toLowerCase().includes(filter.nombre.toLowerCase())) &&
            (filter.tipo === '' || item.tipo === filter.tipo)
        );
        setFilteredInventory(filteredData);
    };

    return (
        <Box p={4} height="100%" border="1px" borderColor="#252526" borderRadius="10">
            <Breadcrumb mb={4}>
                <BreadcrumbItem>
                    <BreadcrumbLink href="/">Inicio</BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbItem isCurrentPage>
                    <BreadcrumbLink href="/inventario">Inventario</BreadcrumbLink>
                </BreadcrumbItem>
            </Breadcrumb>
            <Stack direction="row" justifyContent="space-between" mt={5} spacing={4}>
                <Button
                    rightIcon={<SearchIcon />}
                    color="white"
                    background="#380F42"
                    onClick={() => setShowFilters(!showFilters)}
                >
                    Filtrar
                </Button>
                <Button color="white" background="#380F42" onClick={() => navigate('/inventario/registrar-apoyo')}>
                    Registrar Apoyo
                </Button>
                <Button leftIcon={<AddIcon />} color="white" background="#380F42" onClick={() => navigate('/inventario/agregar-apoyo')}>
                    Añadir apoyo
                </Button>
            </Stack>
            <Collapse in={showFilters} animateOpacity>
                <Box p={4} mt={4} borderWidth="1px" borderRadius="lg">
                    <Stack direction="row" spacing={4}>
                        <FormControl>
                            <FormLabel>Identificador</FormLabel>
                            <Input
                                name="identificador"
                                value={filter.identificador}
                                onChange={handleFilterChange}
                            />
                        </FormControl>
                        <FormControl>
                            <FormLabel>Nombre</FormLabel>
                            <Input
                                name="nombre"
                                value={filter.nombre}
                                onChange={handleFilterChange}
                            />
                        </FormControl>
                        <FormControl>
                            <FormLabel>Tipo</FormLabel>
                            <Select
                                name="tipo"
                                value={filter.tipo}
                                onChange={handleFilterChange}
                            >
                                <option value="">Todos</option>
                                <option value="Municipal">Municipal</option>
                                <option value="Estatal">Estatal</option>
                            </Select>
                        </FormControl>
                    </Stack>
                    <Button mt={4} color="white" background="#380F42" onClick={applyFilters}>
                        Aplicar filtros
                    </Button>
                </Box>
            </Collapse>
            <TableContainer mt={5}>
                <Table variant="simple">
                    <TableCaption>Inventario de artículos</TableCaption>
                    <Thead>
                        <Tr>
                            <Th>Identificador</Th>
                            <Th>Nombre</Th>
                            <Th isNumeric>Cantidad</Th>
                            <Th>Tipo</Th>
                            <Th></Th>
                        </Tr>
                    </Thead>
                    <Tbody>
                        {filteredInventory.map(item => (
                            <Tr key={item._id}>
                                <Td>{item.identificador}</Td>
                                <Td>{item.nombre}</Td>
                                <Td isNumeric>{item.cantidad}</Td>
                                <Td>{item.tipo}</Td>
                            </Tr>
                        ))}
                    </Tbody>
                </Table>
            </TableContainer>
        </Box>
    );
};

export default InventoryTable;
