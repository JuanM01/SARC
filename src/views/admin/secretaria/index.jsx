import React, { useState } from 'react';
import {
  Box,
  Button,
  Flex,
  FormControl,
  FormLabel,
  Input,
  Stack,
  Text,
  useColorModeValue,
  useToast,
} from '@chakra-ui/react';

// Custom components
import Card from 'components/card/Card';
// import Upload from "views/admin/empresa/components/Upload";
// import Dropzone from "views/admin/empresa/components/Dropzone";

const RegisterForm = () => {
  const toast = useToast();
  const [formData, setFormData] = useState({
    NombreSecretaria: '',
    JefeSecretaria: '',
    IdentificacionSecretaria: '',
    CorreoSecretaria: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:5000/api/users/secretaries', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      console.log(response);
      console.log(formData);

      const result = await response.json();
      console.log(result);


      if (response.ok) {
        console.log(result);
        toast({
          title: 'Registro exitoso.',
          description: 'La secretaria ha sido registrada correctamente.',
          status: 'success',
          duration: 5000,
          isClosable: true,
        });

        // Limpiar el formulario o hacer cualquier otra acción necesaria
        setFormData({
          NombreSecretaria: '',
          JefeSecretaria: '',
          IdentificacionSecretaria: '',
          CorreoSecretaria: ''
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

  const textColor = useColorModeValue('secondaryGray.900', 'white');

  return (
    <Box pt={{ base: '130px', md: '80px', xl: '80px' }}>
      <Card
        direction='column'
        w='100%'
        px='0px'
        overflowX={{ sm: "scroll", lg: "hidden" }}
      >
        <Flex px="25px" justify="space-between" mb="20px" align="center">
          <Text
            color={textColor}
            fontSize="22px"
            fontWeight="700"
            lineHeight="100%"
          >
            Registro de Secretaria
          </Text>
        </Flex>
        <form onSubmit={handleSubmit}>
          <Stack spacing={3} px="25px" pb="25px">

            <FormControl id="NombreSecretaria" isRequired>
              <FormLabel>Nombre Secretaria</FormLabel>
                <Input name="NombreSecretaria" onChange={handleChange} placeholder="Ingrese el Nombre de la secretaria" borderRadius="25px" />
              </FormControl>

            <FormControl id="JefeSecretaria" isRequired>
              <FormLabel>Jefe de Secretaria:</FormLabel>
                <Input name="JefeSecretaria" onChange={handleChange} placeholder="Ingrese el nombre del Jefe de la secretaria" borderRadius="25px" />
            </FormControl>

            <FormControl id="IdentificacionSecretaria" isRequired>
              <FormLabel>Identificacion de jefe deSecretaria:</FormLabel>
                <Input name="IdentificacionSecretaria" onChange={handleChange} placeholder="Ingrese la Identificacion del jefe de la secretaria" borderRadius="25px" />
            </FormControl>

            <FormControl id="CorreoSecretaria" isRequired>
              <FormLabel>Correo Secretaria:</FormLabel>
                <Input name="CorreoSecretaria" onChange={handleChange} placeholder="Ingrese el Correo de la secretaria" borderRadius="25px" />
            </FormControl>

            <Button type="submit" onChange={handleChange} colorScheme="blue" size="lg">
              Registrar
            </Button>
          </Stack>
        </form>
      </Card>
    </Box>
  );
};

export default RegisterForm;
