import React, { useState } from 'react';
import {
  Box,
  Text,
  FormControl,
  FormLabel,
  Input,
  Stack,
  Button,
  useToast,
} from '@chakra-ui/react';

import Card from 'components/card/Card';
import Upload from './components/Upload'; // Ajusta la ruta según la estructura de tu proyecto

const RegisterForm = () => {
  const toast = useToast();
  const [formData, setFormData] = useState({
    fullName: '',
    Nit: '',
    NameAdmin: '',
    DocumentAdmin: '',
    EmailAdmin: '',
    Logo: null,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileUpload = (base64String) => {
    setFormData({ ...formData, Logo: base64String });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:5000/api/users/companies', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (response.ok) {
        toast({
          title: 'Registro exitoso.',
          description: 'La empresa ha sido registrada correctamente.',
          status: 'success',
          duration: 5000,
          isClosable: true,
        });

        setFormData({
          fullName: '',
          Nit: '',
          NameAdmin: '',
          DocumentAdmin: '',
          EmailAdmin: '',
          Logo: null,
        });

      } else {
        toast({
          title: 'Error en el registro.',
          description: result.error,
          status: 'error',
          duration: 5000,
          isClosable: true,
        });
      }
    } catch (error) {
      console.error('Error al registrar el usuario:', error);
      toast({
        title: 'Error en el registro.',
        description: 'Ocurrió un error al registrar el usuario.',
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    }
  };

  return (
    <Box pt={{ base: '130px', md: '80px', xl: '80px' }}>
      <Card
        direction='column'
        w='100%'
        px='0px'
        overflowX={{ sm: "scroll", lg: "hidden" }}
      >
        <Stack spacing={3} px="25px" pb="25px">
          <Text
            color="secondaryGray.900"
            fontSize="22px"
            fontWeight="700"
            lineHeight="100%"
          >
            Registro de Empresa
          </Text>

          <form onSubmit={handleSubmit}>

            <FormControl id="fullName" isRequired>
              <FormLabel>Nombre</FormLabel>
              <Input
                type="text"
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                placeholder="Ingrese el nombre de la empresa"
                borderRadius="25px"
              />
            </FormControl>

            <FormControl id="Nit" isRequired>
              <FormLabel>NIT</FormLabel>
              <Input
                type="text"
                name="Nit"
                value={formData.Nit}
                onChange={handleChange}
                placeholder="Ingrese el NIT de la empresa"
                borderRadius="25px"
              />
            </FormControl>

            <FormControl id="NameAdmin" isRequired>
              <FormLabel>Administrador</FormLabel>
              <Input
                type="text"
                name="NameAdmin"
                value={formData.NameAdmin}
                onChange={handleChange}
                placeholder="Ingrese el nombre del Administrador de la empresa"
                borderRadius="25px"
              />
            </FormControl>

            <FormControl id="DocumentAdmin" isRequired>
              <FormLabel>Identificación Administrador</FormLabel>
              <Input
                type="text"
                name="DocumentAdmin"
                value={formData.DocumentAdmin}
                onChange={handleChange}
                placeholder="Ingrese el documento del Administrador de la empresa"
                borderRadius="25px"
              />
            </FormControl>

            <FormControl id="EmailAdmin" isRequired>
              <FormLabel>Correo Administrador</FormLabel>
              <Input
                type="email"
                name="EmailAdmin"
                value={formData.EmailAdmin}
                onChange={handleChange}
                placeholder="Ingrese el correo del Administrador de la empresa"
                borderRadius="25px"
              />
            </FormControl>

            <FormControl id="Logo" isRequired>
              <FormLabel>Logo</FormLabel>
              <Upload onFileUpload={handleFileUpload} />
            </FormControl>

            <Button type="submit" colorScheme="blue" size="lg">
              Registrar
            </Button>

          </form>
        </Stack>
      </Card>
    </Box>
  );
};

export default RegisterForm;
