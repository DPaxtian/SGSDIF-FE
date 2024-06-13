import React, { useRef } from "react";
import { useForm, FormProvider } from "react-hook-form";
import {
  Box,
  Button,
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  IconButton,
  Input,
  Select,
  Step,
  StepDescription,
  StepIcon,
  StepIndicator,
  StepNumber,
  StepSeparator,
  StepStatus,
  StepTitle,
  Stepper,
  Textarea,
  useSteps,
} from "@chakra-ui/react";
import { IconContext } from "react-icons";
import { FiFolderPlus } from "react-icons/fi";

const steps = [
  { title: "Datos personales", description: "Nombre, apellido y dirección" },
  { title: "Datos de la solicitud", description: "Comentarios adicionales" },
];

const DatosPersonales = ({ register, errors }) => (
  <>
    <Box mb={4} fontSize="28px">
      Completa los campos referentes al solicitante del apoyo
    </Box>

    <Box mb={4} fontSize="18px">
      Los campos marcados con * son obligatorios
    </Box>

    <Flex
      flexDirection="row"
      justifyContent="space-between"
      width="100%"
      gap={18}
    >
      <FormControl isInvalid={errors.curp}>
        <FormLabel htmlFor="curp">CURP*:</FormLabel>
        <Input
          id="curp"
          borderColor="#252526"
          width="403px"
          {...register("curp", { required: "Este campo es requerido" })}
        />
        <FormErrorMessage>
          {errors.curp && errors.curp.message}
        </FormErrorMessage>
      </FormControl>

      <FormControl isInvalid={errors.colonia}>
        <FormLabel htmlFor="colonia">Genero*:</FormLabel>
        <Select
          id="genero"
          borderColor="#252526"
          {...register("genero", { required: "Este campo es requerido" })}
        >
          <option value="">Selecciona una opción</option>
          <option value="1">Hombre</option>
          <option value="1">Mujer</option>
        </Select>
        <FormErrorMessage>
          {errors.colonia && errors.colonia.message}
        </FormErrorMessage>
      </FormControl>
    </Flex>

    <Flex
      flexDirection="row"
      justifyContent="space-between"
      width="100%"
      gap={18}
    >
      <FormControl isInvalid={errors.nombre}>
        <FormLabel htmlFor="nombre">Nombre*:</FormLabel>
        <Input
          id="nombre"
          borderColor="#252526"
          width="330px"
          {...register("nombre", { required: "Este campo es requerido" })}
        />
        <FormErrorMessage>
          {errors.nombre && errors.nombre.message}
        </FormErrorMessage>
      </FormControl>

      <FormControl isInvalid={errors.apellido1}>
        <FormLabel htmlFor="apellido1">Primer Apellido*:</FormLabel>
        <Input
          id="apellido1"
          borderColor="#252526"
          width="330px"
          {...register("apellido1", { required: "Este campo es requerido" })}
        />
        <FormErrorMessage>
          {errors.apellido1 && errors.apellido1.message}
        </FormErrorMessage>
      </FormControl>

      <FormControl isInvalid={errors.apellido2}>
        <FormLabel htmlFor="apellido2">Segundo Apellido:</FormLabel>
        <Input
          id="apellido2"
          borderColor="#252526"
          width="330px"
          {...register("apellido2")}
        />
        <FormErrorMessage>
          {errors.apellido2 && errors.apellido2.message}
        </FormErrorMessage>
      </FormControl>
    </Flex>

    <Flex gap={18}>
      <FormControl isInvalid={errors.telefono1}>
        <FormLabel htmlFor="telefono1">Teléfono 1*:</FormLabel>
        <Input
          id="telefono1"
          borderColor="#252526"
          {...register("telefono1", { required: "Este campo es requerido" })}
        />
        <FormErrorMessage>
          {errors.telefono1 && errors.telefono1.message}
        </FormErrorMessage>
      </FormControl>

      <FormControl isInvalid={errors.telefono2}>
        <FormLabel htmlFor="telefono2">Teléfono 2:</FormLabel>
        <Input
          id="telefono2"
          borderColor="#252526"
          {...register("telefono2")}
        />
        <FormErrorMessage>
          {errors.telefono2 && errors.telefono2.message}
        </FormErrorMessage>
      </FormControl>
    </Flex>

    <Flex gap={18}>
      <FormControl isInvalid={errors.codigoPostal}>
        <FormLabel htmlFor="codigoPostal">Código Postal*:</FormLabel>
        <Input
          id="codigoPostal"
          borderColor="#252526"
          {...register("codigoPostal", { required: "Este campo es requerido" })}
        />
        <FormErrorMessage>
          {errors.codigoPostal && errors.codigoPostal.message}
        </FormErrorMessage>
      </FormControl>

      <FormControl isInvalid={errors.colonia}>
        <FormLabel htmlFor="colonia">Colonia*:</FormLabel>
        <Select
          id="colonia"
          borderColor="#252526"
          {...register("colonia", { required: "Este campo es requerido" })}
        >
          <option value="">Selecciona una opción</option>
          <option value="1">Progreso</option>
        </Select>
        <FormErrorMessage>
          {errors.colonia && errors.colonia.message}
        </FormErrorMessage>
      </FormControl>
    </Flex>

    <Flex gap={18}>
      <FormControl isInvalid={errors.municipio}>
        <FormLabel htmlFor="municipio">Municipio*:</FormLabel>
        <Input
          id="municipio"
          borderColor="#252526"
          {...register("municipio", { required: "Este campo es requerido" })}
        />
        <FormErrorMessage>
          {errors.municipio && errors.municipio.message}
        </FormErrorMessage>
      </FormControl>

      <FormControl isInvalid={errors.estado}>
        <FormLabel htmlFor="estado">Estado*:</FormLabel>
        <Input
          id="estado"
          borderColor="#252526"
          {...register("estado", { required: "Este campo es requerido" })}
        />
        <FormErrorMessage>
          {errors.estado && errors.estado.message}
        </FormErrorMessage>
      </FormControl>

      <FormControl isInvalid={errors.calle}>
        <FormLabel htmlFor="calle">Calle*:</FormLabel>
        <Input
          id="calle"
          borderColor="#252526"
          {...register("calle", { required: "Este campo es requerido" })}
        />
        <FormErrorMessage>
          {errors.calle && errors.calle.message}
        </FormErrorMessage>
      </FormControl>
    </Flex>

    <Flex gap={18}>
      <FormControl isInvalid={errors.numeroVivienda}>
        <FormLabel htmlFor="numeroVivienda">Número de vivienda*:</FormLabel>
        <Input
          id="numeroVivienda"
          borderColor="#252526"
          {...register("numeroVivienda", {
            required: "Este campo es requerido",
          })}
        />
        <FormErrorMessage>
          {errors.numeroVivienda && errors.numeroVivienda.message}
        </FormErrorMessage>
      </FormControl>

      <FormControl isInvalid={errors.numeroInterior}>
        <FormLabel htmlFor="numeroInterior">Número interior:</FormLabel>
        <Input
          id="numeroInterior"
          borderColor="#252526"
          {...register("numeroInterior")}
        />
        <FormErrorMessage>
          {errors.numeroInterior && errors.numeroInterior.message}
        </FormErrorMessage>
      </FormControl>
    </Flex>
  </>
);

