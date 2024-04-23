import React from 'react';
import { useForm } from 'react-hook-form';
import { Box, Button, Flex, FormControl, FormErrorMessage, FormLabel, Input, Select } from '@chakra-ui/react';

const AgregarNuevaSolicitud = () => {
  const { handleSubmit, register, formState: { errors } } = useForm();

  const onSubmit = (data) => {
    console.log(data);
  };

  return (
    <Box
      borderRadius="20px"
      display="flex"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
      width="100%"
      height="100%"
      padding={4}
      boxShadow="0 4px 12px 0 rgba(0, 0, 0, 0.05)"
    >
      {/* Primera Fila */}
      <Box mb={4}>
        Completa los campos del beneficiario para una nueva solicitud
      </Box>

      <Box mb={4}>
        Los campos marcados con * son obligatorios
      </Box>
      
      <form onSubmit={handleSubmit(onSubmit)}>
        {/* Segunda Fila */}
        <FormControl isInvalid={errors.curp}>
          <FormLabel htmlFor="curp">CURP</FormLabel>
          <Input id="curp" {...register("curp", { required: "Este campo es requerido" })} />
          <FormErrorMessage>{errors.curp && errors.curp.message}</FormErrorMessage>
        </FormControl>

        <Flex
          flexDirection="row"
          justifyContent="space-between"
          width="100%"
          gap={18}
        >
          {/* Tercera Fila */}
          <FormControl isInvalid={errors.nombre}>
            <FormLabel htmlFor="nombre">Nombre</FormLabel>
            <Input id="nombre" {...register("nombre", { required: "Este campo es requerido" })} />
            <FormErrorMessage>{errors.nombre && errors.nombre.message}</FormErrorMessage>
          </FormControl>

          <FormControl isInvalid={errors.apellido1}>
            <FormLabel htmlFor="apellido1">Primer Apellido</FormLabel>
            <Input id="apellido1" {...register("apellido1", { required: "Este campo es requerido" })} />
            <FormErrorMessage>{errors.apellido1 && errors.apellido1.message}</FormErrorMessage>
          </FormControl>

          <FormControl isInvalid={errors.apellido2}>
            <FormLabel htmlFor="apellido2">Segundo Apellido</FormLabel>
            <Input id="apellido2" {...register("apellido2", { required: "Este campo es requerido" })} />
            <FormErrorMessage>{errors.apellido2 && errors.apellido2.message}</FormErrorMessage>
          </FormControl>
        </Flex>

        <Flex gap={18}>
          {/* Cuarta Fila */}
          <FormControl isInvalid={errors.telefono1}>
            <FormLabel htmlFor="telefono1">Teléfono 1</FormLabel>
            <Input id="telefono1" {...register("telefono1", { required: "Este campo es requerido" })} />
            <FormErrorMessage>{errors.telefono1 && errors.telefono1.message}</FormErrorMessage>
          </FormControl>

          <FormControl isInvalid={errors.telefono2}>
            <FormLabel htmlFor="telefono2">Teléfono 2</FormLabel>
            <Input id="telefono2" {...register("telefono2")} />
            <FormErrorMessage>{errors.telefono2 && errors.telefono2.message}</FormErrorMessage>
          </FormControl>
        </Flex>

        <Flex gap={18}>
          {/* Quinta Fila */}
          <FormControl isInvalid={errors.codigoPostal}>
            <FormLabel htmlFor="codigoPostal">Código Postal</FormLabel>
            <Input id="codigoPostal" {...register("codigoPostal", { required: "Este campo es requerido" })} />
            <FormErrorMessage>{errors.codigoPostal && errors.codigoPostal.message}</FormErrorMessage>
          </FormControl>

          
          <FormControl isInvalid={errors.colonia}>
            <FormLabel htmlFor="colonia">Colonia</FormLabel>
            <Select id="colonia" {...register("colonia", { required: "Este campo es requerido" })}>
              <option value="">Selecciona una opcion</option>
            </Select>
            <FormErrorMessage>{errors.colonia && errors.colonia.message}</FormErrorMessage>
          </FormControl>

        </Flex>

        <Flex gap={18}>
          {/* Sexta Fila */}
          <FormControl isInvalid={errors.municipio}>
            <FormLabel htmlFor="municipio">Municipio</FormLabel>
            <Input id="municipio" {...register("municipio", { required: "Este campo es requerido" })} />
            <FormErrorMessage>{errors.municipio && errors.municipio.message}</FormErrorMessage>
          </FormControl>

          <FormControl isInvalid={errors.estado}>
            <FormLabel htmlFor="estado">Estado</FormLabel>
            <Input id="estado" {...register("estado", { required: "Este campo es requerido" })} />
            <FormErrorMessage>{errors.estado && errors.estado.message}</FormErrorMessage>
          </FormControl>

          <FormControl isInvalid={errors.calle}>
            <FormLabel htmlFor="calle">Calle</FormLabel>
            <Input id="calle" {...register("calle", { required: "Este campo es requerido" })} />
            <FormErrorMessage>{errors.calle && errors.calle.message}</FormErrorMessage>
          </FormControl>
        </Flex>

        <Flex
          gap={18}
        >
          {/* Séptima Fila */}
          <FormControl isInvalid={errors.numeroVivienda}>
            <FormLabel htmlFor="numeroVivienda">Número de vivienda</FormLabel>
            <Input id="numeroVivienda" {...register("numeroVivienda", { required: "Este campo es requerido" })} />
            <FormErrorMessage>{errors.numeroVivienda && errors.numeroVivienda.message}</FormErrorMessage>
          </FormControl>

          <FormControl isInvalid={errors.numeroInterior}>
            <FormLabel htmlFor="numeroInterior">Número interior</FormLabel>
            <Input id="numeroInterior" {...register("numeroInterior")} />
            <FormErrorMessage>{errors.numeroInterior && errors.numeroInterior.message}</FormErrorMessage>
          </FormControl>
        </Flex>


        <Button mt={4} colorScheme="teal" type="submit">Siguiente</Button>
      </form>
    </Box>
  );
};

export default AgregarNuevaSolicitud;
