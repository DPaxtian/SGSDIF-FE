import React from 'react';
import { useForm } from 'react-hook-form';
import { Box, Button, Flex, FormControl, FormErrorMessage, FormLabel, IconButton, Input, Select } from '@chakra-ui/react';
import { FiFolderPlus } from 'react-icons/fi';
import { IconContext } from 'react-icons';
import { useRef } from 'react';

const AgregarNuevaSolicitudSegundaParte = ({ formData }) => {
    const { handleSubmit, register, formState: { errors } } = useForm();
    const inputRef = useRef(null);

    const onSubmit = (data) => {
        console.log('Datos del primer formulario:', formData);
        console.log('Datos del segundo formulario:', data);
    };

    return (
        <Box
            borderRadius="20px"
            display="flex"
            flexDirection="column"
            justifyContent="center"
            alignItems="flex-start"
            p={14}
            width="95%"
            height="90%"
            boxShadow="0 4px 12px 0 rgba(0, 0, 0, 0.05)"
        >
            {/* Primera Fila */}
            <Box mb={4} fontSize="28px">
                Completa los campos referentes al apoyo solicitado
            </Box>

            <Box mb={4} fontSize="18px">
                Los campos marcados con * son obligatorios
            </Box>

            <form onSubmit={handleSubmit(onSubmit)}>

                <Flex
                    flexDirection="row"
                    justifyContent="space-between"
                    width="100%"
                    gap={18}
                >
                    {/* Octava Fila */}
                    <FormControl isInvalid={errors.apoyoSolicitado}>
                        <FormLabel htmlFor="apoyoSolicitado">Apoyo solicitado*:</FormLabel>
                        <Select width="500px" id="apoyoSolicitado" borderColor="#252526" {...register("apoyoSolicitado", { required: "Este campo es requerido" })}>
                            <option value="">Selecciona una opcion</option>
                            <option value="1">Laminas</option>
                        </Select>
                        <FormErrorMessage>{errors.apoyoSolicitado && errors.apoyoSolicitado.message}</FormErrorMessage>
                    </FormControl>

                    <FormControl isInvalid={errors.fechaSolicitud}>
                        <FormLabel htmlFor="fechaSolicitud">Fecha de solicitud*:</FormLabel>
                        <Input id="fechaSolicitud" width="500px" borderColor="#252526" {...register("fechaSolicitud", { required: "Este campo es requerido" })} />
                        <FormErrorMessage>{errors.fechaSolicitud && errors.fechaSolicitud.message}</FormErrorMessage>
                    </FormControl>
                </Flex>

                <FormControl isInvalid={errors.observaciones}>
                        <FormLabel htmlFor="observaciones">Observaciones:</FormLabel>
                        <Input id="observaciones" height="200px" alignContent="flex-start" borderColor="#252526" {...register("observaciones", { required: "Este campo es requerido" })} />
                        <FormErrorMessage>{errors.observaciones && errors.observaciones.message}</FormErrorMessage>
                </FormControl>
                
                <Flex>
                    <FormControl isInvalid={errors.archivo}>
                        <FormLabel htmlFor="archivo">Subir archivo*:</FormLabel>
                        <Input
                            type="file"
                            id="archivo"
                            display="none"
                            {...register("archivo", { required: "Este campo es requerido" })}
                            ref={inputRef} 
                            
                        />
                        <IconButton
                            icon={<IconContext.Provider value={{ size: "80px" }}><FiFolderPlus /></IconContext.Provider>}
                            onClick={() => inputRef.current && inputRef.current.click()} // Asegura que el input se active al hacer clic
                            aria-label="Subir archivo" 
                            height="200px"
                            width="1200px"
                            
                        />
                    </FormControl>
                </Flex>
                

                

                <Button mt={4} colorScheme="teal" type="submit" backgroundColor="#252526" fontWeight="regular" width="200px" h="50px">Registrar nueva solicitud</Button>

            </form>


        </Box>
    );
};

export default AgregarNuevaSolicitudSegundaParte;