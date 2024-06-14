import React, { useState } from 'react';
import {
    Box,
    Button,
    FormControl,
    FormLabel,
    Input,
    Select,
    Stack,
    Heading,
    Text,
    HStack,
    useToast,
    Flex,
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
} from '@chakra-ui/react';
import axios from 'axios';

const TipoApoyos = [
    "Municipal",
    "Estatal"
];

const AgregarApoyo = () => {
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
        const token = localStorage.getItem('token_acceso');
        const formDataWithInt = {
            ...formData,
            cantidad: parseInt(formData.cantidad, 10)
        };
        try {
            const response = await axios.post(`${import.meta.env.VITE_APP_API_URL}/api/v1/catalogo_apoyos/crear_apoyo`, formDataWithInt, {
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

                setFormData({
                    identificador: '',
                    nombre: '',
                    tipo: '',
                    cantidad: '',
                    descripcion: '',
                });
            } else if (response.data.code === 400) {
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
        <Flex direction="column" p={5} borderWidth={1} borderRadius="lg" boxShadow="lg" width="100%" height="100%" mx="auto">
            <Breadcrumb mb={4}>
                <BreadcrumbItem>
                    <BreadcrumbLink href="/">Inicio</BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbItem>
                    <BreadcrumbLink href="/inventario">Inventario</BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbItem isCurrentPage>
                    <BreadcrumbLink href="#">Añadir Apoyo</BreadcrumbLink>
                </BreadcrumbItem>
            </Breadcrumb>
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

export default AgregarApoyo;
