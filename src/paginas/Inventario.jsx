import React, { useState, useEffect } from 'react';
import {
    Box,
    Button,
    Flex,
    Heading,
    FormControl,
    FormLabel,
    Input,
    Select,
    Stack,
    Text,
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    Icon,
    HStack,
    useToast,
} from '@chakra-ui/react';
import axios from 'axios';
import { FaPlusSquare, FaClipboardList } from 'react-icons/fa';

const TipoApoyos = [
    "Municipal",
    "Estatal"
];

const AgregarExistencias = () => {
    const toast = useToast();
    const [formData, setFormData] = useState({
        identificador: '',
        nombre: '',
        tipo: '',
        cantidad: '',
        descripcion: '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const token = localStorage.getItem('token_acceso'); // Suponiendo que el token está almacenado en localStorage
        const formDataWithInt = {
            ...formData,
            cantidad: parseInt(formData.cantidad, 10)
        };
        console.log("Token:", token);
        console.log("Form Data:", formDataWithInt);
        console.log(import.meta.env.VITE_APP_APOYOS_API_URL)
        try {
            const response = await axios.post(`${import.meta.env.VITE_APP_APOYOS_API_URL}/api/v1/catalogo_apoyos/crear_apoyo`, formDataWithInt, {
                headers: {
                    'token_acceso': token
                }
            });
            if (response.data.code === 201) {
                toast({
                    title: "Apoyo creado",
                    description: "El apoyo se ha creado con éxito.",
                    status: "success",
                    duration: 3000,
                    isClosable: true,
                });
                // Limpia el formulario
                setFormData({
                    identificador: '',
                    nombre: '',
                    tipo: '',
                    cantidad: '',
                    descripcion: '',
                });
            }if (response.data.code === 400) {
                toast({
                    title: "Datos Invalidos",
                    description: "Algunos datos son invalidos, por favor revisalos",
                    status: "warning",
                    duration: 3000,
                    isClosable: true,
                });
            } else {
                toast({
                    title: "Error",
                    description: "El sistema no esta disponible, intentalo mas tarde",
                    status: "error",
                    duration: 3000,
                    isClosable: true,
                });
            }
        } catch (error) {
            toast({
                title: "Error",
                description: "Hubo un error al crear el apoyo.",
                status: "error",
                duration: 5000,
                isClosable: true,
            });
        }
    };

    return (
        <Flex direction="column" height="100vh" p={5} borderWidth={1} borderRadius="lg" boxShadow="lg" width="100%" mx="auto">
            <Heading as="h3" size="lg" mb={5}>Completa los campos para agregar nuevas existencias al inventario:</Heading>
            <Text mb={5}>Los campos que contienen un * son obligatorios</Text>
            <Stack spacing={4} as="form" onSubmit={handleSubmit}>
                <FormControl isRequired>
                    <FormLabel>Identificador</FormLabel>
                    <Input
                        name="identificador"
                        placeholder="L001"
                        value={formData.identificador}
                        onChange={handleChange}
                        borderColor="#310E3A"
                    />
                </FormControl>

                <FormControl isRequired>
                    <FormLabel>Nombre del apoyo</FormLabel>
                    <Input
                        name="nombre"
                        placeholder="Laminas de metal"
                        value={formData.nombre}
                        onChange={handleChange}
                        borderColor="#310E3A"
                    />
                </FormControl>

                <HStack>
                    <FormControl isRequired>
                        <FormLabel>Tipo de apoyo</FormLabel>
                        <Select
                            name="tipo"
                            placeholder="Seleccione tipo de apoyo*"
                            value={formData.tipo}
                            onChange={handleChange}
                            borderColor="#310E3A"
                        >
                            {TipoApoyos.map((tipo, index) => (
                                <option key={index} value={tipo}>{tipo}</option>
                            ))}
                        </Select>
                    </FormControl>

                    <FormControl isRequired>
                        <FormLabel>Cantidad</FormLabel>
                        <Input
                            type="number"
                            name="cantidad"
                            placeholder="10"
                            min={0}
                            value={formData.cantidad}
                            onChange={handleChange}
                            borderColor="#310E3A"
                        />
                    </FormControl>
                </HStack>

                <FormControl isRequired>
                    <FormLabel>Descripción</FormLabel>
                    <Input
                        name="descripcion"
                        placeholder="Laminas 10m x 20m"
                        value={formData.descripcion}
                        onChange={handleChange}
                        borderColor="#310E3A"
                    />
                </FormControl>

                <Button type="submit" background="#380F42" color="white" variant="solid" alignSelf="flex-end">
                    Registrar Apoyo
                </Button>
            </Stack>
        </Flex>
    );
};

const VerInventario = () => (
    <Box p={5} borderWidth={1} borderRadius="lg" boxShadow="lg">
        <Heading as="h3" size="lg">Ver Inventario</Heading>
        {/* Aquí puedes agregar la lógica para mostrar el inventario */}
    </Box>
);

const Inventario = () => {
    const [view, setView] = useState('menu');

    localStorage.setItem('token_acceso', "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZF91c3VhcmlvIjoiNjYzMDY5OGZiMTA2MjM3YWJlMmZkMjQ2Iiwibm9tYnJlX3VzdWFyaW8iOiJkcGF4dGlhbiIsImFwZWxsaWRvX3BhdGVybm8iOiJBbm90YSIsInJvbCI6IkFkbWluaXN0cmFkb3IiLCJpYXQiOjE3MTY3NTkwNzAsImV4cCI6MTcxNjc4MDY3MH0.BvMsD4WDed-eFj_FHeundaJwgy5g2b8bW3o3EBefUXA");
    const renderView = () => {
        switch (view) {
            case 'menu':
                return (
                    <Flex
                        height="100vh"
                        width="100vw"
                        justifyContent="center"
                        alignItems="center"
                    >
                        <Button
                            onClick={() => setView('agregar')}
                            leftIcon={<Icon as={FaPlusSquare} w={8} h={8} />}
                            m={2}
                            colorScheme="blue"
                            variant="outline"
                            size="lg"
                            p={10}
                            height="150px"
                            width="200px"
                            display="flex"
                            flexDirection="column"
                            alignItems="center"
                        >
                            <Text mt={4}>Agregar existencias</Text>
                        </Button>
                        <Button
                            onClick={() => setView('ver')}
                            leftIcon={<Icon as={FaClipboardList} w={8} h={8} />}
                            m={2}
                            colorScheme="blue"
                            variant="outline"
                            size="lg"
                            p={10}
                            height="150px"
                            width="200px"
                            display="flex"
                            flexDirection="column"
                            alignItems="center"
                        >
                            <Text mt={4}>Ver inventario</Text>
                        </Button>
                    </Flex>
                );
            case 'agregar':
                return <AgregarExistencias />;
            case 'ver':
                return <VerInventario />;
            default:
                return null;
        }
    };

    return (
        <Box p={5}>
            <Breadcrumb mb={5}>
                <BreadcrumbItem>
                    <BreadcrumbLink onClick={() => setView('menu')}>Inventario</BreadcrumbLink>
                </BreadcrumbItem>
                {view !== 'menu' && (
                    <BreadcrumbItem isCurrentPage>
                        <BreadcrumbLink>{view === 'agregar' ? 'Agregar existencias' : 'Ver inventario'}</BreadcrumbLink>
                    </BreadcrumbItem>
                )}
            </Breadcrumb>

            {renderView()}
        </Box>
    );
};

export default Inventario;
