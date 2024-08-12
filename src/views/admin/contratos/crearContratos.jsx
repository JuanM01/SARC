import React, { useState } from 'react';
import { Box, Button, Input, Textarea, FormLabel,FormControl,Stack,useToast } from '@chakra-ui/react';
import { Formik, Form, Field } from 'formik';
import { Document, Page, Text, View, Image, StyleSheet, PDFDownloadLink } from '@react-pdf/renderer';
import * as Yup from 'yup';
import axios from 'axios';
import logo from '../../../assets/img/alcaldiaValledupar.png';
import pie from '../../../assets/img/pie.jpg';
import { NumerosALetras } from 'numero-a-letras';
import Card from 'components/card/Card';
const ContratosForm = () => {
  const [fileName, setFileName] = useState('');
  const toast = useToast();
 
  const styles = StyleSheet.create({
    page: {
      padding: 20,
      fontFamily: 'Helvetica',
      position: 'relative',
    },
    header: {
      marginBottom: 10,
      flexDirection: 'column',
      alignItems: 'center',
    },
    title: {
      fontSize: 16,
      fontWeight: 'bold',
    },
    logo: {
      position: 'absolute',
      width: 120,
      height: 60,
      top: 3,
      left: 0,
    },
    separator: {
      marginVertical: 5,
      borderBottomWidth: 1,
      borderBottomColor: '#000',
    },
    processText: {
      marginLeft: 10,
      fontSize: 14,
      textAlign: 'center',
    },
    contractText: {
      marginTop: 10,
      fontSize: 12,
    },
    bold: {
      fontWeight: 'bold',
    },
    table: {
      marginTop: 20,
      width: '100%',
      border: '1px solid #000',
    },
    tableRow: {
      flexDirection: 'row',
    },
    tableCell: {
      padding: 5,
      fontSize: 10,
      width: '50%',
      borderBottom: '1px solid #000',
    },
    tableCellLeft: {
      backgroundColor: '#E0E0E0',
      width: '35%',
      borderRight: '1px solid #000'
    },
    tableCellRight: {
      width: '65%',
    },
    footer: {
      position: 'absolute',
      bottom: 5,
      left: 0,
      right: 0,
      textAlign: 'center',
      opacity: 0.5,
      zIndex: -1,
    }, 
    footerImage: {
      width: '100%',
    },
    footerTextContainer: {
      position: 'absolute',
      bottom: 10,
      left: 0,
      right: 0,
      textAlign: 'center',
      color: 'black',
      fontSize: 10,
    },
    listItem: {
      marginBottom: 5,
    },
    listItemNumber: {
      fontSize: 14,
      marginRight: 5,
    },
    listContainer: {
      flexDirection: 'row',
      alignItems: 'flex-start',
      marginTop: 10,
    },
    listItemText: {
      flex: 1,
    },
  });

  

  const calcularPagoMensual = (valorContrato, plazo) => {
    const diasPorMes = 30;
    const totalMeses = plazo / diasPorMes;
    const pagoMensual = valorContrato / totalMeses;
    return pagoMensual.toFixed(2);
  };

  const numberToWords = (num) => {
    // Convertir el número a palabras usando NumerosALetras
    const words = NumerosALetras(num).toUpperCase();
    // Eliminar la parte de la moneda y formatear la cadena
    const wordsFormatted = words.replace('PESOS 05/100 M.N.', 'PESOS')
                                .replace('PESOS 00/100 M.N.', 'PESOS')
                                .replace(/\sDE\s/g, ' ')
                                .replace(/\s+/g, ' ');
    return `${wordsFormatted} ($${num.toLocaleString()}) M/L`;
  };

  const convertDaysToWords = (days) => {
    const months = Math.floor(days / 30);
    const remainingDays = days % 30;
    const monthsWords = months ? NumerosALetras(months).toUpperCase().replace('PESOS 00/100 M.N.', '') : '';
    const daysWords = remainingDays ? NumerosALetras(remainingDays).toUpperCase().replace('PESOS 00/100 M.N.', '') : '';
    const monthsPart = months ? `${monthsWords.trim()} (${months}) MESES` : '';
    const daysPart = remainingDays ? `${daysWords.trim()} (${remainingDays}) DÍAS` : '';
    return `${monthsPart}${months && remainingDays ? ' Y ' : ''}${daysPart} CALENDARIO`;
  };
  
  const Header = ({ values }) => (
    <View style={styles.header}>
      <Image style={styles.logo} src={logo} />
      <Text style={[styles.title, styles.bold]}>SECRETARÍA GENERAL</Text>
      <View style={[styles.logoContainer, { marginTop: 15 }]}>
        <Text style={[styles.processText, { marginLeft: 35 }]}>PROCESO {values.procesoCodigo}</Text>
        <Text style={[styles.processText]}>ANEXO AL CONTRATO ELECTRÓNICO</Text>
      </View>
      <Text style={[styles.contractText, styles.bold, { marginTop: 15 }]}>
        ANEXO AL CONTRATO ELECTRÓNICO No {values.fechaContrato} DE PRESTACIÓN DE SERVICIOS
        CELEBRANDO ENTRE EL DEPARTAMENTO DEL CESAR Y {values.nombreContratista}, IDENTIFICADO
        CON CÉDULA DE CIUDADANÍA No {values.documentoContratista}
      </Text>
    </View>
  );
  
  // Footer component
  const Footer = () => (
    <View style={styles.footer}>
      <Image style={styles.footerImage} src={pie} />
      <View style={styles.footerTextContainer}>
        <Text>Dirección: Calle 123 #45-67, Valledupar, Cesar | Correo: info@cesar.gov.co | Teléfono: +57 123 456 7890</Text>
        <Text>Instagram: @cesar_gov | Twitter: @cesar_gov | Facebook: /cesar.gov</Text>
      </View>
    </View>
  );

  
  const ContratoPDF = ({ values }) => {
    const pagoMensual = calcularPagoMensual(values.valorContrato, values.plazo);
    return (
      <Document>
    <Page size="A4" style={styles.page} wrap>
      <View style={[styles.header, {marginTop: 0}]}>
        <Header values={values} />
      </View>
      <View style={styles.separator} />
      <View style={[styles.table, {marginTop: 0}]}>
        <View style={styles.tableRow}>
          <Text style={[styles.tableCell, styles.tableCellLeft]}>MODALIDAD DE CONTRATACION:</Text>
          <Text style={[styles.tableCell, styles.tableCellRight]}>CONTRATACION DIRECTA</Text>
        </View>
        <View style={styles.tableRow}>
          <Text style={[styles.tableCell, styles.tableCellLeft]}>JUSTIFICACION DE LA MODALIDAD:</Text>
          <Text style={[styles.tableCell, styles.tableCellRight]}>PRESTACION DE SERVICIOS</Text>
        </View>
        <View style={styles.tableRow}>
          <Text style={[styles.tableCell, styles.tableCellLeft]}>TIPO DE CONTRATACION:</Text>
          <Text style={[styles.tableCell, styles.tableCellRight]}>PRESTACION DE SERVICIOS</Text>
        </View>
        <View style={styles.tableRow}>
          <Text style={[styles.tableCell, styles.tableCellLeft]}>ENTIDAD CONTRATANTE:</Text>
          <Text style={[styles.tableCell, styles.tableCellRight]}>ALCALDIA DE VALLEDUPAR</Text>
        </View>
        <View style={styles.tableRow}>
          <Text style={[styles.tableCell, styles.tableCellLeft]}>NIT:</Text>
          <Text style={[styles.tableCell, styles.tableCellRight]}>{values.nit}</Text>
        </View>
        <View style={styles.tableRow}>
          <Text style={[styles.tableCell, styles.tableCellLeft]}>OBJETO:</Text>
          <Text style={[styles.tableCell, styles.tableCellRight]}>{values.objeto}</Text>
        </View>
        <View style={styles.tableRow}>
          <Text style={[styles.tableCell, styles.tableCellLeft]}>CONTRATISTA:</Text>
          <Text style={[styles.tableCell, styles.tableCellRight]}>{values.nombreContratista}</Text>
        </View>
        <View style={styles.tableRow}>
          <Text style={[styles.tableCell, styles.tableCellLeft]}>IDENTIFICACION:</Text>
          <Text style={[styles.tableCell, styles.tableCellRight]}>{values.documentoContratista}</Text>
        </View>
        <View style={styles.tableRow}>
          <Text style={[styles.tableCell, styles.tableCellLeft]}>VALOR CONTRATO:</Text>
          <Text style={[styles.tableCell, styles.tableCellRight]}>{`(${numberToWords(values.valorContrato)})`}</Text>
        </View>
        <View style={styles.tableRow}>
          <Text style={[styles.tableCell, styles.tableCellLeft]}>PLAZO:</Text>
          <Text style={[styles.tableCell, styles.tableCellRight]}>{`(${convertDaysToWords(values.plazo)})`}</Text>
        </View>
      </View>
      <Text style={styles.contractText}>
        Entre los suscritos, <Text style={styles.bold}>LORENA HERNANDEZ DANGOND</Text>, mayor de edad, domiciliado en Valledupar
        identificada con la Cédula de Ciudadanía No. 1.065.591.163 expedida en Valledupar (Cesar), quien, en
        su calidad de Secretaria General de la <Text style={styles.bold}>ALCALDIA DE VALLEDUPAR</Text>, debidamente facultada para
        suscribir contratos y convenios mediante Decreto No. 000028 del 23 de Febrero de 2023 emanado del
        Despacho del Señor Gobernador y quien en adelante para todos los efectos legales y contractuales del
        presente contrato se denominará <Text style={styles.bold}>EL DEPARTAMENTO</Text>, por una parte, y por la otra, <Text style={styles.bold}>{values.nombreContratista},
        identificado con Cedula de Ciudadanía No. {values.documentoContratista}</Text>, quien en adelante se denominará <Text style={styles.bold}>EL CONTRATISTA</Text>, hemos
        acordado celebrar un Contrato de <Text style={styles.bold}>PRESTACIÓN DE SERVICIOS</Text>, de conformidad con las siguientes clausulas: 
      </Text>
      <Text style={styles.contractText}>
        <Text style={styles.bold}>Cláusula 1 - Objeto del Contrato</Text>
      </Text>
      <View style={styles.separator} />
      <Text style={styles.contractText}>
        <Text style={[styles.bold, {width:'100%'}]}>{values.objeto}</Text>
      </Text>
      <Text style={styles.contractText}>
        <Text style={styles.bold}>Cláusula 2 - Plazo</Text>
      </Text>
      <View style={styles.separator} />
      <Text style={styles.contractText}>
        <Text style={styles.bold}>El plazo de ejecución del contrato será de {`(${convertDaysToWords(values.plazo)})`} contados a partir del cumplimiento de los requisitos de perfeccionamiento, de ejecución y la suscripción del acta de inicio, en todo caso el plazo no deberá exceder del 31 de diciembre de 2024.</Text>
      </Text>
      <Footer />
    </Page>
    <Page size="A4" style={styles.page} wrap>
      <View style={[styles.header, {marginTop: 0}]}>
        <Header values={values} />
      </View>
      <View style={styles.separator} />
      <Text style={styles.contractText}>
        <Text style={styles.bold}>Cláusula 3 - Valor del Contrato y Forma de pago</Text>
      </Text>
      <View style={styles.separator} />
      <Text style={styles.contractText}>
        <Text style={styles.bold}>{`(${numberToWords(values.valorContrato)})`}. soportado en el Certificado de Disponibilidad Presupuestal N.º 167 del 26 de febrero de 2024.</Text>
      </Text>
      <Text style={styles.contractText}>
        EL DEPARTAMENTO cancelará el valor del Contrato de la siguiente forma: MENSUALIDADES CUMPLIDAS DEL PRIMERO AL ÚLTIMO DÍA DE CADA MES, equivalentes a la suma de {`(${numberToWords(pagoMensual)})`} por mes de prestación de servicio, y el valor restante se pagará de acuerdo con la fracción del mes ejecutado.
      </Text>
      <Text style={[styles.contractText, styles.bold, { marginTop: 15 }]}>
      PARAGRAFO PRIMERO: Para establecer la proporción o fracción, el valor de la mensualidad se dividirá por Treinta (30) días y se multiplicará por los días calendario objeto del fraccionamiento.</Text>
      <Text style={[styles.contractText, styles.bold, { marginTop: 10 }]}>
      PARAGRAFO SEGUNDO: El supervisor del contrato establecerá en el acta de inicio la programación de pagos de acuerdo con las reglas anteriores. En todo caso cada pago debe estar precedido de la respectiva certificación de cumplimiento de las actividades a satisfacción expedida por el Supervisor y verificación por parte de este respecto del cumplimiento de pagos al sistema general de seguridad social integral, la presentación de la factura y del informe de gestión. Como condición para efectuar el último pago será necesario adjuntar copia del Acta de Liquidación suscrita por el contratista y el supervisor, la cual debe ser proyectada por el Supervisor del contrato.</Text>
      <Text style={[styles.contractText, styles.bold, { marginTop: 10 }]}>
      PARÁGRAFO TERCERO: En caso de que, para garantizar el cumplimiento del objeto, el contratista requiera desplazarse dentro o fuera del Departamento del Cesar, el reconocimiento de los gastos de viaje y alimentación serán autorizados por la entidad a través del supervisor designado, siempre y cuando exista previamente la respectiva apropiación presupuestal, debidamente soportada en el Certificado de Disponibilidad Presupuestal, que cubra o garantice la estimación de gastos de viaje y alimentación, conforme a lo establecido en el Decreto 00210 de 2020. El contratista al que su supervisor le autorice el desplazamiento se sujetará al procedimiento establecido para el reconocimiento y legalización de gastos de desplazamiento (viáticos); en caso de que el contratista viaje sin el cumplimiento de las condiciones señaladas anteriormente, incluyendo la preexistencia y suficiencia de la apropiación presupuestal, se entiende que renuncia al reconocimiento de los gastos de viaje y alimentación.
      </Text>
      <Text style={styles.contractText}>
        <Text style={styles.bold}>Cláusula 4 - Lugar de Ejecución</Text>
      </Text>
      <View style={styles.separator} />
      <Text style={styles.contractText}>
        <Text style={styles.bold}>El lugar de ejecución del contrato será EN LA SECRETARIA DE SALUD DEPARTAMENTAL, y por la naturaleza de sus obligaciones contractuales en los diferentes municipios del Departamento y otros departamentos si es autorizado.</Text>
      </Text>
      <Text style={styles.contractText}>
        <Text style={styles.bold}>Cláusula 5 – Obligaciones de las partes</Text>
      </Text>
      <View style={styles.separator} />
      <Text style={styles.contractText}>5.1. Obligaciones del Contratista:</Text>
      <Text style={styles.contractText}>5.1.1. Obligaciones Generales:</Text>
      <Text style={styles.contractText}>Serán obligaciones generales del contratista las siguientes:</Text>
      <Footer />
    </Page>
    <Page size="A4" style={styles.page} wrap>
      <Header values={values} />
      <View style={styles.separator} />
      <View style={styles.listContainer}>
        <Text style={styles.listItemNumber}>1.</Text>
        <Text style={[styles.contractText, styles.listItemText]}>
          Cumplir con el objeto del contrato con plena autonomía técnica y administrativa, bajo su propia responsabilidad, por lo tanto, no existe ni existirá ningún tipo de subordinación, ni vínculo laboral alguno entre <Text style={styles.bold}>EL CONTRATISTA</Text> y el Departamento.
        </Text>
      </View>
    <View style={styles.listContainer}>
      <Text style={styles.listItemNumber}>2.</Text>
      <Text style={[styles.contractText, styles.listItemText]}>
        Cumplir oportunamente con todas las exigencias y procedimientos establecidos para la firma electrónica de los contratos y sus modificaciones en la plataforma de SECOP II. El término para atender dichos procedimientos deberá realizarse en un término no mayor a dos (2) días hábiles, una vez recibida la notificación emitida por Colombia Compra eficiente mediante correo electrónico (registrado por el contratista en SECOP II).
      </Text>
    </View>
    <View style={styles.listContainer}>
      <Text style={styles.listItemNumber}>3.</Text>
      <Text style={[styles.contractText, styles.listItemText]}>
        Constituir, realizar y reportar el cargue de las garantías requeridas por el Departamento, dentro de los dos (2) días hábiles siguientes a la suscripción electrónica del contrato entre las partes, en el evento que las garantías sean rechazadas por la entidad, el contratista deberá proceder a las modificaciones respectivas, en todo caso será única y exclusivamente responsabilidad del contratista, por lo que para tales efectos deberá estar atento a la aceptación y/o rechazo de las garantías y las anotaciones respectivas que realice SECOP II en relación a dichas actuaciones.
      </Text>
    </View>
    <View style={styles.listContainer}>
      <Text style={styles.listItemNumber}>4.</Text>
      <Text style={[styles.contractText, styles.listItemText]}>
        La garantía única de cumplimiento deberá estar vigente hasta la liquidación del contrato.
      </Text>
    </View>
    <View style={styles.listContainer}>
      <Text style={styles.listItemNumber}>5.</Text>
      <Text style={[styles.contractText, styles.listItemText]}>
        Constituir, realizar y reportar el cargue del pago de los impuestos y/o lo preceptuado por la ordenanza N°000226 del 26 de febrero de 2021, y/o cualquier norma que sustituya o modifique, dentro de los dos (2) días hábiles siguientes a la suscripción electrónica del contrato entre las partes.
      </Text>
    </View>
    <View style={styles.listContainer}>
      <Text style={styles.listItemNumber}>6.</Text>
      <Text style={[styles.contractText, styles.listItemText]}>
        Para efectos de legalización del contrato, el contratista deberá radicar en secretaria general los siguientes documentos: (i)Póliza y recibo de pago; (ii) Liquidación de impuestos; (iii) Pago de Impuestos, y/o (iv) acuerdo de pago según ordenanza 000226 del 26 de febrero de 2021, la fecha de radicación de estos documentos se tendrá en cuenta para traslado del proceso al
        supervisor del contrato previa suscripción del acta de inicio.
      </Text>
    </View>
    <View style={styles.listContainer}>
      <Text style={styles.listItemNumber}>7.</Text>
      <Text style={[styles.contractText, styles.listItemText]}>
        Cumplir con las disposiciones establecidas en el Capítulo "Buenas Prácticas en la Gestión Contractual" del Manual de Contratación vigente.
      </Text>
    </View>
    <View style={styles.listContainer}>
      <Text style={styles.listItemNumber}>8.</Text>
      <Text style={[styles.contractText, styles.listItemText]}>
        Atender los requerimientos, instrucciones y/o recomendaciones que durante el desarrollo del contrato le imparta el Departamento a través del supervisor y/o ordenador del gasto, para una correcta ejecución y cumplimiento de sus obligaciones.
      </Text>
    </View>
    <View style={styles.listContainer}>
      <Text style={styles.listItemNumber}>9.</Text>
      <Text style={[styles.contractText, styles.listItemText]}>
        Guardar estricta reserva y confidencialidad sobre la totalidad de la información que sea recibida en desarrollo del objeto de contrato y sobre toda la información y documentos que tenga acceso, maneje en desarrollo de su actividad o que llegue a conocer en desarrollo del contrato y que no tenga carácter de pública. En consecuencia, se obliga a no divulgar por ningún medio dicha información o documentos a terceros, sin la previa autorización escrita del Departamento.
      </Text>
    </View>
      <Footer />
    </Page>  
    <Page size="A4" style={styles.page} wrap>
      <Header values={values} />
      <View style={styles.separator} />
      <View style={styles.listContainer}>
        <Text style={styles.listItemNumber}>10.</Text>
        <Text style={[styles.contractText, styles.listItemText]}>
          Mantener correctamente actualizados cada uno de los sistemas de información que maneje en desarrollo de su actividad.
        </Text>
      </View>
      <View style={styles.listContainer}>
        <Text style={styles.listItemNumber}>11.</Text>
        <Text style={[styles.contractText, styles.listItemText]}>
          Asumir un buen trato para con los demás colaboradores internos y externos del Departamento, y actuar con responsabilidad, eficiencia y transparencia.
        </Text>
      </View>
      <View style={styles.listContainer}>
        <Text style={styles.listItemNumber}>12.</Text>
        <Text style={[styles.contractText, styles.listItemText]}>
          Presentar informes mensuales de las actividades realizadas en cumplimiento de lo pactado en el contrato
        </Text>
      </View>
      <View style={styles.listContainer}>
        <Text style={styles.listItemNumber}>13.</Text>
        <Text style={[styles.contractText, styles.listItemText]}>
          Colaborar y atender oportunamente con el suministro y respuesta de la información correspondiente, a los requerimientos efectuados por los organismos de control del Estado Colombiano.
        </Text>
      </View>
      <View style={styles.listContainer}>
        <Text style={styles.listItemNumber}>14.</Text>
        <Text style={[styles.contractText, styles.listItemText]}>
          Utilizar la imagen del Departamento de acuerdo con los lineamientos establecidos por éste. Salvo autorización expresa y escrita de las partes ningún Contratista, podrá utilizar el nombre, emblema o sello oficial de la otra parte para fines publicitarios o de cualquier otra índole.
        </Text>
      </View>
      <View style={styles.listContainer}>
        <Text style={styles.listItemNumber}>15.</Text>
        <Text style={[styles.contractText, styles.listItemText]}>
          Estar al día con el pago al sistema de seguridad social (salud, pensión y riesgos laborales, Aportes parafiscales con destino a las Cajas de Compensación Familiar, el Instituto Colombiano de Bienestar Familiar ICBF y el Servicio Nacional de Aprendizaje SENA (si corresponde)), al momento de la celebración del contrato y durante todo el término de vigencia de éste; para lo cual deberá adjuntar la planilla de pago y/o los soportes en la plataforma SECOP II y SIRCC II.
        </Text>
      </View>
      <View style={styles.listContainer}>
        <Text style={styles.listItemNumber}>16.</Text>
        <Text style={[styles.contractText, styles.listItemText]}>
          Entregar al supervisor del contrato y/o al designado para tal fin, a la terminación del contrato, el inventario documental de los archivos que tenga bajo su custodia y responsabilidad y que hayan sido entregados para la prestación de los servicios a su cargo.
        </Text>
      </View>
      <View style={styles.listContainer}>
        <Text style={styles.listItemNumber}>17.</Text>
        <Text style={[styles.contractText, styles.listItemText]}>
          Devolver al Departamento, una vez finalizado la ejecución del contrato, el Carnet de ingreso (el cual será desactivado a partir de ese momento para el ingreso a las instalaciones de la Gobernación del Cesar), en ningún momento deberá el contratista utilizar el carnet de identificación para otras actividades diferentes a las relacionadas con la entidad, en todo caso, este carnet es un instrumento de ingreso al público a las instalaciones de la sede administrativa de la Gobernación.
        </Text>
      </View>
      <View style={styles.listContainer}>
        <Text style={styles.listItemNumber}>18.</Text>
        <Text style={[styles.contractText, styles.listItemText]}>
          Cumplir siempre en el ejercicio de sus obligaciones con las normas, procedimientos, guías, instrumentos, formatos, reglamentos internos, términos y/o plazos entre otros, definidos por las instancias competentes del Departamento.
        </Text>
      </View>
      <Text style={[styles.contractText, styles.bold, { marginTop: 10 }]}>
      PARÁGRAFO: En todo caso, el contratista actuará con autonomía, reconociendo y aceptando que entre este y la Entidad existe una relación temporal, en la que no existe relación de subordinación o dependencia.
      </Text>
      <Footer />
    </Page>
    <Page size="A4" style={styles.page} wrap>
      <Header values={values} />
      <View style={styles.separator} />
      <Text style={styles.contractText}>5.1.2. Obligaciones Específicas:</Text>
      <Text style={styles.contractText}>Serán obligaciones específicas del contratista el apoyo oportuno en las siguientes actividades:</Text>
      <View style={styles.listContainer}>
        <Text style={styles.listItemNumber}>1.</Text>
        <Text style={[styles.contractText, styles.listItemText]}>
          Apoyar en el reporte semestral de los medicamentos y tutelas (MYT) de Resolución 1479 del 2015 del Ministerio Nacional de Salud y Protección Social
        </Text>
      </View>
      <View style={styles.listContainer}>
        <Text style={styles.listItemNumber}>2.</Text>
        <Text style={[styles.contractText, styles.listItemText]}>
          ARealizar el diseño e implementación de herramientas informáticas que faciliten los procesos de radicación, validación y verificación de títulos valores.
        </Text>
      </View>
      <View style={styles.listContainer}>
        <Text style={styles.listItemNumber}>3.</Text>
        <Text style={[styles.contractText, styles.listItemText]}>
          Realizar el registro de información para la construcción de bases de datos en las herramientas informáticas diseñadas para tal fin en los procesos de radicación, validación y verificación de títulos valores.
        </Text>
      </View>
      <View style={styles.listContainer}>
        <Text style={styles.listItemNumber}>4.</Text>
        <Text style={[styles.contractText, styles.listItemText]}>
        Realizar los diferentes procesos de seguimiento, depuración y reportes que debe presentar el proceso de radicación, validación y verificación de títulos valores en las diferentes plataformas de entidades interna y externas, dando cumplimiento a la normatividad y procesos vigentes.
        </Text>
      </View>
      <View style={styles.listContainer}>
        <Text style={styles.listItemNumber}>5.</Text>
        <Text style={[styles.contractText, styles.listItemText]}>
        Realizar copias de seguridad de la información generada del proceso de radicación, validación y verificación de títulos valores la oficina asuntos en salud.
        </Text>
      </View>
      <View style={styles.listContainer}>
        <Text style={styles.listItemNumber}>6.</Text>
        <Text style={[styles.contractText, styles.listItemText]}>
        Consolidar la información de la base de datos existentes en las subáreas de recepción, validación, auditoria y devolución administrativa de facturas.
        </Text>
      </View>
      <View style={styles.listContainer}>
        <Text style={styles.listItemNumber}>7.</Text>
        <Text style={[styles.contractText, styles.listItemText]}>
        Apoyar en la consolidación de la información suministrada por la subárea de cartera y los cruces de las carteras recibidas por los prestadores de salud.
        </Text>
      </View>
      <View style={styles.listContainer}>
        <Text style={styles.listItemNumber}>8.</Text>
        <Text style={[styles.contractText, styles.listItemText]}>
        Apoyar en la generación de los diferentes consolidados de la información generada en la oficina de asuntos en salud para los diferentes informes departamentales y nacionales.
        </Text>
      </View>
      <View style={styles.listContainer}>
        <Text style={styles.listItemNumber}>9.</Text>
        <Text style={[styles.contractText, styles.listItemText]}>
        Certificar cuando se necesario el estado de las facturas una vez se realice el cruce de la información de las diferentes subáreas de la oficina de asuntos de salud.
        </Text>
      </View>
      <View style={styles.listContainer}>
        <Text style={styles.listItemNumber}>10.</Text>
        <Text style={[styles.contractText, styles.listItemText]}>
        Cumplir las metas que determine el supervisor del contrato mes a mes de acuerdo al flujo de trabajo del área.
        </Text>
      </View>
      <View style={styles.listContainer}>
        <Text style={styles.listItemNumber}>11.</Text>
        <Text style={[styles.contractText, styles.listItemText]}>
        Apoyar al supervisor del contrato en el reporte periódico de la información concerniente al desarrollo de sus obligaciones contractuales.
        </Text>
      </View>
      <View style={styles.listContainer}>
        <Text style={styles.listItemNumber}>12.</Text>
        <Text style={[styles.contractText, styles.listItemText]}>
        Las demás que le sean asignadas y que se relacionen con el objeto a contratar.
        </Text>
      </View>
      <Footer />
    </Page>
    <Page size="A4" style={styles.page} wrap>
      <Header values={values} />
      <View style={styles.separator} />
      <Text style={styles.contractText}>6.2. Obligaciones de El Departamento:</Text>
      <Text style={styles.contractText}>El Departamento del Cesar, se obliga a:</Text>
      <View style={styles.listContainer}>
        <Text style={styles.listItemNumber}>1.</Text>
        <Text style={[styles.contractText, styles.listItemText]}>
        Velar por cumplimiento de todas las cláusulas contractuales.
        </Text>
      </View>
      <View style={styles.listContainer}>
        <Text style={styles.listItemNumber}>2.</Text>
        <Text style={[styles.contractText, styles.listItemText]}>
          Exigir al contratista la ejecución idónea y oportuna del objeto del contrato.
        </Text>
      </View>
      <View style={styles.listContainer}>
        <Text style={styles.listItemNumber}>3.</Text>
        <Text style={[styles.contractText, styles.listItemText]}>
          Adelantar las gestiones necesarias para el reconocimiento y cobro de las sanciones pecuniaria y garantías a la que hubiere lugar.
        </Text>
      </View>
      <View style={styles.listContainer}>
        <Text style={styles.listItemNumber}>4.</Text>
        <Text style={[styles.contractText, styles.listItemText]}>
          Exigir el cumplimiento de las obligaciones del contratista.
        </Text>
      </View>
      <View style={styles.listContainer}>
        <Text style={styles.listItemNumber}>5.</Text>
        <Text style={[styles.contractText, styles.listItemText]}>
          Adelantar las acciones conducentes a obtener la indemnización que sufra el departamento en desarrollo o con ocasión del contrato celebrado.
        </Text>
      </View>
      <View style={styles.listContainer}>
        <Text style={styles.listItemNumber}>6.</Text>
        <Text style={[styles.contractText, styles.listItemText]}>
          Corregir los desajustes que pudieran presentarse y acordar los mecanismos y procedimiento pertinentes para atender las diferencias o situaciones litigiosas que llegaren a presentarse.
        </Text>
      </View>
      <View style={styles.listContainer}>
        <Text style={styles.listItemNumber}>7.</Text>
        <Text style={[styles.contractText, styles.listItemText]}>
          Cumplir y hacer cumplir las condiciones pactadas en el contrato y en los documentos que forman parte de él.
        </Text>
      </View>
      <View style={styles.listContainer}>
        <Text style={styles.listItemNumber}>8.</Text>
        <Text style={[styles.contractText, styles.listItemText]}>
          Ejercer supervisión general, real y eficaz del contrato.
        </Text>
      </View>
      <View style={styles.listContainer}>
        <Text style={styles.listItemNumber}>9.</Text>
        <Text style={[styles.contractText, styles.listItemText]}>
          Pagar oportunamente los honorarios pactados acorde a la cláusula de forma de pago, previa satisfacción de la certificación expedida por los supervisores en las obligaciones estipuladas a los contratistas.
        </Text>
      </View>
      <View style={styles.listContainer}>
        <Text style={styles.listItemNumber}>10.</Text>
        <Text style={[styles.contractText, styles.listItemText]}>
          Formular las sugerencias por escrito sobre los asuntos que estime convenientes en el desarrollo del contrato, sin perjuicio de la autonomía propia del contratista.
        </Text>
      </View>
      <View style={styles.listContainer}>
        <Text style={styles.listItemNumber}>11.</Text>
        <Text style={[styles.contractText, styles.listItemText]}>
          Liquidar el contrato.
        </Text>
      </View>
      <Text style={styles.contractText}>
        <Text style={styles.bold}>Cláusula 6 - Supervisión</Text>
      </Text>
      <View style={styles.separator} />
      <Text style={styles.contractText}>
        <Text style={styles.bold}>La supervisión será ejercida por la SECRETARIA DEDE SALUD de la Gobernación del Departamento del Cesar o por quien este designe. El supervisor deberá cumplir con las obligaciones previstas en el Manual de Interventoría del Departamento, quien tendrá las siguientes atribuciones para el caso: </Text>
      </Text>
      <View style={styles.listContainer}>
        <Text style={styles.listItemNumber}>1.</Text>
        <Text style={[styles.contractText, styles.listItemText]}>
          Suscribir el Acta de Inicio de Actividades y adjuntar a la plataforma SIRCC II y SECOP II, y así mismo proceder al inicio de la ejecución del contrato en SECOP II.
        </Text>
      </View>
      <Footer />
    </Page>
    <Page size="A4" style={styles.page} wrap>
      <Header values={values} />
      <View style={styles.separator} />
      <View style={styles.listContainer}>
        <Text style={styles.listItemNumber}>2.</Text>
        <Text style={[styles.contractText, styles.listItemText]}>
          Verificar previo a la iniciación de los contratos en SECOP II y a la suscripción del acta de inicio que el contratista se encuentre al día en el pago de sus obligaciones con los sistemas de salud, riesgos profesionales, pensiones y aportes a las Cajas de compensación Familiar, Instituto Colombiano de Bienestar Familiar y Servicio Nacional de Aprendizaje, cuando a ello haya lugar, lo cual deberá ser acreditado y verificado a través de los documentos de soporte publicados en el SECOP II.
        </Text>
      </View>
      <View style={styles.listContainer}>
        <Text style={styles.listItemNumber}>3.</Text>
        <Text style={[styles.contractText, styles.listItemText]}>
          Supervisar, verificar el cumplimiento y cabal desarrollo del contrato.
        </Text>
      </View>
      <View style={styles.listContainer}>
        <Text style={styles.listItemNumber}>4.</Text>
        <Text style={[styles.contractText, styles.listItemText]}>
          Expedir las certificaciones de cumplimiento parcial y/o total del contrato. Adicionalmente, deberá verificar y dejar constancia en tales certificaciones del pago de los aportes realizados por el Contratista al Sistema General de Seguridad Social Integral.
        </Text>
      </View>
      <View style={styles.listContainer}>
        <Text style={styles.listItemNumber}>5.</Text>
        <Text style={[styles.contractText, styles.listItemText]}>
          Disponer lo necesario para asegurar el cumplimiento de las obligaciones de los contratistas estipulados en el presente documento.
        </Text>
      </View>
      <View style={styles.listContainer}>
        <Text style={styles.listItemNumber}>6.</Text>
        <Text style={[styles.contractText, styles.listItemText]}>
        Autorizar gastos de viaje y alimentación del Contratista, dentro y fuera del Departamento, en los casos que sean necesarios para garantizar el cumplimiento del objeto el contrato y siempre y cuando verifique la existencia previa y suficiente de apropiación presupuestal y conforme a las disposiciones del Decreto 00210 de noviembre 9 de 2020.
        </Text>
      </View>
      <View style={styles.listContainer}>
        <Text style={styles.listItemNumber}>7.</Text>
        <Text style={[styles.contractText, styles.listItemText]}>
        Verificar que los contratistas que se les sea asignado viáticos concluyan con el proceso de legalización de los mismos en la oficina de contabilidad, en todo caso no deberá conceder un nuevo desplazamiento sin que se surta la anterior condición. 
        </Text>
      </View>
      <View style={styles.listContainer}>
        <Text style={styles.listItemNumber}>8.</Text>
        <Text style={[styles.contractText, styles.listItemText]}>
          Elaborar informes mensuales de verificación de cumplimiento de las actividades como requisitos para la realización del pago de honorarios respectivo.
        </Text>
      </View>
      <View style={styles.listContainer}>
        <Text style={styles.listItemNumber}>9.</Text>
        <Text style={[styles.contractText, styles.listItemText]}>
          Elaborar y tramitar el acta de liquidación del contrato dentro de los plazos establecidos en el mismo, así como el acta y/o cierre del expediente una vez expire la vigencia de los riesgos amparados en la garantía única, de acuerdo a lo establecido en el Decreto 1082 de 2015.
        </Text>
      </View>
      <View style={styles.listContainer}>
        <Text style={styles.listItemNumber}>10.</Text>
        <Text style={[styles.contractText, styles.listItemText]}>
          Informar a Secretaria General cualquier novedad que proceda de la ejecución del contrato.
        </Text>
      </View>
      <View style={styles.listContainer}>
        <Text style={styles.listItemNumber}>11.</Text>
        <Text style={[styles.contractText, styles.listItemText]}>
          Informar a la Oficina Asesora Jurídica cualquier circunstancia que haga temer por la cumplida y oportuna ejecución del contrato y sus actividades; brindar los informes y soportes y desarrollar las actividades necesarias en caso que se requiera adelantar proceso sancionatorio contractual.
        </Text>
      </View>
      <View style={styles.listContainer}>
        <Text style={styles.listItemNumber}>12.</Text>
        <Text style={[styles.contractText, styles.listItemText]}>
          Velar por el cumplimiento de la publicación oportuna en cada una de las plataformas de información (SECOP II, SIRCC II, entre otros,) de los documentos y actos relacionados del contrato y la actividad contractual a su cargo.
        </Text>
      </View>
      <Footer />
    </Page>
    <Page size="A4" style={styles.page} wrap>
      <Header values={values} />
      <View style={styles.separator} />
      <View style={styles.listContainer}>
        <Text style={styles.listItemNumber}>13.</Text>
        <Text style={[styles.contractText, styles.listItemText]}>
          Verificar, la realización de los aportes por parte del contratista al Sistema de Seguridad Social Integral al momento de su liquidación y dejar constancia del cumplimiento de las obligaciones de los contratistas frente a los aportes mencionados durante toda su vigencia. 
        </Text>
      </View>
      <Text style={styles.contractText}>
        <Text style={styles.bold}>Cláusula 7 – Confidencialidad</Text>
      </Text>
      <View style={styles.separator} />
      <Text style={styles.contractText}>
        <Text style={styles.bold}>
          Para el caso de que exista información sujeta a reserva legal, las partes deben mantener la confidencialidad de esta información. Para ello, la parte interesada debe comunicar a la otra parte que los datos suministrados tienen el carácter de confidencial</Text>
      </Text>
      <Text style={styles.contractText}>
        <Text style={styles.bold}>Cláusula 8 - Garantías</Text>
      </Text>
      <View style={styles.separator} />
      <Text style={styles.contractText}>
        <Text style={styles.bold}> 
          El Contratista se obliga a constituir a favor y satisfacción de El Departamento la garantía única de cumplimiento, expedida por una   compañía de seguros legalmente establecida en Colombia, fiducia mercantil en garantía o garantía bancaria a primer requerimiento, la cual amparará los riesgos descritos a continuación y con las siguientes condiciones:
        </Text>
      </Text>
      <View style={styles.listContainer}>
        <Text style={styles.listItemNumber}>1.</Text>
        <Text style={[styles.contractText, styles.listItemText]}>
          CUMPLIMIENTO DEL CONTRATO. Por el diez por ciento (10%) del valor del contrato, con una vigencia desde la fecha de la suscripción de contrato hasta su terminación y seis (6) meses más
        </Text>
      </View>
      <Text style={styles.contractText}>
        <Text style={styles.bold}> 
          Esta garantía deberá ser aprobada por el Departamento del Cesar.
        </Text>
      </Text>
      <Text style={styles.contractText}>
        <Text style={styles.bold}> 
          Parágrafo: El Contratista será responsable de mantener vigentes los amparos establecidos y de su ajuste al valor o vigencia en caso de que exista variación en el plazo de ejecución del contrato o en su valor, modificación que deberá contar con la aprobación por parte de El Departamento.
        </Text>
      </Text>
      <Text style={styles.contractText}>
        <Text style={styles.bold}>Cláusula 9 – Indemnidad</Text>
      </Text>
      <View style={styles.separator} />
      <Text style={styles.contractText}>
        <Text style={styles.bold}> 
          El Contratista se obliga a constituir a favor y satisfacción de El Departamento la garantía única de cumplimiento, expedida por una   compañía de seguros legalmente establecida en Colombia, fiducia mercantil en garantía o garantía bancaria a primer requerimiento, la cual amparará los riesgos descritos a continuación y con las siguientes condiciones:
        </Text>
      </Text>
      <Text style={[styles.contractText]}>
        Cualquier costo en que incurra el Departamento para la defensa de sus intereses o cualquier suma que deba cancelar como consecuencia de los reclamos previstas en esta cláusula, deberá ser reintegrada al Departamento en su totalidad debidamente actualizada.
      </Text>
      <Text style={styles.contractText}>
        <Text style={styles.bold}>Cláusula 10 – Cláusulas Excepcionales</Text>
      </Text>
      <View style={styles.separator} />
      <Text style={styles.contractText}>
        <Text style={styles.bold}> 
          En este contrato se entienden pactadas las Cláusulas excepcionales previstas en los artículos 14 a 18 de la ley 80 de 1993 y demás normas que regulen la materia.
        </Text>
      </Text>
      <Footer />
    </Page>
    <Page size="A4" style={styles.page} wrap>
      <Header values={values} />
      <View style={styles.separator} />
      <Text style={styles.contractText}>
        <Text style={styles.bold}>Cláusula 11 - Causales de terminación</Text>
      </Text>
      <View style={styles.separator} />
      <Text style={styles.contractText}>
        <Text style={styles.bold}> 
          Las partes acuerdas que son causales de terminación del contrato las siguientes: 
        </Text>
      </Text>
      <View style={styles.listContainer}>
        <Text style={styles.listItemNumber}>1.</Text>
        <Text style={[styles.contractText, styles.listItemText]}>
          Vencimiento del plazo del contrato. 
        </Text>
      </View>
      <View style={styles.listContainer}>
        <Text style={styles.listItemNumber}>2.</Text>
        <Text style={[styles.contractText, styles.listItemText]}>
          Terminación Anticipada: Las partes acuerdan que el presente contrato se terminará anticipadamente en los siguientes eventos: a. Cuando las exigencias del servicio público lo requieran o la situación de orden público lo imponga. b. Por cesación de pagos, concurso de acreedores o embargos judiciales del CONTRATISTA, que puedan afectar de manera grave el cumplimiento del contrato.
        </Text>
      </View>
      <View style={styles.listContainer}>
        <Text style={styles.listItemNumber}>3.</Text>
        <Text style={[styles.contractText, styles.listItemText]}>
          Terminación por mutuo acuerdo: Las partes en cualquier momento de la ejecución del plazo del contrato, podrán acordar de mutuo acuerdo dar por terminado el mismo.
        </Text>
      </View>
      <View style={styles.listContainer}>
        <Text style={styles.listItemNumber}>4.</Text>
        <Text style={[styles.contractText, styles.listItemText]}>
          Terminación por orden judicial. 
        </Text>
      </View>
      <View style={styles.listContainer}>
        <Text style={styles.listItemNumber}>5.</Text>
        <Text style={[styles.contractText, styles.listItemText]}>
          Terminación por acaecimiento de alguna de las condiciones resolutorias o por haber fallado alguna de las condiciones suspensivas.
        </Text>
      </View>
      <View style={styles.listContainer}>
        <Text style={styles.listItemNumber}>6.</Text>
        <Text style={[styles.contractText, styles.listItemText]}>
          Por las demás causas dispuestas en la ley.
        </Text>
      </View>
      <Text style={styles.contractText}>
        <Text style={styles.bold}> 
          PARÁGRAFO: Las partes acuerdan que el contrato se dará por terminado a partir de la fecha que señale la comunicación que se remita al CONTRATISTA por parte del DEPARTAMENTO.
        </Text>
      </Text>
      <Text style={styles.contractText}>
        <Text style={styles.bold}>Cláusula 12 – Multas por Incumplimiento</Text>
      </Text>
      <View style={styles.separator} />
      <Text style={styles.contractText}>
        <Text style={styles.bold}> 
          El Departamento podrá imponer a El Contratista multas sucesivas por cada día de mora en el incumplimiento de sus obligaciones de conformidad con lo establecido en el manual de procedimientos para la contratación del DEPARTAMENTO DEL CESAR.
        </Text>
      </Text>
      <Text style={styles.contractText}>
        <Text style={styles.bold}> 
          Parágrafo: para la imposición de multa y/o de la pena pecuniaria prevista en la cláusula siguiente, deberá surtirse el procedimiento establecido en la Ley y en todo caso, deberá respetarse el ejercicio del Derecho de Defensa por parte del Contratista.
        </Text>
      </Text>
      <Text style={styles.contractText}>
        <Text style={styles.bold}>Cláusula 13 – Cláusula Penal pecuniaria</Text>
      </Text>
      <View style={styles.separator} />
      <Text style={styles.contractText}>
        <Text style={styles.bold}> 
          El incumplimiento definitivo de cualquiera de las obligaciones contractuales previstas en el contrato, por parte de El Contratista, dará derecho a El Departamento exigir a título de indemnización anticipada de los perjuicios ocasionados con el incumplimiento, el pago de una suma equivalente al 10% del valor total del contrato. Lo anterior de conformidad con el artículo 17 de la Ley 1150 de 2007.
        </Text>
      </Text>
      <Footer />
    </Page>
    <Page size="A4" style={styles.page} wrap>
      <Header values={values} />
      <View style={styles.separator} />
      <Text style={styles.contractText}>
        <Text style={styles.bold}> 
          Parágrafo: El valor de la multa o de la pena pecuniaria impuesta a El Contratista, podrá ser tomado del saldo a su favor si los hubiere, de la garantía única de cumplimiento, o se podrá cobrar vía ejecutiva, para lo cual este documento presta mérito ejecutivo junto con los documentos constitutivos de indemnización por perjuicios y/o multa.
        </Text>
      </Text>
      <Text style={styles.contractText}>
        <Text style={styles.bold}>Cláusula 14 – Inhabilidades e incompatibilidades</Text>
      </Text>
      <View style={styles.separator} />
      <Text style={styles.contractText}>
        <Text style={styles.bold}> 
          El Contratista declara bajo gravedad de juramento, que se entiende prestado con la firma del contrato, no encontrarse incurso en ninguna de las causales de inhabilidad e incompatibilidad contempladas en el artículo 127 de la Constitución Política, los artículos 8 y 9 de la Ley 80 de 1993, los artículos 60 y 61 de la 610 de 2000, el artículo 18 de la Ley 1150 de 2007, y demás normas concordantes. En consecuencia, asumirá totalmente a su cargo, cualquier reclamación y pago de perjuicios que por esta causa promueva un tercero contra El Departamento o cualquiera de sus funcionarios o contratistas.
        </Text>
      </Text>
      <Text style={styles.contractText}>
        <Text style={styles.bold}>Cláusula 15 - Documentos del Contrato</Text>
      </Text>
      <View style={styles.separator} />
      <Text style={styles.contractText}>
        <Text style={styles.bold}> 
          Constituyen parte integral del presente Contrato, los siguientes documentos:
        </Text>
      </Text>
      <View style={styles.listContainer}>
        <Text style={styles.listItemNumber}>A.</Text>
        <Text style={[styles.contractText, styles.listItemText]}>
          Estudio Previo y sus anexos.
        </Text>
      </View>
      <View style={styles.listContainer}>
        <Text style={styles.listItemNumber}>B.</Text>
        <Text style={[styles.contractText, styles.listItemText]}>
          El Certificado de Disponibilidad Presupuestal
        </Text>
      </View>
      <View style={styles.listContainer}>
        <Text style={styles.listItemNumber}>C.</Text>
        <Text style={[styles.contractText, styles.listItemText]}>
          Los documentos presentados por El Contratista 
        </Text>
      </View>
      <View style={styles.listContainer}>
        <Text style={styles.listItemNumber}>D.</Text>
        <Text style={[styles.contractText, styles.listItemText]}>
          y los demás documentos que suscriban las partes en la etapa precontractual, contractual y post contractual.
        </Text>
      </View>
      <Text style={styles.contractText}>
        <Text style={styles.bold}>Cláusula 16 - Requisitos de perfeccionamiento y de Ejecución</Text>
      </Text>
      <View style={styles.separator} />
      <Text style={styles.contractText}>
        <Text style={styles.bold}> 
          El contrato se entiende perfeccionado con la firma de las partes; y para su ejecución se requiere la expedición del respectivo registro presupuestal, la aprobación de la garantía única exigida, presentación de la constancia de encontrarse a paz y salvo en los pagos de aportes al sistema de seguridad social integral, presentación del recibo de pago de los impuestos, estampillas y otras contribuciones establecidas. Para el pago de la cuenta y/o factura deberá acreditarse el cumplimiento de los aportes al Sistema de Seguridad Social Integral.
        </Text>
      </Text>
      <Text style={styles.contractText}>
        <Text style={styles.bold}>Cláusula 17 - Cesión</Text>
      </Text>
      <View style={styles.separator} />
      <Text style={styles.contractText}>
        <Text style={styles.bold}> 
          EL CONTRATISTA no podrá ceder ni subcontratar las obligaciones derivadas del contrato, salvo con expresa autorización de El Departamento. En el segundo caso, será responsable por el cumplimiento de la totalidad de las obligaciones derivadas del Contrato
        </Text>
      </Text>
      <Footer />
    </Page>
    <Page size="A4" style={styles.page} wrap>
      <Header values={values} />
      <View style={styles.separator} />
      <Text style={styles.contractText}>
        <Text style={styles.bold}>Cláusula 18 – Terminación, Modificación e interpretación unilateral y de caducidad</Text>
      </Text>
      <View style={styles.separator} />
      <Text style={styles.contractText}>
        <Text style={styles.bold}> 
          El Departamento podrá hacer uso de las cláusulas excepcionales de terminación, modificación, e interpretaciones unilaterales, y de caducidad del contrato con sujeción a lo previsto en los artículos 15, 16, 17 y 18 de la Ley 80 de 1993. 
        </Text>
      </Text>
      <Text style={styles.contractText}>
        <Text style={styles.bold}>Cláusula 19 - Declaraciones</Text>
      </Text>
      <View style={styles.separator} />
      <Text style={styles.contractText}>
        <Text style={styles.bold}> 
          Las partes declaran que conocen, comprende y aceptan todas y cada una de las estipulaciones contenidas en el contrato y los demás documentos que forman parte integral del mismo, cuya interpretación se sustentará en el principio de autonomía de la voluntad de las partes con fundamento en el artículo 1602 del código civil colombiano.
        </Text>
      </Text>
      <Text style={styles.contractText}>
        <Text style={styles.bold}>Cláusula 20 – Constancias</Text>
      </Text>
      <View style={styles.separator} />
      <Text style={styles.contractText}>
        <Text style={styles.bold}> 
        Con base en lo estipulado en el Artículo 2.2.1.2.1.4.9. del Decreto 1082 de 2015, el Ordenador del Gasto deja constancia escrita que el Departamento del Cesar verificó la idoneidad o experiencia requerida al contratista, lo anterior, según las certificaciones anexas al contrato, emitidas por el Líder del Programa de Gestión Humana y el jefe de la Sectorial que Origina la Necesidad. 
        </Text>
      </Text>
      <Text style={styles.contractText}>
        <Text style={styles.bold}>Cláusula 21 - Notificaciones</Text>
      </Text>
      <View style={styles.separator} />
      <Text style={styles.contractText}>
        <Text style={styles.bold}> 
        Los avisos, solicitudes, comunicaciones y notificaciones que las partes deban hacer en virtud de la relación contractual constarán por escrito y se entenderán debidamente efectuadas sólo si son entregadas personalmente o por correo electrónico a la persona y a las direcciones indicadas a continuación:
        </Text>
      </Text>
      <View style={[styles.table, {marginTop: 0}]}>
        <View style={styles.tableRow}>
          <Text style={[styles.tableCell, styles.tableCellLeft]}>Por parte de El Departamento:</Text>
          <Text style={[styles.tableCell, styles.tableCellRight]}>Dirección: Calle 16 # 12 – 120 Edificio Alfonso López Michelsen - Secretaría General 2do Piso en la Ciudad de Valledupar – Cesar. Correo electrónico: contratos.general@cesar.gov.co – general@cesar.gov.co Teléfono: 5748230 Ext 225</Text>
        </View>
        <Text style={styles.contractText}>
          <View style={styles.tableRow}>
            <Text style={[styles.tableCell, styles.tableCellLeft]}>A El Contratista:</Text>
            <Text style={[styles.tableCell, styles.tableCellRight]}>Dirección: ROSARIO NORTE II MANZANA B -CASA 25 Teléfono: 3218344756</Text>
          </View>
        </Text>
      </View>
      <Footer />
    </Page>
  </Document>
    );
  };

  return (
    <Box pt={{ base: '130px', md: '80px', xl: '80px' }}>
    <Card
      direction='column'
      w='100%'
      px='0px'
      overflowX={{ sm: "scroll", lg: "hidden" }}
    >
      <Stack spacing={3} px="25px" pb="25px">
        <Text
          color="secondaryGray.900"
          fontSize="22px"
          fontWeight="700"
          lineHeight="100%"
        >
          
          Registro de Contratos
        </Text>

        <Formik
          initialValues={{
            procesoCodigo: '',
            fechaContrato: '',
            nombreContratista: '',
            documentoContratista: '',
            nit: '',
            objeto: '',
            valorContrato: '',
            plazo: ''
          }}
          validationSchema={Yup.object({
            // Agrega las validaciones necesarias usando Yup
          })}
          onSubmit={async (values, actions) => {
            try {
              await axios.post('/api/contratos', values);
              actions.resetForm();
              toast({
                title: 'Contrato registrado.',
                description: 'El contrato ha sido registrado correctamente.',
                status: 'success',
                duration: 5000,
                isClosable: true,
              });
            } catch (error) {
              console.error('Error submitting data:', error);
              toast({
                title: 'Error en el registro.',
                description: 'Ocurrió un error al registrar el contrato.',
                status: 'error',
                duration: 5000,
                isClosable: true,
              });
            }
          }}
        >
          {formik => (
            <Form>
              <FormControl id="procesoCodigo" isRequired>
                <FormLabel>Número del Proceso</FormLabel>
                <Field name="procesoCodigo" as={Input} borderRadius="25px" />
              </FormControl>

              <FormControl id="fechaContrato" isRequired>
                <FormLabel>Número del Contrato</FormLabel>
                <Field name="fechaContrato" as={Input} borderRadius="25px" />
              </FormControl>

              <FormControl id="nombreContratista" isRequired>
                <FormLabel>Nombre del Contratista</FormLabel>
                <Field name="nombreContratista" as={Input} borderRadius="25px" />
              </FormControl>

              <FormControl id="documentoContratista" isRequired>
                <FormLabel>Identificación del Contratista</FormLabel>
                <Field name="documentoContratista" as={Input} borderRadius="25px" />
              </FormControl>

              <FormControl id="nit" isRequired>
                <FormLabel>NIT</FormLabel>
                <Field name="nit" as={Input} borderRadius="25px" />
              </FormControl>

              <FormControl id="objeto" isRequired>
                <FormLabel>Objeto</FormLabel>
                <Field name="objeto" as={Textarea} borderRadius="25px" />
              </FormControl>

              <FormControl id="valorContrato" isRequired>
                <FormLabel>Valor del Contrato</FormLabel>
                <Field name="valorContrato" as={Input} borderRadius="25px" />
              </FormControl>

              <FormControl id="plazo" isRequired>
                <FormLabel>Plazo (días)</FormLabel>
                <Field name="plazo" as={Input} type="number" borderRadius="25px" />
              </FormControl>

              <Button mt={4} colorScheme="blue" type="submit" size="lg" margin='25px'>
                Guardar Contrato
              </Button>

              <Button mt={4} colorScheme="teal" type="submit" size="lg" variant='outline' margin='25px' >
                <PDFDownloadLink
                  document={<ContratoPDF values={formik.values} />}
                  fileName="contrato.pdf"
                >
                  {({ loading }) => (loading ? 'Generando PDF...' : 'Descargar PDF')}
                </PDFDownloadLink>
              </Button>
            </Form>
          )}
        </Formik>
      </Stack>
    </Card>
  </Box>
);
};

export default ContratosForm;