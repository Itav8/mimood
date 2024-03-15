import { Outlet } from "react-router-dom";
import { NavBar } from "../components/Nav/Navbar";
import { useCookies } from "react-cookie";
import { Flex, IconButton, useColorMode } from "@chakra-ui/react";
import { MoonIcon } from "@chakra-ui/icons";

export const Layout = () => {
  const [cookies] = useCookies(["jwtToken"]);
  const { toggleColorMode } = useColorMode();

  // const notification = new Notifation(title, {})

  // const askNotificationPermission = () => {
  //   Notification.requestPermission((permission) => {
  //     if (permission === "granted") {
  //       new Notification("Reminder");
  //     }
  //   });
  // };

  return (
    <>
      {cookies.jwtToken ? (
        <>
          <NavBar />
          {/* {askNotificationPermission()} */}
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
