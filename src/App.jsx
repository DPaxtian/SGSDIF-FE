import { useState } from 'react'
import { Button, Flex, Box, Container, Image, Avatar, Text } from "@chakra-ui/react";


function App() {


  return (
    <>
      <Flex height="100vh">
        <Box flex="0 0 12%" display='flex' flexDirection='column' alignItems='center' backgroundImage="../src/assets/img/nav_background.png" backgroundSize='250px' backgroundPosition="left bottom" backgroundRepeat='no-repeat'>
          <Image src='/src/assets/img/dif_logo.png' h='50px' alt='DIF Xalapa' marginY='50px' />
          <Avatar name='Dan Abrahmov' src='https://bit.ly/dan-abramov' size='2xl' marginBottom='10px' />
          <Text fontSize='lg' color='#310E3A'>Nombre Usuario</Text>
          <Text fontSize='sm' color='#310E3A' marginBottom='100px'>Buen dia!</Text>

          <Box alignItems='left'>
            <Text marginY='10px'>Dashboard</Text>
            <Text marginY='10px'>Solicitudes</Text>
            <Text marginY='10px'>Inventario</Text>
            <Text marginY='10px'>Reportes</Text>
            <Text marginY='10px'>Configuraciones</Text>
            <Text marginY='10px'>Cerrar sesion</Text>
          </Box>
        </Box>

        <Box flex="1">
          Segunda columna
        </Box>
      </Flex>
    </>
  )
}

export default App
