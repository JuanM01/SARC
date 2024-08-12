import { Box, Flex, Stack, Button } from "@chakra-ui/react";
import Brand from "components/sidebar/components/Brand";
import Links from "components/sidebar/components/Links";
import SidebarCard from "components/sidebar/components/SidebarCard";
import { HSeparator } from "components/separator/Separator";
import { NavLink, useHistory } from "react-router-dom";
import React from "react";
import Cookies from "js-cookie";

function SidebarContent(props) {
  const { routes } = props;
  const history = useHistory();

  // Filtrar rutas para excluir la ruta de cerrar sesión
  const mainRoutes = routes.filter((route) => route.name !== "cerrar sesion");

  // Encontrar la ruta de cerrar sesión
  const logoutRoute = routes.find((route) => route.name === "cerrar sesion");

  const handleLogout = () => {
    // Eliminar cookies
    Cookies.remove("token"); // Ajusta el nombre de la cookie según sea necesario
    Cookies.remove("username");
    Cookies.remove("password");
    // Redirigir al inicio de sesión
    history.push("/auth/sign-in");
  };

  return (
    <Flex direction="column" height="100%" pt="25px" px="16px" borderRadius="30px">
      <Brand />
      <Stack direction="column" mb="auto" mt="8px">
        <Box ps="20px" pe={{ md: "16px", "2xl": "1px" }}>
          <Links routes={mainRoutes} />
        </Box>
      </Stack>

      <Box mt="auto" mb="40px" borderRadius="30px">
        <HSeparator />
        <SidebarCard />
        {logoutRoute && (
          <Box mt="20px" textAlign="center">
            <Button
              leftIcon={logoutRoute.icon}
              colorScheme="gray"
              variant="solid"
              width="100%"
              onClick={handleLogout}
            >
              {logoutRoute.name}
            </Button>
          </Box>
        )}
      </Box>
    </Flex>
  );
}

export default SidebarContent;
