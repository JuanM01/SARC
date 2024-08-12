// Chakra imports
import { SimpleGrid, Text, useColorModeValue } from "@chakra-ui/react";
// Custom components
import Card from "components/card/Card.js";
import React from "react";
import Information from "views/admin/profile/components/Information";

// Assets
export default function GeneralInformation(props) {
  const { ...rest } = props;
  // Chakra Color Mode
  const textColorPrimary = useColorModeValue("secondaryGray.900", "white");
  const textColorSecondary = "gray.400";
  const cardShadow = useColorModeValue(
    "0px 18px 40px rgba(112, 144, 176, 0.12)",
    "unset"
  );
  return (
    <Card mb={{ base: "0px", "2xl": "20px" }} {...rest}>
      <Text
        color={textColorPrimary}
        fontWeight='bold'
        fontSize='2xl'
        mt='10px'
        mb='4px'>
        Información General
      </Text>
      <Text color={textColorSecondary} fontSize='md' me='26px' mb='40px'>
      Juan Mendoza, un joven contratista especializado en desarrollo backend, apasionado por la creación de soluciones robustas y eficientes. Con experiencia en implementación de API REST y bases de datos SQL, Juan se destaca por su habilidad para resolver problemas complejos y su enfoque innovador en el diseño de sistemas escalables.
      </Text>
      <SimpleGrid columns='2' gap='20px'>
        <Information
          boxShadow={cardShadow}
          title='Educación'
          value='Universidad Popular del Cesar'
        />
        <Information
          boxShadow={cardShadow}
          title='Idionas'
          value='Español, Inglés'
        />
        <Information
          boxShadow={cardShadow}
          title='Departamento'
          value='Desarrollo Backend'
        />
        <Information
          boxShadow={cardShadow}
          title='Experiencia laboral'
          value='Google, Facebook'
        />
        <Information
          boxShadow={cardShadow}
          title='Organización'
          value='SARCC'
        />
        <Information
          boxShadow={cardShadow}
          title='Cumpleaños'
          value='01 Julio 2003'
        />
      </SimpleGrid>
    </Card>
  );
}
