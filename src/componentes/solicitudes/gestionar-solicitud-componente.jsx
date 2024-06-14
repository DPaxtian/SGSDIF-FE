import React, { useState, useEffect } from 'react';
import {
    Flex,
    Input,
    Button,
    FormControl,
    FormLabel,
    Select,
    Stack,
    Heading,
    Textarea,
    useToast,
} from '@chakra-ui/react';
import { useForm } from 'react-hook-form';
import axios from 'axios';

export default function GestionarSolicitudComponente({ solicitud }) {
    const { register, handleSubmit, formState: { errors }, reset } = useForm({
        defaultValues: {
            curp: solicitud?.curp || '',
            genero: solicitud?.genero || '',
            nombre: solicitud?.nombre || '',
            apellido1: solicitud?.apellido_paterno || '',
            apellido2: solicitud?.apellido_materno || '',
            telefono1: solicitud?.telefonos?.[0] || '',
            telefono2: solicitud?.telefonos?.[1] || '',
            codigoPostal: solicitud?.direccion?.codigo_postal || '',
            colonia: solicitud?.direccion?.colonia || '',
            municipio: solicitud?.direccion?.municipio || '',
            estado: solicitud?.direccion?.estado || '',
            calle: solicitud?.direccion?.calle || '',
            numeroVivienda: solicitud?.direccion?.no_casa || '',
            numeroInterior: solicitud?.direccion?.numero_interior || '',
            tipoApoyo: solicitud?.apoyo_solicitado || '',
            fecha: solicitud?.fecha_captura ? new Date(solicitud.fecha_captura).toISOString().split('T')[0] : '',
            observaciones: solicitud?.observaciones || '',
        },
    });

    const [isEditable, setIsEditable] = useState(false);
    const [colonias, setColonias] = useState([]);
    const [apoyos, setApoyos] = useState([]);
    const toast = useToast();
    const token = localStorage.getItem('token_acceso');

    useEffect(() => {
        const obtenerColonias = async () => {
            try {
                const colonias_encontradas = await axios.get(import.meta.env.VITE_APP_API_URL_OBTENER_TODAS_COLONIAS, {
                    headers: {
                        'token_acceso': token,
                    },
                });

                if (colonias_encontradas.data.code === 500) {
                    toast({
                        title: "Error",
                        description: "El sistema no está disponible, inténtalo más tarde",
                        status: "error",
                        duration: 3000,
                        isClosable: true,
                    });
                } else {
                    setColonias(colonias_encontradas.data.data);
                }
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

        const obtenerApoyos = async () => {
            try {
                const apoyos_encontrados = await axios.get(import.meta.env.VITE_APP_API_URL_OBTENER_TODOS_APOYOS, {
                    headers: {
                        'token_acceso': token,
                    },
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
                    setApoyos(apoyos_encontrados.data.data);
                }
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

        obtenerColonias();
        obtenerApoyos();
    }, [token, toast]);

    useEffect(() => {
        reset(solicitud);
    }, [solicitud, reset]);

    const toggleEdit = () => {
        setIsEditable(!isEditable);
    };

    const actualizarEstado = async (estado) => {
        try {
            const response = await axios.put(import.meta.env.VITE_APP_API_URL_ACTUALIZAR_SOLICITUD + solicitud._id,
                {
                    ...solicitud,
                    estado: estado
                },
                {
                    headers: {
                        'token_acceso': token,
                    },
                });

            if (response.data.code === 201) {
                toast({
                    title: "Éxito",
                    description: "Solicitud actualizada con éxito",
                    status: "success",
                    duration: 3000,
                    isClosable: true,
                });
            } else {
                toast({
                    title: "Error",
                    description: "Error al actualizar la solicitud",
                    status: "error",
                    duration: 3000,
                    isClosable: true,
                });
            }
        } catch (error) {
            toast({
                title: "Error",
                description: "Error al actualizar la solicitud",
                status: "error",
                duration: 3000,
                isClosable: true,
            });
        }
    };

    const onSubmit = async (data) => {
        // Aquí puedes manejar la lógica para actualizar los datos
        console.log('Datos actualizados:', data);
    };

    if (!solicitud) {
        return (
            <div>
                <h1>No se encontró la solicitud</h1>
            </div>
        );
    }

    return (
        <Flex direction="column" p={5} borderWidth={1} borderRadius="lg" boxShadow="lg" width="100%" height="100%" mx="auto">
            <form onSubmit={handleSubmit(onSubmit)}>
                <Heading as="h3" size="lg" mb={5}>
                    Gestionar solicitud
                </Heading>

                <Stack direction="row" spacing={4}>
                    <FormControl isRequired isInvalid={errors.curp}>
                        <FormLabel>Curp:</FormLabel>
                        <Input
                            id="curp"
                            borderColor="#252526"
                            isReadOnly={!isEditable}
                            {...register('curp', {
                                required: 'Este campo es obligatorio',
                                pattern: {
                                    value: /^[A-Z]{4}\d{6}[HM]\w{2}\w{3}\w{2}$/,
                                    message: 'Formato de CURP no válido',
                                },
                            })}
                        />
                    </FormControl>
                    <FormControl isRequired isInvalid={errors.genero}>
                        <FormLabel>Género:</FormLabel>
                        <Select
                            id="genero"
                            borderColor="#252526"
                            isReadOnly={!isEditable}
                            {...register('genero', { required: 'Este campo es obligatorio' })}
                        >
                            <option value="Hombre">Hombre</option>
                            <option value="Mujer">Mujer</option>
                        </Select>
                    </FormControl>
                </Stack>

                <Stack direction="row" spacing={4}>
                    <FormControl isRequired isInvalid={errors.nombre}>
                        <FormLabel>Nombre(s):</FormLabel>
                        <Input
                            id="nombre"
                            borderColor="#252526"
                            isReadOnly={!isEditable}
                            {...register('nombre', { required: 'Este campo es obligatorio' })}
                        />
                    </FormControl>
                    <FormControl isRequired isInvalid={errors.apellido1}>
                        <FormLabel>Primer Apellido:</FormLabel>
                        <Input
                            id="apellido1"
                            borderColor="#252526"
                            isReadOnly={!isEditable}
                            {...register('apellido1', { required: 'Este campo es obligatorio' })}
                        />
                    </FormControl>
                    <FormControl isInvalid={errors.apellido2}>
                        <FormLabel>Segundo Apellido:</FormLabel>
                        <Input
                            id="apellido2"
                            borderColor="#252526"
                            isReadOnly={!isEditable}
                            {...register('apellido2')}
                        />
                    </FormControl>
                </Stack>

                <Stack direction="row" spacing={4}>
                    <FormControl isRequired isInvalid={errors.telefono1}>
                        <FormLabel>Número de teléfono 1:</FormLabel>
                        <Input
                            id="telefono1"
                            borderColor="#252526"
                            isReadOnly={!isEditable}
                            {...register('telefono1', {
                                required: 'Este campo es obligatorio',
                                pattern: {
                                    value: /^[0-9]{10}$/,
                                    message: 'Formato de número de teléfono no válido',
                                },
                            })}
                        />
                    </FormControl>
                    <FormControl isInvalid={errors.telefono2}>
                        <FormLabel>Número de teléfono 2:</FormLabel>
                        <Input
                            id="telefono2"
                            borderColor="#252526"
                            isReadOnly={!isEditable}
                            {...register('telefono2', {
                                pattern: {
                                    value: /^[0-9]{10}$/,
                                    message: 'Formato de número de teléfono no válido',
                                },
                            })}
                        />
                    </FormControl>
                </Stack>

                <Stack direction="row" spacing={4}>
                    <FormControl isRequired isInvalid={errors.codigoPostal}>
                        <FormLabel>Código postal:</FormLabel>
                        <Input
                            id="codigoPostal"
                            borderColor="#252526"
                            isReadOnly={!isEditable}
                            {...register('codigoPostal', {
                                required: 'Este campo es obligatorio',
                                pattern: {
                                    value: /^\d{5}$/,
                                    message: 'Formato de código postal no válido',
                                },
                            })}
                        />
                    </FormControl>
                    <FormControl isRequired isInvalid={errors.colonia}>
                        <FormLabel>Colonia:</FormLabel>
                        <Select
                            id="colonia"
                            borderColor="#252526"
                            isReadOnly={!isEditable}
                            {...register('colonia', { required: 'Este campo es obligatorio' })}
                        >
                            {colonias.map((colonia) => (
                                <option key={colonia._id} value={colonia._id}>
                                    {colonia.nombre_colonia}
                                </option>
                            ))}
                        </Select>
                    </FormControl>
                </Stack>

                <Stack direction="row" spacing={4}>
                    <FormControl isRequired isInvalid={errors.municipio}>
                        <FormLabel>Municipio:</FormLabel>
                        <Input
                            id="municipio"
                            borderColor="#252526"
                            isReadOnly={!isEditable}
                            {...register('municipio', { required: 'Este campo es obligatorio' })}
                        />
                    </FormControl>
                    <FormControl isRequired isInvalid={errors.estado}>
                        <FormLabel>Estado:</FormLabel>
                        <Input
                            id="estado"
                            borderColor="#252526"
                            isReadOnly={!isEditable}
                            {...register('estado', { required: 'Este campo es obligatorio' })}
                        />
                    </FormControl>
                    <FormControl isRequired isInvalid={errors.calle}>
                        <FormLabel>Calle:</FormLabel>
                        <Input
                            id="calle"
                            borderColor="#252526"
                            isReadOnly={!isEditable}
                            {...register('calle', { required: 'Este campo es obligatorio' })}
                        />
                    </FormControl>
                </Stack>

                <Stack direction="row" spacing={4}>
                    <FormControl isRequired isInvalid={errors.numeroVivienda}>
                        <FormLabel>Número de vivienda:</FormLabel>
                        <Input
                            id="numeroVivienda"
                            borderColor="#252526"
                            isReadOnly={!isEditable}
                            {...register('numeroVivienda', {
                                required: 'Este campo es obligatorio',
                                pattern: {
                                    value: /^\d+$/,
                                    message: 'Formato de número de vivienda no válido',
                                },
                            })}
                        />
                    </FormControl>
                    <FormControl isInvalid={errors.numeroInterior}>
                        <FormLabel>Número interior:</FormLabel>
                        <Input
                            id="numeroInterior"
                            borderColor="#252526"
                            isReadOnly={!isEditable}
                            {...register('numeroInterior')}
                        />
                    </FormControl>
                </Stack>

                <Stack direction="row" spacing={4}>
                    <FormControl isRequired isInvalid={errors.tipoApoyo}>
                        <FormLabel>Tipo de apoyo:</FormLabel>
                        <Select
                            id="tipoApoyo"
                            borderColor="#252526"
                            isReadOnly={!isEditable}
                            {...register('tipoApoyo', { required: 'Este campo es obligatorio' })}
                        >
                            {apoyos.map((apoyo) => (
                                <option key={apoyo._id} value={apoyo._id}>
                                    {apoyo.nombre}
                                </option>
                            ))}
                        </Select>
                    </FormControl>
                    <FormControl isRequired isInvalid={errors.fecha}>
                        <FormLabel>Fecha:</FormLabel>
                        <Input
                            type="date"
                            id="fecha"
                            borderColor="#252526"
                            isReadOnly={!isEditable}
                            {...register('fecha', {
                                required: 'Este campo es obligatorio',
                                validate: (value) => {
                                    const selectedDate = new Date(value);
                                    const year = selectedDate.getFullYear();
                                    return year >= 2000 || 'Fecha incorrecta';
                                },
                            })}
                        />
                    </FormControl>
                </Stack>

                <Stack direction="row" spacing={4}>
                    <FormControl>
                        <FormLabel>Observaciones:</FormLabel>
                        <Textarea
                            id="observaciones"
                            borderColor="#252526"
                            isReadOnly={!isEditable}
                            {...register('observaciones')}
                        />
                    </FormControl>
                </Stack>

                <Button onClick={toggleEdit} mt={4}>
                    {isEditable ? 'Guardar cambios' : 'Modificar'}
                </Button>

                {isEditable && (
                    <Button type="submit" mt={4} colorScheme="teal">
                        Enviar
                    </Button>
                )}
            </form>
            <Stack direction="row" spacing={4} mt={4}>
                <Button colorScheme="green" onClick={() => actualizarEstado('Aceptado')}>Aceptar</Button>
                <Button colorScheme="red" onClick={() => actualizarEstado('Rechazado')}>Rechazar</Button>
            </Stack>
        </Flex>
    );
}
