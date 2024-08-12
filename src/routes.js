import React from "react";
import { CalendarIcon} from '@chakra-ui/icons'
import { Icon } from "@chakra-ui/react";
import { EditIcon } from '@chakra-ui/icons'
import {
  MdBarChart,
  MdPerson,
  MdHome,
  MdLock,
  MdOutlineShoppingCart,
  MdCalendarMonth,
} from "react-icons/md";

// Admin Imports
import MainDashboard from "views/admin/default";
import DevDashboard from "views/desarrollador/default";
import Register from "views/admin/register";
import Empresa from "views/admin/empresa";
import Secretaria from "views/admin/secretaria";
import Oficina from "views/admin/oficina";
import CargarDocumentos from "views/admin/doc/CargarDocumentos";
import VerDocumentos from "views/admin/doc/VerDocumentos";
import FormPlanCompra from "views/admin/plancompra/formplancompra";
import SolicitudesVista from "views/admin/plancompra/verplancompra";
import SolicitudDetalle from "views/admin/plancompra/resumenplan";

// Auth Imports
import SignInCentered from "views/auth/signIn";
import { IoMdDocument, IoMdGitBranch, IoMdHome } from "react-icons/io";
import Contratosconsul from './views/admin/contratos/consultaContratos';
import ProcurementForm from './views/admin/contratos/crearContratos';

const routes = [
  {
    name: "Inicio",
    layout: "/admin",
    path: "/default",
    icon: <Icon as={MdHome} width='20px' height='20px' color='inherit' />,
    component: MainDashboard,
  },
  {
    name: "Inicio",
    layout: "/desarrollador",
    path: "/default",
    icon: <Icon as={MdHome} width='20px' height='20px' color='inherit' />,
    component: DevDashboard,
  },
  {
    name: "Registro de Empresa",
    layout: "/admin",
    icon: <Icon as={IoMdDocument} width='20px' height='20px' color='inherit' />,
    path: "/empresa",
    component: Empresa,
  },
  {
    name: "Registro de Secretaria",
    layout: "/admin",
    icon: <Icon as={IoMdGitBranch} width='20px' height='20px' color='inherit' />,
    path: "/secretaria",
    component: Secretaria,
  },
  {
    name: "Registro de Oficina",
    layout: "/admin",
    icon: <Icon as={IoMdGitBranch} width='20px' height='20px' color='inherit' />,
    path: "/oficina",
    component: Oficina,
  },
  {
    name: "Registro de Personal",
    layout: "/admin",
    path: "/register",
    icon: <Icon as={EditIcon} width='20px' height='20px' color='inherit' />,
    component: Register,
  },
  {
    name: "Cargar Documentos",
    layout: "/admin",
    path: "/cargar-documentos",
    icon: <Icon as={IoMdDocument} width='20px' height='20px' color='inherit' />,
    component: CargarDocumentos,
  },
  {
    name: "Ver Documentos",
    layout: "/admin",
    path: "/ver-documentos",
    icon: <Icon as={IoMdDocument} width='20px' height='20px' color='inherit' />,
    component: VerDocumentos,
  },
  {
    name: "Plan de compra",
    layout: "/admin",
    path: "/plan-compra",
    icon: <Icon as={IoMdDocument} width='20px' height='20px' color='inherit' />,
    component: FormPlanCompra,
  },
  {
    name: "Ver plan de compra",
    layout: "/admin",
    path: "/ver-plan",
    icon: <Icon as={IoMdDocument} width='20px' height='20px' color='inherit' />,
    component: SolicitudesVista,
  },
  {
    name: "planes detallados",
    layout: "/admin",
    path: "/planes",
    icon: <Icon as={IoMdDocument} width='20px' height='20px' color='inherit' />,
    component: SolicitudDetalle,
  },
  {
    name: "consulta contratos",
    layout: "/admin",
    path: "/consulcontratos",
    icon: <Icon as={IoMdDocument} width='20px' height='20px' color='inherit' />,
    component: Contratosconsul,
  },
  {
    name: "formulario contratos",
    layout: "/admin",
    path: "/contratos",
    icon: <Icon as={IoMdDocument} width='20px' height='20px' color='inherit' />,
    component: ProcurementForm,
  },
  {
    name: "Cerrar Sesion",
    layout: "/auth",
    path: "/sign-in",
    icon: <Icon as={MdLock} width='20px' height='20px' color='inherit' />,
    component: SignInCentered,
  },
  
  // {
  //   name: "Registro",
  //   layout: "/register",
  //   path: "/register-default",
  //   icon: <Icon as={MdHome} width='20px' height='20px' color='inherit' />,
  //   component: Register,
  // },
];

export default routes;
