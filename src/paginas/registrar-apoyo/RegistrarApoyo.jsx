import React, { useState, useEffect, useRef } from 'react';
import { Box, Button, FormControl, FormLabel, Input, Select, useToast, Table, Thead, Tbody, Tr, Th, Td, Checkbox, Spinner } from '@chakra-ui/react';
import axios from 'axios';

const RegistrarApoyo = () => {
    const [formData, setFormData] = useState({
        fecha: '',
        solicitud: '',
        cantidad: '',
        tipoApoyo: '',
    });
    const [solicitudes, setSolicitudes] = useState([]);
    const [tiposApoyo, setTiposApoyo] = useState([]);
    const [entregas, setEntregas] = useState([]);
    const [showEntregas, setShowEntregas] = useState(false);
    const [filter, setFilter] = useState('');
    const [filterDate, setFilterDate] = useState('');
    const [selectedSolicitante, setSelectedSolicitante] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(10);
    const [loading, setLoading] = useState(true);
    const toast = useToast();
    const token = localStorage.getItem('token_acceso');
    const fechaInputRef = useRef(null);

    useEffect(() => {
        const fetchSolicitudes = async () => {
            if (!token) {
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
                    headers: { 'token_acceso': token }
                });

                if (Array.isArray(response.data.data)) {
                    setSolicitudes(response.data.data);
                }
            } catch (error) {
                toast({
                    title: 'Error',
                    description: 'Hubo un error al obtener las solicitudes.',
                    status: 'error',
                    duration: 3000,
                    isClosable: true,
                });
            } finally {
                setLoading(false);
            }
        };

        const fetchTiposApoyo = async () => {
            if (!token) {
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
                    headers: { 'token_acceso': token }
                });

                if (Array.isArray(response.data.data)) {
                    const filteredTiposApoyo = response.data.data
                        .filter(apoyo => apoyo.cantidad >= 1)
                        .map(apoyo => ({
                            id: apoyo._id,
                            displayName: `${apoyo.nombre} (${apoyo.cantidad})`,
                            cantidad: apoyo.cantidad,
                            identificador: apoyo.identificador
                        }));
                    setTiposApoyo(filteredTiposApoyo);
                }
            } catch (error) {
                toast({
                    title: 'Error',
                    description: 'Hubo un error al obtener los tipos de apoyo.',
                    status: 'error',
                    duration: 3000,
                    isClosable: true,
                });
            }
        };

        fetchSolicitudes();
        fetchTiposApoyo();
    }, [token, toast]);

    const getAvailableQuantity = (tipoApoyoId) => {
        const tipoApoyo = tiposApoyo.find(apoyo => apoyo.id === tipoApoyoId);
        return tipoApoyo ? tipoApoyo.cantidad : 0;
    };

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData(prevFormData => ({
            ...prevFormData,
            [name]: value,
        }));

        if (name === 'cantidad') {
            const availableQuantity = getAvailableQuantity(formData.tipoApoyo);
            if (parseInt(value, 10) > availableQuantity) {
                toast({
                    title: 'Advertencia',
                    description: `La cantidad solicitada no puede ser mayor a la cantidad disponible (${availableQuantity}).`,
                    status: 'warning',
                    duration: 3000,
                    isClosable: true,
                });
            }
        }
    };

    const handleFilterChange = (event) => {
        setFilter(event.target.value);
    };

    const handleFilterDateChange = (event) => {
        setFilterDate(event.target.value);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        const availableQuantity = getAvailableQuantity(formData.tipoApoyo);
        if (parseInt(formData.cantidad, 10) > availableQuantity) {
            toast({
                title: 'Error',
                description: `La cantidad solicitada no puede ser mayor a la cantidad disponible (${availableQuantity}).`,
                status: 'error',
                duration: 3000,
                isClosable: true,
            });
            return;
        }

        if (!token) {
            toast({
                title: 'Error',
                description: 'No se encontró el token de autenticación. Por favor, inicia sesión.',
                status: 'error',
                duration: 3000,
                isClosable: true,
            });
            return;
        }

        if (!selectedSolicitante) {
            toast({
                title: 'Error',
                description: 'Por favor, selecciona un solicitante.',
                status: 'error',
                duration: 3000,
                isClosable: true,
            });
            return;
        }

        const selectedApoyo = tiposApoyo.find(apoyo => apoyo.id === formData.tipoApoyo);
        const selectedSolicitud = solicitudes.find(solicitud => solicitud._id === selectedSolicitante);

        const currentDateTime = new Date().toISOString();

        const requestData = {
            fecha_de_entrega: `${formData.fecha}T${currentDateTime.split('T')[1]}`,
            identificador_de_apoyo: selectedApoyo.identificador,
            cantidad: parseInt(formData.cantidad, 10),
            direccion: selectedSolicitud.ubicacion || "Dirección no completa",
            identificador_de_solicitud: selectedSolicitante
        };

        console.log("Request Data:", requestData);

        try {
            const response = await axios.post('https://sgsdif-be.onrender.com/api/v1/entregas_apoyos/crear_entrega', requestData, {
                headers: { 'token_acceso': token }
            });

            if (response.status === 201) {
                toast({
                    title: 'Éxito',
                    description: 'El apoyo se ha registrado correctamente.',
                    status: 'success',
                    duration: 3000,
                    isClosable: true,
                });
                setFormData({
                    fecha: '',
                    solicitud: '',
                    cantidad: '',
                    tipoApoyo: '',
                });
                setSelectedSolicitante(null);
                setShowEntregas(false);
            } else {
                throw new Error('Error al registrar el apoyo');
            }
        } catch (error) {
            toast({
                title: 'Apoyo ya registrado',
                description: 'La solicitud ya ha sido registrada. Revisa la tabla de apoyos registrados.',
                status: 'error',
                duration: 3000,
                isClosable: true,
            });
        }
    };

    const getApoyoNombreById = (id) => {
        const apoyo = tiposApoyo.find(apoyo => apoyo.id === id);
        return apoyo ? apoyo.displayName : 'Desconocido';
    };

    const getApoyoNombreByIdentificador = (identificador) => {
        const apoyo = tiposApoyo.find(apoyo => apoyo.identificador === identificador);
        return apoyo ? apoyo.displayName.split(" (")[0] : 'Desconocido';
    };

    const getSolicitanteNombreById = (id) => {
        const solicitud = solicitudes.find(solicitud => solicitud._id === id);
        return solicitud ? `${solicitud.nombre} ${solicitud.apellido_paterno} ${solicitud.apellido_materno}` : 'Desconocido';
    };

    const fetchEntregas = async () => {
        if (!token) {
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
                headers: { 'token_acceso': token }
            });

            if (Array.isArray(response.data.data)) {
                setEntregas(response.data.data);
                setShowEntregas(true);
            }
        } catch (error) {
            toast({
                title: 'Error',
                description: 'Hubo un error al obtener las entregas registradas.',
                status: 'error',
                duration: 3000,
                isClosable: true,
            });
        }
    };

    const toggleShowEntregas = () => {
        if (showEntregas) {
            setShowEntregas(false);
        } else {
            fetchEntregas();
        }
    };

    const filteredSolicitudes = solicitudes.filter(solicitud => {
        const matchesFilter = 
            solicitud.curp.toLowerCase().includes(filter.toLowerCase()) ||
            `${solicitud.nombre} ${solicitud.apellido_paterno} ${solicitud.apellido_materno}`.toLowerCase().includes(filter.toLowerCase());

        const matchesDate = !filterDate || new Date(solicitud.fecha_captura).toLocaleDateString('en-CA') === filterDate;

        return matchesFilter && matchesDate;
    });

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = filteredSolicitudes.slice(indexOfFirstItem, indexOfLastItem);

    const nextPage = () => setCurrentPage(prevPage => prevPage + 1);
    const prevPage = () => setCurrentPage(prevPage => (prevPage > 1 ? prevPage - 1 : 1));
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
                        ref={fechaInputRef}
                        required
                    />
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
                <Box mb={4}>
                    <FormLabel fontSize="xl" fontWeight="bold">Solicitudes Registradas</FormLabel>
                </Box>
                <FormControl id="filter" mb={4}>
                    <FormLabel>Filtrar por CURP o Nombre</FormLabel>
                    <Input type="text" name="filter" value={filter} onChange={handleFilterChange} placeholder="Filtrar por CURP o Nombre del Solicitante" />
                </FormControl>
                <FormControl id="filterDate" mb={4}>
                    <FormLabel>Filtrar por Fecha</FormLabel>
                    <Input type="date" name="filterDate" value={filterDate} onChange={handleFilterDateChange} />
                </FormControl>
                {loading ? (
                    <Box display="flex" justifyContent="center" alignItems="center" height="100px">
                        <Spinner size="xl" />
                        <Box ml={4}>Cargando tabla...</Box>
                    </Box>
                ) : (
                    <>
                        <Box mt={8} maxHeight="400px" overflowY="scroll">
                            <Table variant="simple">
                                <Thead>
                                    <Tr>
                                        <Th></Th>
                                        <Th>Fecha de Solicitud</Th>
                                        <Th>Nombre de Solicitante</Th>
                                        <Th>CURP</Th>
                                        <Th>Apoyo Solicitado</Th>
                                    </Tr>
                                </Thead>
                                <Tbody>
                                    {currentItems.map((solicitud) => (
                                        <Tr key={solicitud._id}>
                                            <Td>
                                                <Checkbox
                                                    isChecked={selectedSolicitante === solicitud._id}
                                                    onChange={() => setSelectedSolicitante(solicitud._id)}
                                                />
                                            </Td>
                                            <Td>{new Date(solicitud.fecha_captura).toLocaleDateString()}</Td>
                                            <Td>{`${solicitud.nombre} ${solicitud.apellido_paterno} ${solicitud.apellido_materno}`}</Td>
                                            <Td>{solicitud.curp}</Td>
                                            <Td>{getApoyoNombreById(solicitud.apoyo_solicitado)}</Td>
                                        </Tr>
                                    ))}
                                </Tbody>
                            </Table>
                        </Box>
                        <Box display="flex" justifyContent="center" mt={4}>
                            <Button onClick={prevPage} disabled={currentPage === 1} mx={1}>
                                Página Anterior
                            </Button>
                            <Button onClick={nextPage} disabled={indexOfLastItem >= filteredSolicitudes.length} mx={1}>
                                Página Siguiente
                            </Button>
                        </Box>
                    </>
                )}
                <Button type="submit" colorScheme="teal" mt={4}>
                    Registrar Apoyo
                </Button>
            </form>
            <Button onClick={toggleShowEntregas} colorScheme="blue" mt={4}>
                {showEntregas ? "Ocultar tabla" : "Mostrar apoyos registrados"}
            </Button>
            {showEntregas && (
                <Box mt={8} maxHeight="400px" overflowY="scroll">
                    <Table variant="simple">
                        <Thead>
                            <Tr>
                                <Th>Fecha de Registrado</Th>
                                <Th>Nombre de Solicitante</Th>
                                <Th>Apoyo Solicitado</Th>
                                <Th>Cantidad</Th>
                                <Th>Dirección</Th>
                            </Tr>
                        </Thead>
                        <Tbody>
                            {entregas.map((entrega) => (
                                <Tr key={entrega._id}>
                                    <Td>{new Date(entrega.fecha_de_entrega).toLocaleDateString()}</Td>
                                    <Td>{getSolicitanteNombreById(entrega.identificador_de_solicitud)}</Td>
                                    <Td>{getApoyoNombreByIdentificador(entrega.identificador_de_apoyo)}</Td>
                                    <Td>{entrega.cantidad}</Td>
                                    <Td>{entrega.direccion}</Td>
                                </Tr>
                            ))}
                        </Tbody>
                    </Table>
                </Box>
            )}
        </Box>
    );
};

export default RegistrarApoyo;
