import React, { useState, useEffect } from 'react';
import {
  
  Box,
  Text,
  Button,
  FormControl,
  FormLabel,
  Input,
  Select,
  Textarea,
  VStack,
  Checkbox,
  SimpleGrid,
  IconButton,
  HStack,
  useToast
} from '@chakra-ui/react';
import { AddIcon, DeleteIcon } from '@chakra-ui/icons';
import Card from 'components/card/Card';
const FormPlanCompra = () => {
  const [formData, setFormData] = useState({
    codigoUNSPSC: '',
    descripcion: '',
    fechaInicio: '',
    fechaPresentacion: '',
    duracionContrato: '',
    intervaloContrato: '',
    modalidadSeleccion: '',
    fuenteRecursos: '',
    valorTotalEstimado: '',
    valorEstimadoVigenciaActual: '',
    requierenVigenciasFuturas: false,
    estadoSolicitudVigenciasFuturas: '',
    unidadContratacion: '',
    ubicacion: '',
    nombreResponsable: '',
    telefonoResponsable: '',
    correoResponsable: '',
    cumplirLey2046: false,
    incluyeSuministroBienes: false,
    oficinaSolicitante: '',
    tareas: []
  });

  const [oficinas, setOficinas] = useState([]);
  const [tarea, setTarea] = useState('');
  const toast = useToast();

  useEffect(() => {
    fetchOficinas();
  }, []);

  const fetchOficinas = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/users/Offices');
      if (response.ok) {
        const data = await response.json();
        setOficinas(data);
      } else {
        throw new Error('Error al obtener las oficinas');
      }
    } catch (error) {
      console.error('Error al obtener las oficinas:', error);
      toast({
        title: 'Error al obtener las oficinas.',
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    }
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  const handleTareaChange = (e) => {
    setTarea(e.target.value);
  };

  const addTarea = () => {
    setFormData({
      ...formData,
      tareas: [...formData.tareas, tarea]
    });
    setTarea('');
  };

  const removeTarea = (index) => {
    const newTareas = formData.tareas.filter((_, i) => i !== index);
    setFormData({
      ...formData,
      tareas: newTareas
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:5000/api/users/purchase-plan', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const data = await response.json();
        toast({
          title: 'Formulario enviado con éxito.',
          description: `ID de la solicitud: ${data.id}`,
          status: 'success',
          duration: 5000,
          isClosable: true,
        });
        setFormData({
          codigoUNSPSC: '',
          descripcion: '',
          fechaInicio: '',
          fechaPresentacion: '',
          duracionContrato: '',
          intervaloContrato: '',
          modalidadSeleccion: '',
          fuenteRecursos: '',
          valorTotalEstimado: '',
          valorEstimadoVigenciaActual: '',
          requierenVigenciasFuturas: false,
          estadoSolicitudVigenciasFuturas: '',
          unidadContratacion: '',
          ubicacion: '',
          nombreResponsable: '',
          telefonoResponsable: '',
          correoResponsable: '',
          cumplirLey2046: false,
          incluyeSuministroBienes: false,
          oficinaSolicitante: '',
          tareas: []
        });
      } else {
        throw new Error('Error al enviar el formulario');
      }
    } catch (error) {
      console.error('Error al enviar el formulario:', error);
      toast({
        title: 'Error al enviar el formulario.',
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
         <Text
            color="secondaryGray.900"
            fontSize="22px"
            fontWeight="700"
            lineHeight="100%"
             px="25px" pb="25px"
          >
           Nuevo Plan De Compra
          </Text>
      <form onSubmit={handleSubmit}>
        <VStack spacing={4}  px="25px" pb="25px" >
       
        <FormControl id="codigoUNSPSC">
            <FormLabel>Código UNSPSC</FormLabel>
            <Input name="codigoUNSPSC" placeholder="Cada codigo separado por;" borderRadius="25px" value={formData.codigoUNSPSC} onChange={handleChange} />
          </FormControl>

          <FormControl id="descripcion">
            <FormLabel>Descripción</FormLabel>
            <Textarea name="descripcion" placeholder="Describa lo más específico los requerimientos necesitados." borderRadius="25px" value={formData.descripcion} onChange={handleChange} />
          </FormControl>

          <FormControl id="fechaInicio">
            <FormLabel>Fecha estimada de inicio de proceso de selección (mes)</FormLabel>
            <Input type="date" name="fechaInicio" borderRadius="25px" value={formData.fechaInicio} onChange={handleChange} />
          </FormControl>

          <FormControl id="fechaPresentacion">
            <FormLabel>Fecha de presentación del proyecto (mes)</FormLabel>
            <Input type="date" name="fechaPresentacion" borderRadius="25px" value={formData.fechaPresentacion} onChange={handleChange} />
          </FormControl>

          <FormControl id="duracionContrato">
            <FormLabel>Duración estimada del contrato (dias)</FormLabel>
            <Input name="duracionContrato" placeholder="Ingrese los dias de duración del contrato." borderRadius="25px" value={formData.duracionContrato} onChange={handleChange} />
          </FormControl>

         

          <FormControl id="modalidadSeleccion">
            <FormLabel>Modalidad de selección</FormLabel>
            <Select name="modalidadSeleccion"  borderRadius="25px" value={formData.modalidadSeleccion} onChange={handleChange}>
              <option value="licitacion">Licitación</option>
              <option value="concursoMeritos">Concurso de méritos</option>
              <option value="contratacionDirecta">Contratación directa</option>
              <option value="Minima_cuantia">Minima Cuantía</option>
            </Select>
          </FormControl>

          <FormControl id="fuenteRecursos">
            <FormLabel>Fuente de recursos</FormLabel>
            <Input name="fuenteRecursos" placeholder='Ej. Recursos Propios.' borderRadius="25px" value={formData.fuenteRecursos} onChange={handleChange} />
          </FormControl>

          <FormControl id="valorTotalEstimado">
            <FormLabel>Valor total estimado</FormLabel>
            <Input name="valorTotalEstimado" placeholder='Ingrese el valor estimado' borderRadius="25px" value={formData.valorTotalEstimado} onChange={handleChange} />
          </FormControl>

          <FormControl id="valorEstimadoVigenciaActual">
            <FormLabel>Valor estimado de la vigencia actual</FormLabel>
            <Input name="valorEstimadoVigenciaActual"placeholder='Ingrese el valor estimado actual' borderRadius="25px" value={formData.valorEstimadoVigenciaActual} onChange={handleChange} />
          </FormControl>

          <FormControl id="requierenVigenciasFuturas">
            <FormLabel>¿Requieren vigencias futuras?</FormLabel>
            <Checkbox name="requierenVigenciasFuturas" isChecked={formData.requierenVigenciasFuturas} onChange={handleChange} />
          </FormControl>

          <FormControl id="estadoSolicitudVigenciasFuturas">
            <FormLabel>Estado de solicitud de vigencias futuras</FormLabel>
            <Select name="estadoSolicitudVigenciasFuturas"  borderRadius="25px" value={formData.estadoSolicitudVigenciasFuturas} onChange={handleChange}>
              <option value="enProceso">En proceso</option>
              <option value="aprobado">Aprobado</option>
              <option value="rechazado">Rechazado</option>
            </Select>
          </FormControl>

          <FormControl id="unidadContratacion">
            <FormLabel>Unidad de contratación</FormLabel>
            <Input name="unidadContratacion"  placeholder="Unidad de donde es contratado"borderRadius="25px" value={formData.unidadContratacion} onChange={handleChange} />
          </FormControl>

          <FormControl id="ubicacion">
            <FormLabel>Ubicación</FormLabel>
            <Input name="ubicacion" placeholder='Ej. Valledupar' borderRadius="25px" value={formData.ubicacion} onChange={handleChange} />
          </FormControl>

          <FormControl id="nombreResponsable">
            <FormLabel>Nombre del responsable</FormLabel>
            <Input name="nombreResponsable" placeholder='Ingrese el nombre del responsable de la contratación.' borderRadius="25px"  value={formData.nombreResponsable} onChange={handleChange} />
          </FormControl>

          <FormControl id="telefonoResponsable">
            <FormLabel>Teléfono del responsable</FormLabel>
            <Input name="telefonoResponsable"  placeholder='Ingrese el teléfono del responsable de la contratación.' borderRadius="25px" value={formData.telefonoResponsable} onChange={handleChange} />
          </FormControl>

          <FormControl id="correoResponsable">
            <FormLabel>Correo del responsable</FormLabel>
            <Input name="correoResponsable" placeholder='Ingrese el correo del responsable de la contratación.' borderRadius="25px" value={formData.correoResponsable} onChange={handleChange} />
          </FormControl>

          <FormControl id="cumplirLey2046">
            <FormLabel>¿Cumplir con Ley 2046?</FormLabel>
            <Checkbox name="cumplirLey2046" isChecked={formData.cumplirLey2046} onChange={handleChange} />
          </FormControl>

          <FormControl id="incluyeSuministroBienes">
            <FormLabel>¿Incluye suministro de bienes?</FormLabel>
            <Checkbox name="incluyeSuministroBienes" isChecked={formData.incluyeSuministroBienes} onChange={handleChange} />
          </FormControl>

          <FormControl id="oficinaSolicitante">
            <FormLabel>Oficina solicitante</FormLabel>
            <Select name="oficinaSolicitante" borderRadius="25px"value={formData.oficinaSolicitante} onChange={handleChange}>
              <option value="secretariaGeneral">Secretaría General</option>
              {oficinas.map((oficina) => (
                <option key={oficina.id} value={oficina.id}>
                  {oficina.name}
                </option>
              ))}
            </Select>
          </FormControl>

          <FormControl id="tareas">
            <FormLabel>Tareas</FormLabel>
            <HStack>
              <Input name="tarea" placeholder='Ingrese las tareas a realizar.' borderRadius="25px" value={tarea} onChange={handleTareaChange} />
              <IconButton
                icon={<AddIcon />}
                onClick={addTarea}
                aria-label="Agregar tarea"
              />
            </HStack>
            <SimpleGrid columns={2} spacing={2} mt={2} borderRadius="25px" >
              {formData.tareas.map((t, index) => (
                <HStack key={index}>
                  <Input value={t} isReadOnly borderRadius="25px" />
                  <IconButton
                    icon={<DeleteIcon />}
                    onClick={() => removeTarea(index)}
                    aria-label="Eliminar tarea"
                  />
                </HStack>
              ))}
            </SimpleGrid>
          </FormControl>

          <Button type="submit" colorScheme="blue" width="lg">
            Enviar
          </Button>
        </VStack>
      </form>
      </Card>
    </Box>
  );
};

export default FormPlanCompra;
