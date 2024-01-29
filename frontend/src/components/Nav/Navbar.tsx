import { authRoutes } from "../../routes/routes";
import { Stack, useColorMode, Link, IconButton } from "@chakra-ui/react";
import { MoonIcon } from "@chakra-ui/icons";

export const NavBar = () => {
  const { toggleColorMode } = useColorMode();

  return (
    <Stack
      mb="30px"
      direction={{ base: "column", md: "row" }}
      alignItems="center"
      justifyContent={{ base: "initial", md: "space-between" }}
    >
      <Stack
        direction={{ base: "column", md: "row" }}
        alignItems="center"
        gap={5}
      >
        <Link href="/">Home</Link>
        {authRoutes.map((route) => {
          return (
            <Link className="navbar__link" key={route.path} href={route.path}>
              {route.name}
            </Link>
          );
        })}
      </Stack>
      <IconButton
        aria-label="theme"
        icon={<MoonIcon />}
        onClick={toggleColorMode}
        mr="10px"
      />
    </Stack>
  );
};
