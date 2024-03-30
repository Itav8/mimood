import { Outlet } from "react-router-dom";
import { NavBar } from "../components/Nav/Navbar";
import { useCookies } from "react-cookie";
import { Avatar, Flex, IconButton, useColorMode } from "@chakra-ui/react";
import { MoonIcon } from "@chakra-ui/icons";

export const Layout = () => {
  const [cookies] = useCookies(["jwtToken"]);
  console.log(cookies.jwtToken);
  console.log("Cookies", cookies);
  const { toggleColorMode } = useColorMode();

  const askNotificationPermission = () => {
    Notification.requestPermission().then((permission) => {
      if (permission === "granted") {
        new Notification("Reminder", {
          body: "Don't forget to log!",
          tag: "Welcome Reminder",
        });
      }
    });
  };

  return (
    <>
      {cookies.jwtToken ? (
        <>
          {askNotificationPermission()}

          <NavBar />
        </>
      ) : (
        <Flex justifyContent="flex-end">
          <IconButton
            aria-label="theme"
            icon={<MoonIcon />}
            onClick={toggleColorMode}
            mr="10px"
            mt="10px"
          />
        </Flex>
      )}

      <div>
        <Outlet />
      </div>
    </>
  );
};
