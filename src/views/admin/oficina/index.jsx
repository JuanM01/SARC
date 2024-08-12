import React, { useState, useEffect } from 'react';
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
  Select
} from '@chakra-ui/react';

// Custom components
import Card from 'components/card/Card';

const RegisterForm = () => {
  const toast = useToast();
  const [formData, setFormData] = useState({
    fullName: '',
    jefe: '',
    correoJefe: '',
    documentoJefe: '',
    secretaria: '',
  });
  const [secretarias, setSecretarias] = useState([]);

  useEffect(() => {
    fetchSecretarias();
  }, []);

  const fetchSecretarias = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/users/secretaries'); // Endpoint en tu backend
      if (response.ok) {
        const data = await response.json();
        setSecretarias(data);
      } else {
        throw new Error('Error al obtener las secretarias');
      }
    } catch (error) {
      console.error('Error al obtener las secretarias:', error);
      toast({
        title: 'Error al obtener las secretarias.',
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:5000/api/users/offices', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const data = await response.json();
        toast({
          title: 'Registro exitoso.',
          description: 'La oficina ha sido registrada correctamente.',
          status: 'success',
          duration: 5000,
          isClosable: true,
        });
        setFormData({
          fullName: '',
          jefe: '',
          correoJefe: '',
          documentoJefe: '',
          secretaria: '',
        });
      } else {
        throw new Error('Error al registrar la oficina');
      }
    } catch (error) {
      console.error('Error al registrar la oficina:', error);
      toast({
        title: 'Error al registrar la oficina.',
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
            Registro de Oficina
          </Text>
        </Flex>
        <form onSubmit={handleSubmit}>
          <Stack spacing={3} px="25px" pb="25px">

            <FormControl id="fullName" isRequired>
              <FormLabel>Nombre Oficina</FormLabel>
              <Input
                type="text"
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                placeholder="Ingrese el nombre de la oficina"
                borderRadius="25px"
              />
            </FormControl>

            <FormControl id="jefe" isRequired>
              <FormLabel>Jefe de Oficina</FormLabel>
              <Input
                type="text"
                name="jefe"
                value={formData.jefe}
                onChange={handleChange}
                placeholder="Ingrese el nombre del jefe de la oficina"
                borderRadius="25px"
              />
            </FormControl>

            <FormControl id="correoJefe" isRequired>
              <FormLabel>Correo del Jefe de Oficina</FormLabel>
              <Input
                type="email"
                name="correoJefe"
                value={formData.correoJefe}
                onChange={handleChange}
                placeholder="Ingrese el correo del jefe de la oficina"
                borderRadius="25px"
              />
            </FormControl>

            <FormControl id="documentoJefe" isRequired>
              <FormLabel>Documento del Jefe de Oficina</FormLabel>
              <Input
                type="text"
                name="documentoJefe"
                value={formData.documentoJefe}
                onChange={handleChange}
                placeholder="Ingrese el documento del jefe de la oficina"
                borderRadius="25px"
              />
            </FormControl>

            <FormControl id="secretaria" isRequired>
              <FormLabel>Pertenece a:</FormLabel>
              <Select
                name="secretaria"
                value={formData.secretaria}
                onChange={handleChange}
                placeholder="Seleccione la secretaria a la que pertenece"
                borderRadius="25px"
              >
                <option value="Secretaria General">Secretaria General</option>
                {secretarias.map((sec) => (
                  <option key={sec.id} value={sec.name}>
                    {sec.name}
                  </option>
                ))}
              </Select>
            </FormControl>

            <Button type="submit" colorScheme="blue" size="lg">
              Registrar
            </Button>
          </Stack>
        </form>
      </Card>
    </Box>
  );
};

export default RegisterForm;
