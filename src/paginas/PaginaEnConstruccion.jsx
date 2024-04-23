import React from 'react';
import { Box, Heading, Text, Flex, Center } from '@chakra-ui/react';

const ConstructionPage = () => {
  return (
    <Center height="100vh" flexDirection="column" bg="gray.100" p={10}>
      <Box p={5} shadow="md" borderWidth="1px" bg="white">
        <Heading fontSize="4xl" mb={4} textAlign="center">
          PÁGINA EN CONSTRUCCIÓN
        </Heading>
        <Text fontSize="2xl" mb={4} textAlign="center">
          Lo sentimos :(
        </Text>
      </Box>
    </Center>
  );
};

export default ConstructionPage;
