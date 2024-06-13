import React, { useState, useEffect } from 'react';
import {
    Box,
    Button,
    FormControl,
    FormLabel,
    Input,
    Select,
    Stack,
    Heading,
    Divider,
    useToast,
    HStack,
    Checkbox,
    Spinner,
    Text,
} from '@chakra-ui/react';
import axios from 'axios';

const ReporteFormulario = () => {
    const token = localStorage.getItem('token_acceso');
    const toast = useToast();
    const [datos_reporte, set_datos_reporte] = useState({
        tipo_reporte: '',
        tipo_apoyo: '',
        periodo: {
            fecha1: '',
            fecha2: ''
        },
        colonia: '',
        curp: '',
    });

    const [apoyos, set_apoyos] = useState([]);
    const [colonias, set_colonias] = useState([]);
    const [cargando, setCargando] = useState(false);

    const [activo, set_activo] = useState({
        apoyo: false,
        periodo: false,
        colonia: false,
        curp: false,
    });

    useEffect(() => {
        // Obtener datos de apoyos
        axios.get(`${import.meta.env.VITE_APP_API_URL_OBTENER_TODOS_APOYOS}`, {
            headers: {
                'token_acceso': token
            }
        })
            .then(response => {
                set_apoyos(response.data.data);
            })
            .catch(error => {
                toast({
                    title: "Error al obtener apoyos.",
                    description: error.response?.data?.msg || "Ocurrió un error.",
                    status: "error",
                    duration: 9000,
                    isClosable: true,
                });
            });

        // Obtener datos de colonias
        axios.get(`${import.meta.env.VITE_APP_API_URL_OBTENER_TODAS_COLONIAS}`, {
            headers: {
                'token_acceso': token
            }
        })
            .then(response => {
                set_colonias(response.data.data);
            })
            .catch(error => {
                toast({
                    title: "Error al obtener colonias.",
                    description: error.response?.data?.msg || "Ocurrió un error.",
                    status: "error",
                    duration: 9000,
                    isClosable: true,
                });
            });

    }, [token, toast]);

    const handleSelectChange = (e) => {
        set_datos_reporte({
            ...datos_reporte,
            tipo_reporte: e.target.value
        });
    };

    const handleCheckboxChange = (campo) => {
        set_activo({
            ...activo,
            [campo]: !activo[campo]
        });
    };

    const handleSubmit = () => {
        const datosParaEnviar = {
            ...datos_reporte,
            tipo_apoyo: activo.apoyo ? datos_reporte.tipo_apoyo : null,
            periodo: activo.periodo ? {
                fecha1: datos_reporte.periodo.fecha1 || null,
                fecha2: datos_reporte.periodo.fecha2 || null,
            } : null,
            colonia: activo.colonia ? datos_reporte.colonia : null,
            curp: activo.curp ? datos_reporte.curp : null,
        };

        setCargando(true);
        axios.post(`${import.meta.env.VITE_APP_API_URL_GENERAR_REPORTE}`, datosParaEnviar, {
            headers: {
                'token_acceso': token
            },
            responseType: 'blob', // Importante para recibir archivos
        })
            .then(response => {
                const url = window.URL.createObjectURL(new Blob([response.data], { type: 'application/pdf' }));
                const link = document.createElement('a');
                link.href = url;

                // Extraer el nombre del archivo del encabezado Content-Disposition
                const disposition = response.request.getResponseHeader('content-disposition');
                let filename = 'reporte.pdf';
                if (disposition && disposition.includes('filename=')) {
                    filename = disposition.split('filename=')[1].split(';')[0].replace(/['"]/g, '');
                }


                link.setAttribute('download', filename);
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);

                toast({
                    title: "Reporte generado.",
                    description: "El reporte se ha generado exitosamente.",
                    status: "success",
                    duration: 9000,
                    isClosable: true,
                });
            })
            .catch(error => {
                toast({
                    title: "Error al generar el reporte.",
                    description: error.response?.data?.msg || "Ocurrió un error.",
                    status: "error",
                    duration: 9000,
                    isClosable: true,
                });
            })
            .finally(() => {
                setCargando(false);
            });
    };

    return (
        <Box p={4} height="100%" border="1px" borderColor="#252526" borderRadius="10">
            <Heading as="h3" size="lg" mb={5}>Generar Reporte</Heading>

            <FormControl>
                <FormLabel>Seleccione el tipo de reporte:</FormLabel>
                <Select
                    placeholder='Seleccione el reporte'
                    value={datos_reporte.tipo_reporte}
                    onChange={handleSelectChange}
                >
                    <option value="1">Reporte de solicitudes</option>
                    {/* Agrega más opciones aquí si es necesario */}
                </Select>
            </FormControl>

            {datos_reporte.tipo_reporte && (
                <>
                    <Divider my={4} />
                    <Heading as="h4" size="md" mb={4}>Filtros para el reporte</Heading>

                    <Stack spacing={4} as="form">
                        {datos_reporte.tipo_reporte === '1' && (
                            <>
                                <HStack>
                                    <Checkbox
                                        isChecked={activo.apoyo}
                                        onChange={() => handleCheckboxChange('apoyo')}
                                    >
                                        Apoyo
                                    </Checkbox>
                                    <FormControl isDisabled={!activo.apoyo}>
                                        <FormLabel>Apoyo:</FormLabel>
                                        <Select
                                            placeholder="Seleccione un apoyo"
                                            value={datos_reporte.tipo_apoyo}
                                            onChange={(e) =>
                                                set_datos_reporte({
                                                    ...datos_reporte,
                                                    tipo_apoyo: e.target.value
                                                })
                                            }
                                            isDisabled={!activo.apoyo}
                                        >
                                            <option value="Todos">Todos los apoyos</option>
                                            {apoyos.map(apoyo => (
                                                <option key={apoyo._id} value={apoyo._id}>
                                                    {apoyo.nombre}
                                                </option>
                                            ))}
                                        </Select>
                                    </FormControl>
                                </HStack>
                                <HStack>
                                    <Checkbox
                                        isChecked={activo.periodo}
                                        onChange={() => handleCheckboxChange('periodo')}
                                    >
                                        Periodo
                                    </Checkbox>
                                    <FormControl isDisabled={!activo.periodo}>
                                        <FormLabel>Fecha de inicio del periodo:</FormLabel>
                                        <Input
                                            type="date"
                                            value={datos_reporte.periodo.fecha1}
                                            onChange={(e) =>
                                                set_datos_reporte({
                                                    ...datos_reporte,
                                                    periodo: {
                                                        ...datos_reporte.periodo,
                                                        fecha1: e.target.value,
                                                    },
                                                })
                                            }
                                            isDisabled={!activo.periodo}
                                        />
                                    </FormControl>
                                    <FormControl isDisabled={!activo.periodo}>
                                        <FormLabel>Fecha de fin del periodo:</FormLabel>
                                        <Input
                                            type="date"
                                            value={datos_reporte.periodo.fecha2}
                                            onChange={(e) =>
                                                set_datos_reporte({
                                                    ...datos_reporte,
                                                    periodo: {
                                                        ...datos_reporte.periodo,
                                                        fecha2: e.target.value,
                                                    },
                                                })
                                            }
                                            isDisabled={!activo.periodo}
                                        />
                                    </FormControl>
                                </HStack>
                                <HStack>
                                    <Checkbox
                                        isChecked={activo.colonia}
                                        onChange={() => handleCheckboxChange('colonia')}
                                    >
                                        Colonia
                                    </Checkbox>
                                    <FormControl isDisabled={!activo.colonia}>
                                        <FormLabel>Colonia:</FormLabel>
                                        <Select
                                            placeholder='Selecciona una colonia'
                                            value={datos_reporte.colonia}
                                            onChange={(e) =>
                                                set_datos_reporte({
                                                    ...datos_reporte,
                                                    colonia: e.target.value
                                                })
                                            }
                                            isDisabled={!activo.colonia}
                                        >
                                            {colonias.map(colonia => (
                                                <option key={colonia._id} value={colonia._id}>
                                                    {colonia.nombre_colonia}
                                                </option>
                                            ))}
                                        </Select>
                                    </FormControl>
                                </HStack>
                                <HStack>
                                    <Checkbox
                                        isChecked={activo.curp}
                                        onChange={() => handleCheckboxChange('curp')}
                                    >
                                        CURP
                                    </Checkbox>
                                    <FormControl isDisabled={!activo.curp}>
                                        <FormLabel>CURP:</FormLabel>
                                        <Input
                                            value={datos_reporte.curp}
                                            onChange={(e) =>
                                                set_datos_reporte({
                                                    ...datos_reporte,
                                                    curp: e.target.value,
                                                })
                                            }
                                            isDisabled={!activo.curp}
                                        />
                                    </FormControl>
                                </HStack>
                            </>
                        )}

                        {datos_reporte.tipo_reporte === '2' && (
                            <>
                                {/* Agrega los campos específicos para el tipo de reporte 2 aquí */}
                                <FormControl>
                                    <FormLabel>Campo específico tipo reporte 2:</FormLabel>
                                    <Input
                                        value={datos_reporte.campo_especifico}
                                        onChange={(e) =>
                                            set_datos_reporte({
                                                ...datos_reporte,
                                                campo_especifico: e.target.value,
                                            })
                                        }
                                    />
                                </FormControl>
                            </>
                        )}

                        <Button
                            colorScheme="teal"
                            onClick={handleSubmit}
                            isLoading={cargando}
                        >
                            Generar Reporte
                        </Button>

                        {cargando && (
                            <HStack>
                                <Spinner size="sm" />
                                <Text>Generando reporte...</Text>
                            </HStack>
                        )}
                    </Stack>
                </>
            )}
        </Box>
    );
}

export default ReporteFormulario;
