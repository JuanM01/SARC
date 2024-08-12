import React, { useState, useEffect } from "react";
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Text,
  Flex,
  useColorModeValue,
} from "@chakra-ui/react";
import { NavLink, useHistory } from "react-router-dom";
import DefaultAuth from "layouts/auth/Default";
import illustration from "assets/img/auth/auth2.png";


function ResetPassword() {
  const textColor = useColorModeValue("navy.700", "white");
  const textColorSecondary = "gray.400";
  const textColorBrand = useColorModeValue("brand.500", "white");
  const brandStars = useColorModeValue("brand.500", "brand.400");

  const [show, setShow] = useState(false);
  const handleClick = () => setShow(!show);

  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const history = useHistory();

  useEffect(() => {
    // Aquí puedes añadir lógica específica para el componente de restablecimiento de contraseña si es necesario
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Aquí puedes agregar la lógica para enviar el correo de restablecimiento
    console.log("Enviar correo de restablecimiento a:", email);

    // Redireccionar o mostrar mensaje de éxito
  };

  return (
    <DefaultAuth illustrationBackground={illustration} image={illustration}>
      <Flex
        maxW={{ base: "100%", md: "max-content" }}
        w="100%"
        mx={{ base: "auto", lg: "0px" }}
        me="auto"
        h="100%"
        alignItems="start"
        justifyContent="center"
        mb={{ base: "30px", md: "60px" }}
        px={{ base: "25px", md: "0px" }}
        mt={{ base: "40px", md: "14vh" }}
        flexDirection="column"
      >
        <Box me="auto">
          <Heading color={textColor} fontSize="36px" mb="10px" textAlign="left">
            ¿Olvidó su Contraseña?
          </Heading>
          <Text
          maxWidth='450px'
            mb="30px"
            color={textColorSecondary}
            textAlign="left"
            fontWeight="400"
            marginTop="10px"
            fontSize="md"
          >
            Ningún problema,
            simplemente háganos saber su dirección de correo electrónico y le enviaremos un enlace para restablecer su contraseña que le permitirá elegir una nueva.
          </Text>
        </Box>
        <Flex
          zIndex="2"
          direction="column"
          w={{ base: "100%", md: "420px" }}
          maxW="100%"
          background="transparent"
          borderRadius="15px"
          mx={{ base: "auto", lg: "unset" }}
          me="auto"
          mb={{ base: "20px", md: "auto" }}
        >
          <Flex align="center" mb="25px">
            <Box w="100%" >
              <FormLabel
                display="flex"
                ms="4px"
                fontSize="sm"
                fontWeight="500"
                color={textColor}
                mb="20px"
              >
                Correo Electrónico<Text color={brandStars}>*</Text>
              </FormLabel>
              <Input borderRadius='25px'
                type="email"
                id="email"
                placeholder="Ingrese su correo electrónico"
                size="lg"
                mb="20px"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              {error && (
                <Text color="red.500" mt={2} mb="24px">
                  {error}
                </Text>
              )}
              <Button borderRadius='25px'
                fontSize="md"
                variant="brand"
                fontWeight="700"
                w="100%"
                h="50px"
                mb="25px"
                type="submit"
                onClick={handleSubmit}
              >
                Enviar Correo
              </Button>
            </Box>
          </Flex>
        </Flex>
      </Flex>
    </DefaultAuth>
  );
}

export default ResetPassword;
