import React, { useEffect, useState } from 'react';
import {
  
  Box,
  Heading,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  VStack,
  useColorModeValue
} from "@chakra-ui/react";
import axios from 'axios';
import Card from 'components/card/Card';
const Contratosconsul = () => {
  const [data, setData] = useState({
    registrosPresupuestales: [],
    polizas: [],
    impuestos: [],
    interventorias: [],
    formaPago: [],
    obligaciones: [],
    proyectos: [],
    certificados: [],
    rubros: [],
    gestionContratos: [],
    detallesGestionContratos: []
  });

  const fetchData = async () => {
    try {
      const response = await axios.get('/api/contratos'); // Endpoints de ejemplo, ajuste según su backend
      setData(response.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const borderColor = useColorModeValue('gray.200', 'gray.700');

  const renderTable = (title, columns, data) => (
 
    <VStack
      spacing={4}
      p={4}
      border="1px"
      borderColor={borderColor}
      borderRadius="25px"
      boxShadow="md"
      width="100%"
    >
      <Heading as="h2" size="md">{title}</Heading>
      <Table variant="striped" colorScheme="blue" size="sm">
        <Thead>
          <Tr>
            {columns.map((col) => (
              <Th key={col}>{col}</Th>
            ))}
          </Tr>
        </Thead>
        <Tbody>
          {data.map((row, index) => (
            <Tr key={index}>
              {columns.map((col) => (
                <Td key={col}>{row[col]}</Td>
              ))}
            </Tr>
          ))}
        </Tbody>
      </Table>
    </VStack>
  );

  return (
    <Card
    direction='column'
    w='100%'
    px='0px'
    overflowX={{ sm: "scroll", lg: "hidden" }}
  >
    <Box className="demoarea" p={4}>
      <Heading as="h1" size="lg" mb={6} textAlign="center" color="teal.600">Consulta de Contratos</Heading>
      <VStack spacing={6}>
        {renderTable('1. REGISTRO PRESUPUESTAL', ['Nro_RP', 'Fec_Rp', 'Val_RP', 'Doc_Sop'], data.registrosPresupuestales)}
        {renderTable('2. POLIZAS DE GARANTIA', ['Cod_Pol', 'Nom_Pol', 'Nro_pol', 'Nom_Ase', 'Fec_Pol', 'Val_Pol', 'Tip_Pol'], data.polizas)}
        {renderTable('3. IMPUESTOS', ['Nro_Imp', 'Nom_Imp', 'Valor', 'Vigencia', 'Nro_Com', 'Cod_Sop'], data.impuestos)}
        {renderTable('4. INTERVENTORIA/SUPERVISIÓN', ['Ide_Int', 'Nom_Ter', 'NTip_Int', 'Obs_Int'], data.interventorias)}
        {renderTable('5. FORMA DE PAGO', ['Nom_Pago', 'Fecha_Pago', 'Valor_Pago', 'Porcentaje', 'Condicion_Pago'], data.formaPago)}
        {renderTable('6. OBLIGACIONES', ['Des_Oblig'], data.obligaciones)}
        {renderTable('7. PROYECTOS', ['Proyecto', 'Nombre_Proyecto'], data.proyectos)}
        {renderTable('8. CERTIFICADOS DE DISPONIBILIDAD', ['Nro_CDP', 'Fec_CDP', 'Val_CDP'], data.certificados)}
        {renderTable('9. RUBROS', ['Cod_Rub', 'Nom_Rub'], data.rubros)}
        {renderTable('10. DOCUMENTOS DEL CONTRATO', ['Documento'], data.gestionContratos)} {/* Ajuste de columnas según datos disponibles */}
        {renderTable('11. GESTION DEL CONTRATO', ['ESTADO_FINAL', 'Nro_Doc', 'FECHA', 'USUARIO', 'VALOR_PAGO'], data.gestionContratos)}
      </VStack>
    </Box>
    </Card>
  );
};

export default Contratosconsul;
