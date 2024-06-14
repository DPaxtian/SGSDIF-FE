import { useForm } from 'react-hook-form';
import React, { useState, useEffect } from 'react';
import {
  Flex,
  Input,
  Button,
  FormControl,
  FormLabel,
  FormErrorMessage,
  Select,
  Stack,
  Heading,
  Textarea,
  Text,
  useToast,
} from '@chakra-ui/react';
import axios from 'axios';

export default function AgregarSolicitud() {
  const { register, handleSubmit, formState: { errors }, reset } = useForm();
  const token = localStorage.getItem('token_acceso');
  const toast = useToast();
  const [colonias, setColonias] = useState([]);
  const [apoyos, setApoyos] = useState([]);

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

  const onSubmit = async (data) => {
    const {
      fecha,
      nombre,
      primerApellido,
      segundoApellido,
      curp,
      calle,
      colonia,
      estado,
      municipio,
      numeroVivienda,
      numeroInterior,
      telefono1,
      telefono2,
      tipoApoyo,
      observaciones,
      archivo,
    } = data;

    try {
      const response = await axios.post(
        import.meta.env.VITE_APP_API_URL_REGISTRAR_SOLICITUD,
        {
          no: 1,
          fecha_captura: fecha,
          nombre,
          apellido_paterno: primerApellido,
          apellido_materno: segundoApellido || '',
          curp,
          direccion: {
            calle,
            colonia,
            estado,
            municipio,
            no_exterior: numeroVivienda,
            no_interior: numeroInterior || '',
          },
          telefonos: [telefono1, telefono2].filter(Boolean),
          apoyo_solicitado: tipoApoyo,
          observaciones: observaciones || '',
          estado: 'Solicitado',
        },
        {
          headers: {
            'token_acceso': token,
          },
        }
      );

      if (response.data.code === 201) {
        const idSolicitud = response.data.data.id;
        await subirArchivo(idSolicitud, archivo[0]);

        toast({
          title: "Éxito",
          description: "Solicitud y archivo subidos con éxito",
          status: "success",
          duration: 3000,
          isClosable: true,
        });

        reset();
      }
    } catch (error) {
      if (error.response) {
        if (error.response.data.code === 400) {
          toast({
            title: "Error",
            description: "Información incompleta o errónea, por favor verifíquela",
            status: "error",
            duration: 3000,
            isClosable: true,
          });
        } else if (error.response.data.code === 500) {
          toast({
            title: "Error",
            description: "Solicitud no creada :)",
            status: "error",
            duration: 3000,
            isClosable: true,
          });
        }
      } else {
        toast({
          title: "Error",
          description: "Error desconocido, por favor inténtelo de nuevo más tarde",
          status: "error",
          duration: 3000,
          isClosable: true,
        });
      }
    }
  };

  const subirArchivo = async (idSolicitud, archivo) => {
    const formData = new FormData();
    formData.append('archivo', archivo);

    try {
      const response = await axios.post(
        import.meta.env.VITE_APP_API_URL_SUBIR_ARCHIVO, idSolicitud,
        formData,
        {
          headers: {
            'token_acceso': token,
          },
        }
      );

      if (response.data.code !== 200) {
        throw new Error('Error al subir el archivo');
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Error desconocido subir el archivo",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  return (
    <Flex direction="column" p={5} borderWidth={1} borderRadius="lg" boxShadow="lg" width="100%" height="100%" mx="auto">
      <form onSubmit={handleSubmit(onSubmit)}>
        <Heading as="h3" size="lg" mb={5}>
          Completa los campos referentes al solicitante del apoyo
        </Heading>
        <Text mb={5}>Los campos que contienen un * son obligatorios</Text>

        <Stack direction="row" spacing={4}>
          <FormControl isRequired isInvalid={errors.curp} flex="2">
            <FormLabel>Curp:</FormLabel>
            <Input
              id="curp"
              borderColor="#252526"
              {...register('curp', {
                required: 'Este campo es obligatorio',
                pattern: {
                  value: /^[A-Z]{4}\d{6}[HM]\w{2}\w{3}\w{2}$/,
                  message: 'Formato de CURP no válido',
                },
              })}
            />
            <FormErrorMessage>{errors.curp && errors.curp.message}</FormErrorMessage>
          </FormControl>
          <FormControl isRequired isInvalid={errors.genero} flex="1">
            <FormLabel>Género:</FormLabel>
            <Select
              id="genero"
              borderColor="#252526"
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
              {...register('nombre', { required: 'Este campo es obligatorio' })}
            />
            <FormErrorMessage>{errors.nombre && errors.nombre.message}</FormErrorMessage>
          </FormControl>
          <FormControl isRequired isInvalid={errors.primerApellido}>
            <FormLabel>Primer Apellido:</FormLabel>
            <Input
              id="primerApellido"
              borderColor="#252526"
              {...register('primerApellido', { required: 'Este campo es obligatorio' })}
            />
            <FormErrorMessage>{errors.primerApellido && errors.primerApellido.message}</FormErrorMessage>
          </FormControl>
          <FormControl isInvalid={errors.segundoApellido}>
            <FormLabel>Segundo Apellido:</FormLabel>
            <Input id="segundoApellido" borderColor="#252526" {...register('segundoApellido')} />
            <FormErrorMessage>{errors.segundoApellido && errors.segundoApellido.message}</FormErrorMessage>
          </FormControl>
        </Stack>

        <Stack direction="row" spacing={4}>
          <FormControl isRequired isInvalid={errors.telefono1}>
            <FormLabel>Número de teléfono 1:</FormLabel>
            <Input
              id="telefono1"
              borderColor="#252526"
              {...register('telefono1', {
                required: 'Este campo es obligatorio',
                pattern: {
                  value: /^[0-9]{10}$/,
                  message: 'Formato de número de teléfono no válido',
                },
              })}
            />
            <FormErrorMessage>{errors.telefono1 && errors.telefono1.message}</FormErrorMessage>
          </FormControl>
          <FormControl isInvalid={errors.telefono2}>
            <FormLabel>Número de teléfono 2:</FormLabel>
            <Input
              id="telefono2"
              borderColor="#252526"
              {...register('telefono2', {
                pattern: {
                  value: /^[0-9]{10}$/,
                  message: 'Formato de número de teléfono no válido',
                },
              })}
            />
            <FormErrorMessage>{errors.telefono2 && errors.telefono2.message}</FormErrorMessage>
          </FormControl>
        </Stack>

        <Stack direction="row" spacing={4}>
          <FormControl isRequired isInvalid={errors.codigoPostal}>
            <FormLabel>Código postal:</FormLabel>
            <Input
              id="codigoPostal"
              borderColor="#252526"
              {...register('codigoPostal', {
                required: 'Este campo es obligatorio',
                pattern: {
                  value: /^\d{5}$/,
                  message: 'Formato de código postal no válido',
                },
              })}
            />
            <FormErrorMessage>{errors.codigoPostal && errors.codigoPostal.message}</FormErrorMessage>
          </FormControl>
          <FormControl isRequired isInvalid={errors.colonia}>
            <FormLabel>Colonia:</FormLabel>
            <Select id="colonia" borderColor="#252526" {...register('colonia', { required: 'Este campo es obligatorio' })}>
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
            <Input id="municipio" borderColor="#252526" {...register('municipio', { required: 'Este campo es obligatorio' })} />
            <FormErrorMessage>{errors.municipio && errors.municipio.message}</FormErrorMessage>
          </FormControl>
          <FormControl isRequired isInvalid={errors.estado}>
            <FormLabel>Estado:</FormLabel>
            <Input id="estado" borderColor="#252526" {...register('estado', { required: 'Este campo es obligatorio' })} />
            <FormErrorMessage>{errors.estado && errors.estado.message}</FormErrorMessage>
          </FormControl>
          <FormControl isRequired isInvalid={errors.calle}>
            <FormLabel>Calle:</FormLabel>
            <Input id="calle" borderColor="#252526" {...register('calle', { required: 'Este campo es obligatorio' })} />
            <FormErrorMessage>{errors.calle && errors.calle.message}</FormErrorMessage>
          </FormControl>
        </Stack>

        <Stack direction="row" spacing={4}>
          <FormControl isRequired isInvalid={errors.numeroVivienda}>
            <FormLabel>Número de vivienda:</FormLabel>
            <Input
              id="numeroVivienda"
              borderColor="#252526"
              {...register('numeroVivienda', {
                required: 'Este campo es obligatorio',
                pattern: {
                  value: /^\d+$/,
                  message: 'Formato de número de vivienda no válido',
                },
              })}
            />
            <FormErrorMessage>{errors.numeroVivienda && errors.numeroVivienda.message}</FormErrorMessage>
          </FormControl>
          <FormControl isInvalid={errors.numeroInterior}>
            <FormLabel>Número interior:</FormLabel>
            <Input id="numeroInterior" borderColor="#252526" {...register('numeroInterior')} />
            <FormErrorMessage>{errors.numeroInterior && errors.numeroInterior.message}</FormErrorMessage>
          </FormControl>
        </Stack>

        <Stack direction="row" spacing={4}>
          <FormControl isRequired isInvalid={errors.tipoApoyo}>
            <FormLabel>Tipo de apoyo:</FormLabel>
            <Select id="tipoApoyo" borderColor="#252526" {...register('tipoApoyo', { required: 'Este campo es obligatorio' })}>
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
              {...register('fecha', {
                required: 'Este campo es obligatorio',
                validate: (value) => {
                  const selectedDate = new Date(value);
                  const year = selectedDate.getFullYear();
                  return year >= 2000 || 'Fecha incorrecta';
                },
              })}
            />
            <FormErrorMessage>{errors.fecha && errors.fecha.message}</FormErrorMessage>
          </FormControl>
        </Stack>

        <Stack direction="row" spacing={4}>
          <FormControl>
            <FormLabel>Observaciones:</FormLabel>
            <Textarea id="observaciones" borderColor="#252526" {...register('observaciones')} />
          </FormControl>
        </Stack>

        <Stack direction="row" spacing={4}>
          <FormControl isRequired isInvalid={errors.archivo}>
            <FormLabel>Archivo:</FormLabel>
            <Input
              type="file"
              id="archivo"
              borderColor="#252526"
              {...register('archivo', {
                required: 'Este campo es obligatorio',
                validate: {
                  checkFileType: (value) => {
                    const file = value[0];
                    if (file) {
                      const fileType = file.type;
                      const fileSize = file.size / 1024 / 1024;
                      if (fileType !== 'application/pdf') {
                        return 'El archivo debe ser de tipo PDF';
                      }
                      if (fileSize > 5) {
                        return 'El archivo no debe pesar más de 5 MB';
                      }
                    }
                    return true;
                  },
                },
              })}
            />
            <FormErrorMessage>{errors.archivo && errors.archivo.message}</FormErrorMessage>
          </FormControl>
        </Stack>

        <Button type="submit">Enviar</Button>
      </form>
    </Flex>
  );
}
