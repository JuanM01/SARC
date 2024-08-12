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
import Upload from "views/admin/empresa/components/Upload";
import Dropzone from "views/admin/empresa/components/Dropzone";

const RegisterForm = () => {
  const toast = useToast();
  const [formData, setFormData] = useState({
    fullName: '',
    Nit: '',
    Logo: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);

    toast({
      title: 'Registro exitoso.',
      description: 'La empresa ha sido registrada correctamente.',
      status: 'success',
      duration: 5000,
      isClosable: true,
    });
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
            Registro de Empresa
          </Text>
        </Flex>
        <form onSubmit={handleSubmit}>
          <Stack spacing={3} px="25px" pb="25px">

            <FormControl id="fullName" isRequired>
             <FormLabel>Nombre</FormLabel>
               <Input placeholder="Ingrese el nombre de la empresa" borderRadius="25px" />
              </FormControl>

<FormControl id="Nit" isRequired>
  <FormLabel>NIT</FormLabel>
  <Input placeholder="Ingrese el NIT de la empresa" borderRadius="25px" />
</FormControl>
            <Card
                direction='column'
                w='100%'
                px='0px'
                overflowX={{ sm: "scroll", lg: "hidden" }}
              >
            <FormControl id="Logo" isRequired>
              <FormLabel>Logo</FormLabel>
                <Upload
                  
                />
             
            </FormControl>
            </Card>
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
