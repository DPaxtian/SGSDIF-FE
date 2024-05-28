import React from 'react';
import { Button, Flex, Icon, Text } from '@chakra-ui/react';
import { FaPlusSquare, FaClipboardList } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const Menu = ({ setView }) => (
    <Flex
        height="100vh"
        width="100vw"
        justifyContent="center"
        alignItems="center"
    >
        <Link to="/inventario/agregar-apoyo">
            <Button
                onClick={() => setView('agregar')}
                leftIcon={<Icon as={FaPlusSquare} w={8} h={8} />}
                m={2}
                colorScheme="blue"
                variant="outline"
                size="lg"
                p={10}
                height="150px"
                width="200px"
                display="flex"
                flexDirection="column"
                alignItems="center"
            >
                <Text mt={4}>Agregar existencias</Text>
            </Button>
        </Link>

        <Link to="">
            <Button
                onClick={() => setView('ver')}
                leftIcon={<Icon as={FaClipboardList} w={8} h={8} />}
                m={2}
                colorScheme="blue"
                variant="outline"
                size="lg"
                p={10}
                height="150px"
                width="200px"
                display="flex"
                flexDirection="column"
                alignItems="center"
            >
                <Text mt={4}>Ver inventario</Text>
            </Button>
        </Link>

    </Flex>
);

export default Menu;
