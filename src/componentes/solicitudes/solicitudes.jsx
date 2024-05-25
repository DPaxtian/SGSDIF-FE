import {
  Grid,
  GridItem,
  Input,
  Button,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Flex,
} from "@chakra-ui/react";
import { ChevronDownIcon } from "@chakra-ui/icons";
import { Link } from "react-router-dom";

export default function Solicitudes() {
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
          <Input placeholder="Buscar..." w="30%" />

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

      <GridItem>
        {/* Aquí puedes agregar el contenido de la segunda fila */}
      </GridItem>
    </Grid>
  );
}
