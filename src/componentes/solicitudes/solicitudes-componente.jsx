import React, { useState, useEffect } from 'react';
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableCaption,
  TableContainer,
  Button,
  Box,
  Stack,
  Heading,
  Input,
  IconButton,
  useToast,
  Grid,
  GridItem,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Flex,
} from '@chakra-ui/react';
import { AddIcon, SearchIcon, ChevronDownIcon } from '@chakra-ui/icons';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

const Solicitudes = () => {
  const [solicitudes, setSolicitudes] = useState([]);
  const [apoyos, setApoyos] = useState([]);
  const [curpCounts, setCurpCounts] = useState({});
  const token = localStorage.getItem('token_acceso');
  const toast = useToast();
  const navigate = useNavigate();

  useEffect(() => {
    const obtenerSolicitudes = async () => {
      try {
        const response = await axios.get(import.meta.env.VITE_APP_API_URL_OBTENER_TODAS_SOLICITUDES, {
          headers: {
            'token_acceso': token
          }
        });

        if (response.data.code === 500) {
          toast({
            title: "Error",
            description: "El sistema no está disponible, inténtalo más tarde",
            status: "error",
            duration: 3000,
            isClosable: true,
          });
        } else {
          const solicitudesData = response.data.data;
          setSolicitudes(solicitudesData);
          calcularCurpCounts(solicitudesData);
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
        const response = await axios.get(import.meta.env.VITE_APP_API_URL_OBTENER_TODOS_APOYOS, {
          headers: {
            'token_acceso': token
          }
        });

        if (response.data.code === 500) {
          toast({
            title: "Error",
            description: "El sistema no está disponible, inténtalo más tarde",
            status: "error",
            duration: 3000,
            isClosable: true,
          });
        } else {
          setApoyos(response.data.data);
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

    obtenerSolicitudes();
    obtenerApoyos();
  }, [token, toast]);

  const calcularCurpCounts = (solicitudes) => {
    const counts = {};
    solicitudes.forEach(solicitud => {
      counts[solicitud.curp] = (counts[solicitud.curp] || 0) + 1;
    });
    setCurpCounts(counts);
  };

  const handleRowClick = (solicitud) => {
    navigate('/solicitudes/gestionar-solicitud', { state: { solicitud } });
  };

  const obtenerNombreApoyo = (idApoyo) => {
    const apoyo = apoyos.find(apoyo => apoyo._id === idApoyo);
    return apoyo ? apoyo.nombre : 'Desconocido';
  };

  return (
    <Grid
      w="100%"
      h="90vh"
      border="1px"
      borderColor="#252526"
      borderRadius="10"
      templateRows="auto 1fr"
      p="4"
    >
      <GridItem>
        <Flex justify="space-between" align="center" mb="4">
          <Input placeholder="Buscar..." w="30%" borderColor="#252526" />

          <Menu>
            <MenuButton
              backgroundColor="#0F1422"
              color="white"
              as={Button}
              rightIcon={<ChevronDownIcon />}
            >
              Filtrar
            </MenuButton>
            <MenuList>
              <MenuItem>Opción 1</MenuItem>
              <MenuItem>Opción 2</MenuItem>
              <MenuItem>Opción 3</MenuItem>
            </MenuList>
          </Menu>

          <Link to="/solicitudes/agregar-solicitud">
            <Button color="white" bgColor="#0F1422">
              Agregar nueva solicitud
            </Button>
          </Link>
        </Flex>
      </GridItem>

      <GridItem overflow="auto">
        <TableContainer>
          <Table variant="simple">
            <TableCaption>Lista de Solicitudes</TableCaption>
            <Thead>
              <Tr>
                <Th>Estado</Th>
                <Th>Nombre</Th>
                <Th>Sexo</Th>
                <Th>Apoyo solicitado</Th>
                <Th>Cantidad de apoyos solicitados</Th>
              </Tr>
            </Thead>
            <Tbody>
              {solicitudes.map((solicitud) => (
                <Tr key={solicitud._id} onClick={() => handleRowClick(solicitud)}>
                  <Td>{solicitud.estado}</Td>
                  <Td>{solicitud.nombre + " " + solicitud.apellido_paterno + " " + solicitud.apellido_materno}</Td>
                  <Td>{solicitud.sexo}</Td>
                  <Td>{obtenerNombreApoyo(solicitud.apoyo_solicitado)}</Td>
                  <Td>{curpCounts[solicitud.curp]}</Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        </TableContainer>
      </GridItem>
    </Grid>
  );
};

export default Solicitudes;
