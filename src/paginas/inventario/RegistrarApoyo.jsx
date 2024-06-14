import React, { useState } from 'react';
import { Box, Button, FormControl, FormLabel, Input, Select, useToast } from '@chakra-ui/react';
import axios from 'axios';

const RegistrarApoyo = () => {
    const [formData, setFormData] = useState({
        fecha: '',
        tipoApoyo: '',
        cantidad: '',
        ubicacion: '',
        otroTipoApoyo: '',
    });
    const toast = useToast();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('AQUI_PONES_EL_API_MARLON', formData);
            toast({
                title: 'Registro exitoso',
                description: 'El apoyo ha sido registrado correctamente',
                status: 'success',
                duration: 3000,
                isClosable: true,
            });
        } catch (error) {
            toast({
                title: 'Error',
                description: 'Hubo un error al registrar el apoyo',
                status: 'error',
                duration: 3000,
                isClosable: true,
            });
        }
    };

    return (
        <Box p={4} height="100%" border="1px" borderColor="#252526" borderRadius="10">
            <form onSubmit={handleSubmit}>
                <FormControl id="fecha" mb={4}>
                    <FormLabel>Fecha</FormLabel>
                    <Input type="date" name="fecha" value={formData.fecha} onChange={handleChange} required />
                </FormControl>
                <FormControl id="tipoApoyo" mb={4}>
                    <FormLabel>Tipo de Apoyo</FormLabel>
                    <Select name="tipoApoyo" value={formData.tipoApoyo} onChange={handleChange} required>
                        <option value="">Seleccione el tipo de apoyo</option>
                        <option value="Laminas">Láminas de plástico</option>
                        <option value="Computadoras">Computadoras</option>
                        <option value="Alimentos">Alimentos</option>
                        <option value="Otro">Otro</option>
                    </Select>
                </FormControl>
                {formData.tipoApoyo === 'Otro' && (
                    <FormControl id="otroTipoApoyo" mb={4}>
                        <FormLabel>Especificar Tipo de Apoyo</FormLabel>
                        <Input type="text" name="otroTipoApoyo" value={formData.otroTipoApoyo} onChange={handleChange} required />
                    </FormControl>
                )}
                <FormControl id="cantidad" mb={4}>
                    <FormLabel>Cantidad</FormLabel>
                    <Input type="number" name="cantidad" value={formData.cantidad} onChange={handleChange} required />
                </FormControl>
                <FormControl id="ubicacion" mb={4}>
                    <FormLabel>Ubicación</FormLabel>
                    <Input type="text" name="ubicacion" value={formData.ubicacion} onChange={handleChange} required />
                </FormControl>
                <Button type="submit" colorScheme="teal" mt={4}>
                    Registrar Apoyo
                </Button>
            </form>
        </Box>
    );
};

export default RegistrarApoyo;