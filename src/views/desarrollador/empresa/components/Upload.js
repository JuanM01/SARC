import React, { useState } from 'react';
import { Box, Text, Icon } from '@chakra-ui/react';
import { useDropzone } from 'react-dropzone';
import { MdCloudUpload } from 'react-icons/md';

const Upload = ({ onFileUpload }) => {
  const [fileInfo, setFileInfo] = useState(null);

  const { getRootProps, getInputProps } = useDropzone({
    onDrop: (acceptedFiles) => {
      const file = acceptedFiles[0];
      setFileInfo({ name: file.name, type: file.type });
      onFileUpload(file);
    }
  });

  return (
    <Box
      {...getRootProps()}
      border="2px dashed"
      borderColor="gray.300"
      borderRadius="25px"
      p={4}
      textAlign="center"
      cursor="pointer"
      w="100%"
      minH={{ base: 'auto', lg: '220px', '2xl': '365px' }}
    >
      <input {...getInputProps()} />
      {fileInfo ? (
        <Text>
          {fileInfo.name} 
        </Text>
      ) : (
        <Box>
          <Icon as={MdCloudUpload} w={8} h={8} color="gray.400" />
          <Text fontSize='xl' fontWeight='700'  textAlign='center'color={'whiteAlpha.100'}>    </Text>
                  Carga de Archivos
          <Text mt={2} color="gray.400"  textAlign='center'>
          PNG, JPG & GIF archivos admitidos
          </Text>
        </Box>
      )}
    </Box>
  );
};

export default Upload;
