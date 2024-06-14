import React, { useState, useEffect, useRef } from 'react';
import { Box, Button, FormControl, FormLabel, Input, Select, useToast, Table, Thead, Tbody, Tr, Th, Td } from '@chakra-ui/react';
import axios from 'axios';

const RegistrarApoyo = () => {
    const [formData, setFormData] = useState({
        fecha: '',
        solicitud: '',
        cantidad: '',
        tipoApoyo: '',
    });
    const [solicitudes, setSolicitudes] = useState([]);
    const [apoyos, setApoyos] = useState([]);
    const [tiposApoyo, setTiposApoyo] = useState([]);
    const [entregas, setEntregas] = useState([]);
    const [allApoyos, setAllApoyos] = useState([]);
    const [allSolicitudes, setAllSolicitudes] = useState([]);
    const [colonias, setColonias] = useState([]);
    const toast = useToast();
    const token = localStorage.getItem('token_acceso');
    const fechaInputRef = useRef(null);

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

                if (Array.isArray(response.data.data)) {
                    const formattedSolicitudes = response.data.data.map(solicitud => ({
                        id: solicitud._id,
                        displayName: `${solicitud.nombre} ${solicitud.apellido_paterno} ${solicitud.apellido_materno} ${solicitud.curp}`,
                        nombreCompleto: `${solicitud.nombre} ${solicitud.apellido_paterno} ${solicitud.apellido_materno}`,
                        direccion: `${solicitud.direccion.calle}, ${solicitud.direccion.colonia}, ${solicitud.direccion.estado}, ${solicitud.direccion.municipio}`
                    }));

                    setSolicitudes(formattedSolicitudes);
                    setAllSolicitudes(response.data.data);
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

                if (Array.isArray(response.data.data)) {
                    const formattedApoyos = response.data.data
                        .filter(apoyo => apoyo.cantidad > 0)
                        .map(apoyo => ({
                            id: apoyo._id,
                            displayName: `${apoyo.nombre} (${apoyo.cantidad})`,
                            identificador: apoyo.identificador,
                            nombre: apoyo.nombre,
                            tipo: apoyo.tipo,
                            cantidad: apoyo.cantidad,
                            descripcion: apoyo.descripcion
                        }));

                    setTiposApoyo(formattedApoyos);
                    setAllApoyos(response.data.data);
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

        const fetchEntregas = async () => {
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
                const response = await axios.get('https://sgsdif-be.onrender.com/api/v1/entregas_apoyos/listar_entregas', {
                    headers: {
                        'token_acceso': token
                    }
                });

                if (Array.isArray(response.data.data)) {
                    setEntregas(response.data.data);
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
                console.error('Error al obtener las entregas:', error);
                toast({
                    title: 'Error',
                    description: 'Hubo un error al obtener las entregas.',
                    status: 'error',
                    duration: 3000,
                    isClosable: true,
                });
            }
        };

        const fetchColonias = async () => {
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
                const response = await axios.get('https://sgsdif-be.onrender.com/api/v1/colonias/obtener_colonias', {
                    headers: {
                        'token_acceso': token
                    }
                });

                if (Array.isArray(response.data.data)) {
                    setColonias(response.data.data);
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
                console.error('Error al obtener las colonias:', error);
                toast({
                    title: 'Error',
                    description: 'Hubo un error al obtener las colonias.',
                    status: 'error',
                    duration: 3000,
                    isClosable: true,
                });
            }
        };

        fetchSolicitudes();
        fetchApoyos();
        fetchEntregas();
        fetchColonias();
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
            tipoApoyo: '',
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
        const selectedApoyo = tiposApoyo.find(apoyo => apoyo.id === formData.tipoApoyo);

        if (!selectedSolicitud || !selectedApoyo) {
            toast({
                title: 'Error',
                description: 'Solicitud o tipo de apoyo no válidos seleccionados.',
                status: 'error',
                duration: 3000,
                isClosable: true,
            });
            return;
        }

        if (parseInt(formData.cantidad) > selectedApoyo.cantidad) {
            toast({
                title: 'Cantidad no válida',
                description: `La cantidad ingresada es mayor a la disponible (${selectedApoyo.cantidad}).`,
                status: 'warning',
                duration: 3000,
                isClosable: true,
            });
            return;
        }

        const now = new Date();
        const localDateTime = new Date(now.getTime() - now.getTimezoneOffset() * 60000).toISOString().slice(0, 19);

        const entregaData = {
            fecha_de_entrega: `${formData.fecha}T${localDateTime.split('T')[1]}`,
            identificador_de_apoyo: selectedApoyo.identificador, // Utilizar el identificador correcto
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

            const nuevaEntrega = {
                ...response.data,
                nombreApoyo: selectedApoyo.nombre,
                fecha_de_entrega: entregaData.fecha_de_entrega,
                cantidad: entregaData.cantidad,
                direccion: entregaData.direccion,
                identificador_de_apoyo: entregaData.identificador_de_apoyo,
            };

            setEntregas(prevEntregas => [...prevEntregas, nuevaEntrega]); // Agrega la nueva entrega registrada a la tabla

            toast({
                title: 'Registro exitoso',
                description: 'El apoyo ha sido registrado correctamente',
                status: 'success',
                duration: 3000,
                isClosable: true,
            });

            resetForm(); // Restablecer el formulario después del registro exitoso
        } catch (error) {
            console.error('Error al registrar el apoyo:', error);
            console.error('Detalles del error:', error.response.data); // Imprimir detalles del error
            toast({
                title: 'Error',
                description: 'Hubo un error al registrar el apoyo',
                status: 'error',
                duration: 3000,
                isClosable: true,
            });
        }
    };

    const getNombreApoyo = (identificador) => {
        const apoyo = allApoyos.find(apoyo => apoyo.identificador === identificador);
        return apoyo ? apoyo.nombre : 'N/A';
    };

    const getNombreSolicitante = (identificador) => {
        const solicitud = allSolicitudes.find(solicitud => solicitud._id === identificador);
        return solicitud ? `${solicitud.nombre} ${solicitud.apellido_paterno} ${solicitud.apellido_materno}` : 'N/A';
    };

    const getNombreColonia = (coloniaId) => {
        const colonia = colonias.find(colonia => colonia._id === coloniaId);
        return colonia ? colonia.nombre_colonia : coloniaId;
    };

    const formatDireccion = (direccion) => {
        const parts = direccion.split(',');
        if (parts.length === 4) {
            parts[1] = getNombreColonia(parts[1].trim());
            return parts.join(',');
        }
        return direccion;
    };

    return (
        <Box p={4} height="100%" border="1px" borderColor="#252526" borderRadius="10">
            <form onSubmit={handleSubmit}>
                <FormControl id="fecha" mb={4}>
                    <FormLabel>Fecha</FormLabel>
                    <Input 
                        type="date" 
                        name="fecha" 
                        value={formData.fecha} 
                        onChange={handleChange} 
                        required 
                        readOnly
                        onFocus={(e) => {
                            e.target.removeAttribute('readonly');
                            e.target.focus();
                            e.target.setAttribute('readonly', 'readonly');
                        }}
                        ref={fechaInputRef}
                    />
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
                <FormControl id="tipoApoyo" mb={4}>
                    <FormLabel>Tipo de Apoyo</FormLabel>
                    <Select name="tipoApoyo" value={formData.tipoApoyo} onChange={handleChange} required>
                        <option value="">Selecciona un tipo de apoyo</option>
                        {tiposApoyo.map((apoyo) => (
                            <option key={apoyo.id} value={apoyo.id}>
                                {apoyo.displayName}
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
                            <Th>Fecha de Entrega</Th>
                            <Th>Nombre de Solicitante</Th>
                            <Th>Nombre de Apoyo</Th>
                            <Th>Cantidad</Th>
                            <Th>Dirección</Th>
                        </Tr>
                    </Thead>
                    <Tbody>
                        {entregas.map((entrega, index) => (
                            <Tr key={index}>
                                <Td>{new Date(entrega.fecha_de_entrega).toLocaleString()}</Td>
                                <Td>{getNombreSolicitante(entrega.identificador_de_solicitud)}</Td>
                                <Td>{getNombreApoyo(entrega.identificador_de_apoyo)}</Td>
                                <Td>{entrega.cantidad}</Td>
                                <Td>{formatDireccion(entrega.direccion)}</Td>
                            </Tr>
                        ))}
                    </Tbody>
                </Table>
            </Box>
        </Box>
    );
};

export default RegistrarApoyo;
