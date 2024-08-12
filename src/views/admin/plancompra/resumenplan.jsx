import React, { useState, useEffect } from 'react';
import {
    Box,
    Accordion,
    AccordionItem,
    AccordionButton,
    AccordionPanel,
    AccordionIcon,
    Text,
    Button,
    useToast,
    Spinner
} from '@chakra-ui/react';

const SolicitudDetalle = () => {
    const [solicitudes, setSolicitudes] = useState([]);
    const [loadingTareas, setLoadingTareas] = useState(false); // Estado para indicar carga de tareas
    const toast = useToast();

    useEffect(() => {
        fetchSolicitudes();
    }, []); // Dependencia vacía porque solo se necesita cargar una vez al inicio

    const fetchSolicitudes = async () => {
        try {
            const response = await fetch('http://localhost:5000/api/users/request');
            if (response.ok) {
                const data = await response.json();
                setSolicitudes(data);
            } else {
                throw new Error('Error al obtener las solicitudes');
            }
        } catch (error) {
            console.error('Error al obtener las solicitudes:', error);
            toast({
                title: 'Error al obtener las solicitudes.',
                status: 'error',
                duration: 5000,
                isClosable: true,
            });
        }
    };

    const handleEstado = async (id, estado) => {
        try {
            const response = await fetch(`http://localhost:5000/api/users/request/${id}/status`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ estado }),
            });
            if (response.ok) {
                fetchSolicitudes(); // Refrescar las solicitudes
                toast({
                    title: `Solicitud ${estado.toLowerCase()} con éxito.`,
                    status: 'success',
                    duration: 5000,
                    isClosable: true,
                });
            } else {
                throw new Error('Error al actualizar el estado');
            }
        } catch (error) {
            console.error('Error al actualizar el estado:', error);
            toast({
                title: 'Error al actualizar el estado.',
                status: 'error',
                duration: 5000,
                isClosable: true,
            });
        }
    };

    const fetchTareas = async (id) => {
        try {
            setLoadingTareas(true);
            const response = await fetch(`http://localhost:5000/api/users/request/${id}/tasks`);
            if (response.ok) {
                const data = await response.json();
                const updatedSolicitudes = solicitudes.map(solicitud => {
                    if (solicitud.id === id) {
                        return { ...solicitud, tareas: data };
                    }
                    return solicitud;
                });
                setSolicitudes(updatedSolicitudes);
            } else {
                throw new Error('Error al obtener las tareas');
            }
        } catch (error) {
            console.error('Error al obtener las tareas:', error);
            toast({
                title: 'Error al obtener las tareas.',
                status: 'error',
                duration: 5000,
                isClosable: true,
            });
        } finally {
            setLoadingTareas(false);
        }
    };

    return (
        <Box p={5} borderWidth={1} borderRadius={8} boxShadow="lg" mt={8}>
            <Accordion allowToggle>
                {solicitudes.map((solicitud) => (
                    <AccordionItem key={solicitud.id}>
                        <h2>
                            <AccordionButton>
                                <Box flex="1" textAlign="left">
                                    {solicitud.descripcion}
                                </Box>
                                <AccordionIcon />
                            </AccordionButton>
                        </h2>
                        <AccordionPanel pb={4}>
                            <Text>Detalles de la solicitud:</Text>
                            <Text><strong>Código UNSPSC:</strong> {solicitud.codigo_unspsc}</Text>
                            <Text><strong>Descripción:</strong> {solicitud.descripcion}</Text>
                            <Text><strong>Fecha Inicio:</strong> {solicitud.fecha_inicio}</Text>
                            <Text><strong>Fecha Presentación:</strong> {solicitud.fecha_presentacion}</Text>
                            <Text><strong>Duración Contrato:</strong> {solicitud.duracion_contrato}</Text>
                            <Text><strong>Intervalo Contrato:</strong> {solicitud.intervalo_contrato}</Text>
                            <Text><strong>Modalidad Selección:</strong> {solicitud.modalidad_seleccion}</Text>
                            <Text><strong>Fuente Recursos:</strong> {solicitud.fuente_recursos}</Text>
                            <Text><strong>Valor Total Estimado:</strong> {solicitud.valor_total_estimado}</Text>
                            <Text><strong>Valor Estimado Vigencia Actual:</strong> {solicitud.valor_estimado_vigencia_actual}</Text>
                            <Text><strong>Requieren Vigencias Futuras:</strong> {solicitud.requieren_vigencias_futuras ? 'Sí' : 'No'}</Text>
                            <Text><strong>Estado Vigencias Futuras:</strong> {solicitud.estado_solicitud_vigencias_futuras}</Text>
                            <Text><strong>Unidad Contratación:</strong> {solicitud.unidad_contratacion}</Text>
                            <Text><strong>Ubicación:</strong> {solicitud.ubicacion}</Text>
                            <Text><strong>Nombre Responsable:</strong> {solicitud.nombre_responsable}</Text>
                            <Text><strong>Teléfono Responsable:</strong> {solicitud.telefono_responsable}</Text>
                            <Text><strong>Correo Responsable:</strong> {solicitud.correo_responsable}</Text>
                            <Text><strong>Cumplir Ley 2046:</strong> {solicitud.cumplir_ley_2046 ? 'Sí' : 'No'}</Text>
                            <Text><strong>Incluye Suministro Bienes:</strong> {solicitud.incluye_suministro_bienes ? 'Sí' : 'No'}</Text>
                            <Text><strong>Oficina Solicitante:</strong> {solicitud.oficina_solicitante}</Text>
                            <Button
                                colorScheme="green"
                                size="sm"
                                onClick={() => handleEstado(solicitud.id, 'Aprobada')}
                                isDisabled={solicitud.estado !== 'Pendiente'}
                                mr={2}
                            >
                                Aprobar
                            </Button>
                            <Button
                                colorScheme="red"
                                size="sm"
                                onClick={() => handleEstado(solicitud.id, 'Rechazada')}
                                isDisabled={solicitud.estado !== 'Pendiente'}
                            >
                                Rechazar
                            </Button>
                            <Accordion allowToggle mt={4}>
                                <AccordionItem>
                                    <h3>
                                        <AccordionButton onClick={() => fetchTareas(solicitud.id)}>
                                            <Box flex="1" textAlign="left">
                                                Ver Tareas
                                            </Box>
                                            <AccordionIcon />
                                        </AccordionButton>
                                    </h3>
                                    <AccordionPanel pb={4}>
                                        {loadingTareas ? (
                                            <Spinner size="sm" />
                                        ) : (
                                            solicitud.tareas && solicitud.tareas.length > 0 ? (
                                                solicitud.tareas.map((tarea, index) => (
                                                    <Box key={tarea.id} mt={2}>
                                                        <Text>{index + 1}. {tarea.description}</Text>
                                                    </Box>
                                                ))
                                            ) : (
                                                <Text>No hay tareas asociadas a esta solicitud.</Text>
                                            )
                                        )}
                                    </AccordionPanel>
                                </AccordionItem>
                            </Accordion>
                        </AccordionPanel>
                    </AccordionItem>
                ))}
            </Accordion>
        </Box>
    );
};

export default SolicitudDetalle;
