import React, { useState } from 'react';
import {
  Box,
  Button,
  Flex,
  FormControl,
  FormLabel,
  Input,
  Select,
  Stack,
  Text,
  useColorModeValue,
  useToast,
} from '@chakra-ui/react';

// Custom components
import Card from 'components/card/Card';

const RegisterForm = () => {
  const toast = useToast();
  const [formData, setFormData] = useState({
    fullName: '',
    p_apellido: '',
    s_apellido: '',
    email1: '',
    email2: '',
    birthDate: '',
    phone1: '',
    phone2: '',
    documentId: '',
    role: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
      const response = await fetch('http://localhost:5000/api/users/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      console.log(formData);
  
      const result = await response.json();
  
      if (response.ok) {
        console.log(result);
        toast({
          title: 'Registro exitoso.',
          description: 'El usuario ha sido registrado correctamente.',
          status: 'success',
          duration: 5000,
          isClosable: true,
        });
  
        // Limpiar el formulario o hacer cualquier otra acción necesaria
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
            Nuevo Empleado 
          </Text>
        </Flex>
        <form onSubmit={handleSubmit}>
          <Stack spacing={3} px="25px" pb="25px">
            <FormControl id="fullName" isRequired>
              <FormLabel>Nombre Completo</FormLabel>
              <Input borderRadius="25px"
                type="text"
                name="fullName"
                value={formData.fullName}
                placeholder="Ingrese su nombre completo"
                onChange={handleChange}
              />
            </FormControl>

            <FormControl id="p_apellido" isRequired>
              <FormLabel>Primer Apellido</FormLabel>
              <Input borderRadius="25px"
                type="text"
                name="p_apellido"
                value={formData.p_apellido}
                placeholder="Ingrese su primer apellido"
                onChange={handleChange}
              />
            </FormControl>

            <FormControl id="s_apellido" >
              <FormLabel>Segundo Apellido</FormLabel>
              <Input borderRadius="25px"
                type="text"
                name="s_apellido"
                value={formData.s_apellido} 
                placeholder="Ingrese su segundo apellido"
                onChange={handleChange}
              />
            </FormControl>

            <FormControl id="email1" isRequired>
              <FormLabel>Correo Principal</FormLabel>
              <Input borderRadius="25px"
                type="email"
                name="email1"
                value={formData.email1}
                placeholder="Ingrese el correo que más use"
                onChange={handleChange}
              />
            </FormControl>

            <FormControl id="email2">
              <FormLabel>Correo Secundario</FormLabel>
              <Input borderRadius="25px"
                type="email"
                name="email2"
                value={formData.email2}
                placeholder="Ingrese un correo alternativo o de recuperación"
                onChange={handleChange}
              />
            </FormControl>

            <FormControl id="birthDate">
              <FormLabel>Fecha de Nacimiento</FormLabel>
              <Input borderRadius="25px"
                type="date"
                name="birthDate"
                value={formData.birthDate}
                onChange={handleChange}
              />
            </FormControl>

            <FormControl id="phone1" isRequired>
              <FormLabel>Teléfono Principal</FormLabel>
              <Input borderRadius="25px"
                type="tel"
                name="phone1"
                value={formData.phone1}
                placeholder="Ingrese su número de teléfono"
                onChange={handleChange}
              />
            </FormControl>

            <FormControl id="phone2">
              <FormLabel>Teléfono Secundario</FormLabel>
              <Input borderRadius="25px"
                type="tel"
                name="phone2"
                value={formData.phone2}
                placeholder="Ingrese su número secundario"
                onChange={handleChange}
              />
            </FormControl>

            <FormControl id="documentId" isRequired>
              <FormLabel>Documento de Identidad</FormLabel>
              <Input borderRadius="25px"
                type="text"
                name="documentId"
                value={formData.documentId}
                placeholder="Ingrese su cédula"
                onChange={handleChange}
              />
            </FormControl>

            <FormControl id="role" isRequired>
              <FormLabel>Rol</FormLabel>
              <Select borderRadius="25px"
                name="role"
                value={formData.role}
                onChange={handleChange}
              >
                <option value="contratista">Contratista</option>
                <option value="supervisor">Supervisor</option>
                <option value="abogado">Abogado</option>
                <option value="secretaria">Jefe de Secretaria</option>
                <option value="secretaria_general">Jefe de Secretaria General</option>
                <option value="oficina">Jefe de Oficina</option>
              </Select>
            </FormControl>

            <Button type="submit" colorScheme="blue" size="lg" borderRadius="25px">
              Registrar
            </Button>
          </Stack>
        </form>
      </Card>
    </Box>
  );
  
};

export default RegisterForm;
