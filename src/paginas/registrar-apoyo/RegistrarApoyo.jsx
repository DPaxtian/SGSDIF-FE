import React, { useState, useEffect } from 'react';
import { Box, Button, FormControl, FormLabel, Input, Select, useToast, Table, Thead, Tbody, Tr, Th, Td } from '@chakra-ui/react';
import axios from 'axios';

const RegistrarApoyo = () => {
    const [formData, setFormData] = useState({
        fecha: '',
        solicitud: '',
        cantidad: '',
    });
    const [solicitudes, setSolicitudes] = useState([]);
    const [apoyos, setApoyos] = useState([]);
    const toast = useToast();
    const token = localStorage.getItem('token_acceso');

    useEffect(() => {
        const fetchSolicitudes = async () => {
            if (!token) {
                console.error('Token no encontrado');
                toast({
                    title: 'Error',
                    description: 'No se encontró el token de autenticación. Por favor, inicia sesión.',
                    status: 'error',
                    duration: 3000,
                    isClosable: true,
                });
                return;
            }

            try {
                const response = await axios.get('https://sgsdif-be.onrender.com/api/v1/solicitudes/obtener_solicitudes', {
                    headers: {
                        'token_acceso': token
                    }
                });

                console.log('Respuesta de la API:', response.data);

                if (Array.isArray(response.data.data)) {
                    const formattedSolicitudes = response.data.data.map(solicitud => ({
                        id: solicitud._id,
                        displayName: `${solicitud.nombre} ${solicitud.apellido_paterno} ${solicitud.apellido_materno} ${solicitud.curp}`,
                        direccion: `${solicitud.direccion.calle}, ${solicitud.direccion.colonia}, ${solicitud.direccion.estado}, ${solicitud.direccion.municipio}`
                    }));

                    setSolicitudes(formattedSolicitudes);
                } else {
                    console.error('La respuesta de la API no contiene un array en la propiedad "data":', response.data);
                    toast({
                        title: 'Error',
                        description: 'La respuesta de la API no es válida.',
                        status: 'error',
                        duration: 3000,
                        isClosable: true,
                    });
                }
            } catch (error) {
                console.error('Error al obtener las solicitudes:', error);
                toast({
                    title: 'Error',
                    description: 'Hubo un error al obtener las solicitudes.',
                    status: 'error',
                    duration: 3000,
                    isClosable: true,
                });
            }
        };

        const fetchApoyos = async () => {
            if (!token) {
                console.error('Token no encontrado');
                toast({
                    title: 'Error',
                    description: 'No se encontró el token de autenticación. Por favor, inicia sesión.',
                    status: 'error',
                    duration: 3000,
                    isClosable: true,
                });
                return;
            }

            try {
                const response = await axios.get('https://sgsdif-be.onrender.com/api/v1/catalogo_apoyos/buscar_apoyo', {
                    headers: {
                        'token_acceso': token
                    }
                });

                console.log('Respuesta de la API:', response.data);

                if (Array.isArray(response.data.data)) {
                    setApoyos(response.data.data);
                } else {
                    console.error('La respuesta de la API no contiene un array en la propiedad "data":', response.data);
                    toast({
                        title: 'Error',
                        description: 'La respuesta de la API no es válida.',
                        status: 'error',
                        duration: 3000,
                        isClosable: true,
                    });
                }
            } catch (error) {
                console.error('Error al obtener los apoyos:', error);
                toast({
                    title: 'Error',
                    description: 'Hubo un error al obtener los apoyos.',
                    status: 'error',
                    duration: 3000,
                    isClosable: true,
                });
            }
        };

        fetchSolicitudes();
        fetchApoyos();
    }, [toast, token]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const resetForm = () => {
        setFormData({
            fecha: '',
            solicitud: '',
            cantidad: '',
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!token) {
            console.error('Token no encontrado');
            toast({
                title: 'Error',
                description: 'No se encontró el token de autenticación. Por favor, inicia sesión.',
                status: 'error',
                duration: 3000,
                isClosable: true,
            });
            return;
        }

        const selectedSolicitud = solicitudes.find(solicitud => solicitud.id === formData.solicitud);

        if (!selectedSolicitud) {
            toast({
                title: 'Error',
                description: 'Solicitud no válida seleccionada.',
                status: 'error',
                duration: 3000,
                isClosable: true,
            });
            return;
        }

        const now = new Date();
        const isoString = now.toISOString();

        const entregaData = {
            fecha_de_entrega: `${formData.fecha}T${now.toTimeString().split(' ')[0]}.000Z`,
            identificador_de_apoyo: ' ',
            cantidad: formData.cantidad,
            direccion: selectedSolicitud.direccion,
            identificador_de_solicitud: formData.solicitud
        };

        console.log('Datos enviados a la API (entrega):', entregaData);

        try {
            const response = await axios.post('https://sgsdif-be.onrender.com/api/v1/entregas_apoyos/crear_entrega', entregaData, {
                headers: {
                    'token_acceso': token
                }
            });

            console.log('Respuesta de la API (entrega):', response.data);

            setApoyos([...apoyos, response.data]); //Apartado pendiente para cuando Marlon me de endpoint de retorno de datos. :)

            toast({
                title: 'Registro exitoso',
                description: 'El apoyo ha sido registrado correctamente',
                status: 'success',
                duration: 3000,
                isClosable: true,
            });

            resetForm();
        } catch (error) {
            console.error('Error al registrar el apoyo:', error);
            console.error('Detalles del error:', error.response.data);
            toast({
                title: 'Error',
                description: 'Hubo un error al registrar el apoyo',
                status: 'error',
                duration: 3000,
                isClosable: true,
            });
        }
    };

    return (
        <Box p={4} height="100%" border="1px" borderColor="#252526" borderRadius="10">
            <form onSubmit={handleSubmit}>
                <FormControl id="fecha" mb={4}>
                    <FormLabel>Fecha</FormLabel>
                    <Input type="date" name="fecha" value={formData.fecha} onChange={handleChange} required />
                </FormControl>
                <FormControl id="solicitud" mb={4}>
                    <FormLabel>Solicitud</FormLabel>
                    <Select name="solicitud" value={formData.solicitud} onChange={handleChange} required>
                        <option value="">Selecciona una solicitud</option>
                        {solicitudes.map((solicitud) => (
                            <option key={solicitud.id} value={solicitud.id}>
                                {solicitud.displayName}
                            </option>
                        ))}
                    </Select>
                </FormControl>
                <FormControl id="cantidad" mb={4}>
                    <FormLabel>Cantidad</FormLabel>
                    <Input type="number" name="cantidad" value={formData.cantidad} onChange={handleChange} required />
                </FormControl>
                <Button type="submit" colorScheme="teal" mt={4}>
                    Registrar Apoyo
                </Button>
            </form>

            <Box mt={8} maxHeight="400px" overflowY="scroll">
                <Table variant="simple">
                    <Thead>
                        <Tr>
                            <Th>Nombre</Th>
                            <Th>Tipo</Th>
                            <Th>Cantidad</Th>
                            <Th>Descripción</Th>
                        </Tr>
                    </Thead>
                    <Tbody>
                        {apoyos.map((apoyo, index) => (
                            <Tr key={index}>
                                <Td>{apoyo.nombre}</Td>
                                <Td>{apoyo.tipo}</Td>
                                <Td>{apoyo.cantidad}</Td>
                                <Td>{apoyo.descripcion}</Td>
                            </Tr>
                        ))}
                    </Tbody>
                </Table>
            </Box>
        </Box>
    );
};

export default RegistrarApoyo;
