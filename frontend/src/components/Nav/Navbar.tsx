import { authRoutes } from "../../routes/routes";
import {
  Stack,
  useColorMode,
  Link,
  IconButton,
  useDisclosure,
  Drawer,
  DrawerOverlay,
  DrawerContent,
  DrawerBody,
  Button,
} from "@chakra-ui/react";
import { HamburgerIcon, MoonIcon } from "@chakra-ui/icons";
import { useCookies } from "react-cookie";

export const NavBar = () => {
  const [cookies] = useCookies(["jwtToken"]);
  const { toggleColorMode } = useColorMode();
  const { isOpen, onOpen, onClose } = useDisclosure();

  const handleLogout = (
    token: React.MouseEventHandler<HTMLButtonElement> | string
  ) => {
    if (token) {
      /* empty */
    }
  };

  return (
    <Stack
      mb="30px"
      direction={{ base: "row", md: "row", sm: "row" }}
      alignItems="center"
      justifyContent={{
        base: "space-between",
        md: "space-between",
        sm: "space-between",
      }}
    >
      <IconButton
        mt="10px"
        ml={{ base: "10px", sm: "10px" }}
        mr="10px"
        onClick={onOpen}
        aria-label="theme"
        display={{ base: "block", sm: "block", md: "none" }}
        icon={<HamburgerIcon />}
      />
      <Drawer placement="top" onClose={onClose} isOpen={isOpen}>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerBody>
            <Stack direction="column" alignItems="center" gap={5}>
              <Link href="/">Home</Link>
              {authRoutes.map((route) => {
                return (
                  <Link
                    className="navbar__link"
                    key={route.path}
                    href={route.path}
                  >
                    {route.name}
                  </Link>
                );
              })}
            </Stack>
          </DrawerBody>
        </DrawerContent>
      </Drawer>

      <Stack
        display={{ base: "none", sm: "none", md: "block" }}
        direction={{ base: "column", md: "row" }}
        alignItems="center"
        gap={5}
      >
        {cookies ? (
          <Button
            ml={2}
            size={"xs"}
            onClick={() => handleLogout(cookies.jwtToken)}
          >
            Logout
          </Button>
        ) : (
          <Link href="/">Home</Link>
        )}

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
        mt="10px"
      />
    </Stack>
  );
};
