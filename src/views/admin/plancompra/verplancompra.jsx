import React, { useState, useEffect } from 'react';
import {
    Box,
    Table,
    Thead,
    Tbody,
    Tr,
    Th,
    Td,
    Button,
    useToast,
    Divider
} from '@chakra-ui/react';

const TareasVista = ({ requestId }) => {
    const [tareas, setTareas] = useState([]);

    useEffect(() => {
        fetchTareas();
    }, [requestId]);

    const fetchTareas = async () => {
        try {
            const response = await fetch(`http://localhost:5000/api/users/request/${requestId}/tasks`);
            if (response.ok) {
                const data = await response.json();
                setTareas(data);
            } else {
                throw new Error('Error al obtener las tareas');
            }
        } catch (error) {
            console.error('Error al obtener las tareas:', error);
        }
    };

    return (
        <Box p={5} borderWidth={1} borderRadius={8} boxShadow="lg" mt={4}>
            <Table variant="simple">
                <Thead>
                    <Tr>
                        <Th>#</Th>
                        <Th>Descripción de la Tarea</Th>
                    </Tr>
                </Thead>
                <Tbody>
                    {tareas.map((tarea, index) => (
                        <React.Fragment key={tarea.id}>
                            <Tr>
                                <Td>{index + 1}</Td>
                                <Td>{tarea.description}</Td>
                            </Tr>
                            {index < tareas.length - 1 && (
                                <Tr>
                                    <Td colSpan={2}>
                                        <Divider />
                                    </Td>
                                </Tr>
                            )}
                        </React.Fragment>
                    ))}
                </Tbody>
            </Table>
        </Box>
    );
};

const SolicitudesVista = () => {
    const [solicitudes, setSolicitudes] = useState([]);
    const [selectedRequest, setSelectedRequest] = useState(null);
    const toast = useToast();

    useEffect(() => {
        fetchSolicitudes();
    }, []);

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
            const response = await fetch('http://localhost:5000/api/users/request/status', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ id, estado })
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

    return (
        <Box p={5} borderWidth={1} borderRadius={8} boxShadow="lg" mt={8} width="3000px" backgroundColor={'white'}>
            <Table variant="simple">
                <Thead>
                    <Tr>
                        {/* Encabezados de la tabla */}
                        <Th>Código UNSPSC</Th>
                        <Th>Descripción</Th>
                        <Th>Fecha Inicio</Th>
                        <Th>Fecha Presentación</Th>
                        <Th>Duración Contrato</Th>
                        <Th>Intervalo Contrato</Th>
                        <Th>Modalidad Selección</Th>
                        <Th>Fuente Recursos</Th>
                        <Th>Valor Total Estimado</Th>
                        <Th>Valor Estimado Vigencia Actual</Th>
                        <Th>Requieren Vigencias Futuras</Th>
                        <Th>Estado Vigencias Futuras</Th>
                        <Th>Unidad Contratación</Th>
                        <Th>Ubicación</Th>
                        <Th>Nombre Responsable</Th>
                        <Th>Teléfono Responsable</Th>
                        <Th>Correo Responsable</Th>
                        <Th>Cumplir Ley 2046</Th>
                        <Th>Incluye Suministro Bienes</Th>
                        <Th>Oficina Solicitante</Th>
                        <Th>Estado</Th>
                        <Th>Acciones</Th>
                    </Tr>
                </Thead>
                <Tbody>
                    {solicitudes.map((solicitud) => (
                        <React.Fragment key={solicitud.id}>
                            <Tr>
                                <Td>{solicitud.codigo_unspsc}</Td>
                                <Td>{solicitud.descripcion}</Td>
                                <Td>{solicitud.fecha_inicio}</Td>
                                <Td>{solicitud.fecha_presentacion}</Td>
                                <Td>{solicitud.duracion_contrato}</Td>
                                <Td>{solicitud.intervalo_contrato}</Td>
                                <Td>{solicitud.modalidad_seleccion}</Td>
                                <Td>{solicitud.fuente_recursos}</Td>
                                <Td>{solicitud.valor_total_estimado}</Td>
                                <Td>{solicitud.valor_estimado_vigencia_actual}</Td>
                                <Td>{solicitud.requieren_vigencias_futuras ? 'Sí' : 'No'}</Td>
                                <Td>{solicitud.estado_solicitud_vigencias_futuras}</Td>
                                <Td>{solicitud.unidad_contratacion}</Td>
                                <Td>{solicitud.ubicacion}</Td>
                                <Td>{solicitud.nombre_responsable}</Td>
                                <Td>{solicitud.telefono_responsable}</Td>
                                <Td>{solicitud.correo_responsable}</Td>
                                <Td>{solicitud.cumplir_ley_2046 ? 'Sí' : 'No'}</Td>
                                <Td>{solicitud.incluye_suministro_bienes ? 'Sí' : 'No'}</Td>
                                <Td>{solicitud.oficina_solicitante}</Td>
                                <Td>{solicitud.estado}</Td>
                                <Td>
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
                                    <Button
                                        colorScheme="blue"
                                        size="sm"
                                        onClick={() => setSelectedRequest(selectedRequest === solicitud.id ? null : solicitud.id)}
                                    >
                                        {selectedRequest === solicitud.id ? 'Ocultar Tareas' : 'Ver Tareas'}
                                    </Button>
                                </Td>
                            </Tr>
                            {selectedRequest === solicitud.id && (
                                <Tr>
                                    <Td colSpan="22">
                                        <TareasVista requestId={solicitud.id} />
                                    </Td>
                                </Tr>
                            )}
                        </React.Fragment>
                    ))}
                </Tbody>
            </Table>
        </Box>
    );
};

export default SolicitudesVista;
