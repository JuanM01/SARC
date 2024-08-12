import React, { useState } from 'react';
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  Select,
  Stack,
} from '@chakra-ui/react';
import { useToast } from '@chakra-ui/react';

const RegisterForm = () => {
  const toast = useToast();
  const [formData, setFormData] = useState({
    fullName: '',
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

  const handleSubmit = (e) => {
    e.preventDefault();
    // Aquí va la lógica para enviar los datos al backend
    console.log(formData);

    toast({
      title: 'Registro exitoso.',
      description: 'El usuario ha sido registrado correctamente.',
      status: 'success',
      duration: 5000,
      isClosable: true,
    });
  };

  return (
    <Box p={5} shadow="md" borderWidth="1px" borderRadius="md">
      <form onSubmit={handleSubmit}>
        <Stack spacing={3}>
          <FormControl id="fullName" isRequired>
            <FormLabel>Nombre Completo</FormLabel>
            <Input
              type="text"
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
            />
          </FormControl>

          <FormControl id="email1" isRequired>
            <FormLabel>Correo Principal</FormLabel>
            <Input
              type="email"
              name="email1"
              value={formData.email1}
              onChange={handleChange}
            />
          </FormControl>

          <FormControl id="email2">
            <FormLabel>Correo Secundario</FormLabel>
            <Input
              type="email"
              name="email2"
              value={formData.email2}
              onChange={handleChange}
            />
          </FormControl>

          <FormControl id="birthDate">
            <FormLabel>Fecha de Nacimiento</FormLabel>
            <Input
              type="date"
              name="birthDate"
              value={formData.birthDate}
              onChange={handleChange}
            />
          </FormControl>

          <FormControl id="phone1" isRequired>
            <FormLabel>Teléfono Principal</FormLabel>
            <Input
              type="tel"
              name="phone1"
              value={formData.phone1}
              onChange={handleChange}
            />
          </FormControl>

          <FormControl id="phone2">
            <FormLabel>Teléfono Secundario</FormLabel>
            <Input
              type="tel"
              name="phone2"
              value={formData.phone2}
              onChange={handleChange}
            />
          </FormControl>

          <FormControl id="documentId" isRequired>
            <FormLabel>Documento de Identidad</FormLabel>
            <Input
              type="text"
              name="documentId"
              value={formData.documentId}
              onChange={handleChange}
            />
          </FormControl>

          <FormControl id="role" isRequired>
            <FormLabel>Rol</FormLabel>
            <Select
              name="role"
              value={formData.role}
              onChange={handleChange}
            >
              <option value="contratista">Contratista</option>
              <option value="supervisor">Supervisor</option>
              <option value="abogado">Abogado</option>
              <option value="secretaria">Secretaria</option>
              <option value="oficina">Oficina</option>
              <option value="secretaria_general">Secretaria General</option>
              <option value="administrador">Administrador</option>
              <option value="desarrollador">Desarrollador</option>
            </Select>
          </FormControl>

          <Button type="submit" colorScheme="teal" size="lg">
            Registrar
          </Button>
        </Stack>
      </form>
    </Box>
  );
};

export default RegisterForm;