const Observaciones = ({ register, errors }) => {
  const inputRef = useRef(null);

  return (
    <>
      <Box mb={4} fontSize="28px">
        Completa los campos referentes al apoyo solicitado
      </Box>

      <Box mb={4} fontSize="18px">
        Los campos marcados con * son obligatorios
      </Box>

      <Flex
        flexDirection="row"
        justifyContent="space-between"
        width="100%"
        gap={18}
      >
        <FormControl isInvalid={errors.apoyoSolicitado}>
          <FormLabel htmlFor="apoyoSolicitado">Apoyo solicitado*:</FormLabel>
          <Select
            width="500px"
            id="apoyoSolicitado"
            borderColor="#252526"
            {...register("apoyoSolicitado", {
              required: "Este campo es requerido",
            })}
          >
            <option value="">Selecciona una opción</option>
            <option value="1">Laminas</option>
          </Select>
          <FormErrorMessage>
            {errors.apoyoSolicitado && errors.apoyoSolicitado.message}
          </FormErrorMessage>
        </FormControl>

        <FormControl isInvalid={errors.fechaSolicitud}>
          <FormLabel htmlFor="fechaSolicitud">Fecha de solicitud*:</FormLabel>
          <Input
            type="date"
            id="fechaSolicitud"
            width="500px"
            borderColor="#252526"
            {...register("fechaSolicitud", {
              required: "Este campo es requerido",
            })}
          />
          <FormErrorMessage>
            {errors.fechaSolicitud && errors.fechaSolicitud.message}
          </FormErrorMessage>
        </FormControl>
      </Flex>

      <FormControl isInvalid={errors.observaciones}>
        <FormLabel htmlFor="observaciones">Observaciones*:</FormLabel>
        <Textarea
          id="observaciones"
          height="100px"
          alignContent="flex-start"
          borderColor="#252526"
          {...register("observaciones", {
            required: "Este campo es requerido",
          })}
        />
        <FormErrorMessage>
          {errors.observaciones && errors.observaciones.message}
        </FormErrorMessage>
      </FormControl>

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
          icon={
            <IconContext.Provider value={{ size: "80px" }}>
              <FiFolderPlus />
            </IconContext.Provider>
          }
          onClick={() => inputRef.current && inputRef.current.click()}
          aria-label="Subir archivo"
          height="100px"
          width="1020px"
        />
        <FormErrorMessage>
          {errors.archivo && errors.archivo.message}
        </FormErrorMessage>
      </FormControl>
    </>
  );
};

export default function AgregarSolicitud() {
  const { activeStep, setActiveStep, goToNext, goToPrevious } = useSteps({
    initialStep: 0,
  });

  const methods = useForm();
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = methods;

  const onSubmit = (data) => {
    console.log(data);
  };

  return (
    <FormProvider {...methods}>
      <Flex
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
        <Stepper index={activeStep} orientation="horizontal">
          {steps.map((step, index) => (
            <Step key={index}>
              <StepIndicator>
                <StepStatus
                  complete={<StepIcon />}
                  incomplete={<StepNumber />}
                  active={<StepNumber />}
                />
              </StepIndicator>

              <Box flexShrink="0">
                <StepTitle>{step.title}</StepTitle>
                <StepDescription>{step.description}</StepDescription>
              </Box>

              <StepSeparator />
            </Step>
          ))}
        </Stepper>

        <Box>
          <form onSubmit={handleSubmit(onSubmit)}>
            {activeStep === 0 && (
              <DatosPersonales register={register} errors={errors} />
            )}
            {activeStep === 1 && (
              <Observaciones register={register} errors={errors} />
            )}

            <Flex mt={4}>
              {activeStep > 0 && (
                <Button mr={4} onClick={goToPrevious}>
                  Atrás
                </Button>
              )}
              {activeStep < steps.length - 1 ? (
                <Button onClick={goToNext}>Siguiente</Button>
              ) : (
                <Button type="submit">Registrar nueva solicitud</Button>
              )}
            </Flex>
          </form>
        </Box>
      </Flex>
    </FormProvider>
  );
}
