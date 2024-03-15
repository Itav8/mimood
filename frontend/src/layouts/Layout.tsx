import { Outlet } from "react-router-dom";
import { NavBar } from "../components/Nav/Navbar";
import { useCookies } from "react-cookie";
import { Button, Flex, IconButton, useColorMode } from "@chakra-ui/react";
import { MoonIcon } from "@chakra-ui/icons";
import { useState, useEffect } from "react";

export const Layout = () => {
  const [cookies] = useCookies(["jwtToken"]);
  const { toggleColorMode } = useColorMode();
  const [notificationGranted, setNotificationGranted] = useState(false);

  const askNotificationPermission = () => {
    // a promise that is returned
    // libabry built in the browser
    Notification.requestPermission().then((permission) => {
      if (permission === "granted") {
        const notification = new Notification("Reminder Test", {
          body: "You have a new message!",
          data: { hello: "world" },
        });
        setNotificationGranted(true);

        // notification.addEventListener("show", () => {
        //   console.log("notification shown");
        // })
        console.log(notification);
        // notification.addEventListener("close", e => {
        //   console.log(e)
        // })
      }
    });
  };

  useEffect(() => {
    if (!notificationGranted) return;

    const test = new Notification("Reminderjiji Test", {
      body: "You have a new message!",
      data: { hello: "world" },
    });
    console.log(test);
  }, [notificationGranted]);

  return (
    <>
      {cookies.jwtToken ? (
        <>
          <NavBar />
          <Button onClick={() => askNotificationPermission()}>PERM</Button>
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
