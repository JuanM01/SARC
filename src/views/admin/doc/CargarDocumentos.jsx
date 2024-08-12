// views/admin/doc/CargarDocumentos.jsx
import React, { useState } from 'react';
import { Box, Button, Input, Stack, Text, useToast } from '@chakra-ui/react';

const CargarDocumentos = () => {
  const [file, setFile] = useState(null);
  const toast = useToast();

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleUpload = async () => {
    if (file) {
      const formData = new FormData();
      formData.append('file', file);

      try {
        const response = await fetch('http://localhost:5000/api/files/upload', {
          method: 'POST',
          body: formData,
        });
        const data = await response.json();
        toast({
          title: 'Archivo subido.',
          description: data.message,
          status: 'success',
          duration: 5000,
          isClosable: true,
        });
      } catch (error) {
        console.error('Error subiendo el archivo:', error);
        toast({
          title: 'Error subiendo el archivo.',
          description: 'Ocurrió un error al subir el archivo.',
          status: 'error',
          duration: 5000,
          isClosable: true,
        });
      }
    } else {
      toast({
        title: 'Seleccione un archivo.',
        description: 'Por favor, seleccione un archivo primero.',
        status: 'warning',
        duration: 5000,
        isClosable: true,
      });
    }
  };

  return (
    <Box p={4}>
      <Text fontSize="2xl" mb={4}>Cargar Documentos</Text>
      <Stack spacing={3}>
        <Input type="file" onChange={handleFileChange} />
        <Button colorScheme="blue" onClick={handleUpload}>Subir Documento</Button>
      </Stack>
      {file && (
        <Box mt={4}>
          <Text>Archivo seleccionado: {file.name}</Text>
        </Box>
      )}
    </Box>
  );
};

export default CargarDocumentos;
