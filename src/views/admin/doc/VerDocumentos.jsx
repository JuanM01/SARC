import React, { useEffect, useState, useRef } from 'react';
import { 
  Box, 
  List, 
  ListItem, 
  Text, 
  Spinner, 
  Grid, 
  GridItem, 
  Button, 
  useDisclosure, 
  AlertDialog, 
  AlertDialogBody, 
  AlertDialogFooter, 
  AlertDialogHeader, 
  AlertDialogContent, 
  AlertDialogOverlay 
} from '@chakra-ui/react';
import { DownloadIcon, DeleteIcon } from '@chakra-ui/icons';

const VerDocumentos = () => {
  const [documents, setDocuments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedDocument, setSelectedDocument] = useState(null);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const cancelRef = useRef();

  useEffect(() => {
    const fetchDocuments = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/files');
        const data = await response.json();
        setDocuments(data);
        setLoading(false);
      } catch (error) {
        console.error('Error obteniendo documentos:', error);
        setLoading(false);
      }
    };

    fetchDocuments();
  }, []);

  const handleDocumentClick = (doc) => {
    setSelectedDocument(doc);
  };

  const handleDownload = () => {
    if (selectedDocument) {
      window.open(`http://localhost:5000/api/files/${selectedDocument.id}/download`, '_blank');
    }
  };

  const handleDelete = async () => {
    if (selectedDocument) {
      try {
        await fetch(`http://localhost:5000/api/files/${selectedDocument.id}`, {
          method: 'DELETE',
        });
        setDocuments(documents.filter((doc) => doc.id !== selectedDocument.id));
        setSelectedDocument(null);
        onClose();
      } catch (error) {
        console.error('Error eliminando documento:', error);
      }
    }
  };

  if (loading) {
    return (
      <Box p={4} display="flex" justifyContent="center" alignItems="center">
        <Spinner size="xl" />
      </Box>
    );
  }

  return (
    <Box p={4}>
      <Text fontSize="2xl" mb={4}>Ver Documentos</Text>
      <Grid templateColumns="repeat(2, 1fr)" gap={6}>
        <GridItem>
          <List spacing={3}>
            {documents.map((doc) => (
              <ListItem key={doc.id}>
                <Button onClick={() => handleDocumentClick(doc)}>
                  {doc.filename}
                </Button>
              </ListItem>
            ))}
          </List>
        </GridItem>
        <GridItem>
          {selectedDocument ? (
            <>
              <Box mb={4}>
                <Button colorScheme="blue" mr={3} onClick={handleDownload}>
                  <DownloadIcon mr={2} />
                  Descargar
                </Button>
                <Button colorScheme="red" onClick={onOpen}>
                  <DeleteIcon mr={2} />
                  Eliminar
                </Button>
              </Box>
              <iframe
                src={`http://localhost:5000/api/files/${selectedDocument.id}`}
                width="100%"
                height="600px"
                title="Documento PDF"
              />
              <AlertDialog
                isOpen={isOpen}
                leastDestructiveRef={cancelRef}
                onClose={onClose}
              >
                <AlertDialogOverlay>
                  <AlertDialogContent>
                    <AlertDialogHeader fontSize="lg" fontWeight="bold">
                      Eliminar Documento
                    </AlertDialogHeader>

                    <AlertDialogBody>
                      ¿Estás seguro? No podrás deshacer esta acción después.
                    </AlertDialogBody>

                    <AlertDialogFooter>
                      <Button ref={cancelRef} onClick={onClose}>
                        Cancelar
                      </Button>
                      <Button colorScheme="red" onClick={handleDelete} ml={3}>
                        Eliminar
                      </Button>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialogOverlay>
              </AlertDialog>
            </>
          ) : (
            <Text>Selecciona un documento para ver la vista previa</Text>
          )}
        </GridItem>
      </Grid>
    </Box>
  );
};

export default VerDocumentos;
