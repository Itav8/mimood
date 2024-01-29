import React from "react";
import { ChakraProvider } from "@chakra-ui/react";
import ReactDOM from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import { router } from "./routes/routes";
import { CookiesProvider } from "react-cookie";
import { extendTheme } from "@chakra-ui/react";
import { ButtonTheme } from "./theme/ButtonTheme";

const config = {
  useSystemColorMode: true,
  initialColorMode: "dark",
};

const components = {
  Link: {
    baseStyle: {
      padding: "10px",
      color: "orange.700",
      _hover: {
        transform: "scale(1.05, 1.05)",
        fontWeight: "semibold",
        textDecorationStyle: "wavy",
        _dark: {},
      },
    },
  },
  Button: ButtonTheme,
  Heading: {
    baseStyle: {
      color: 'orange.700'
    }
  }
};

const theme = extendTheme({
  config,
  components,
  fonts: {
    body: "Inter, system-ui, Avenir, Helvetica, Arial, sans-serif",
    heading: "Inter, system-ui, Avenir, Helvetica, Arial, sans-serif",
    mono: "Inter, system-ui, Avenir, Helvetica, Arial, sans-serif",
  },
});

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <CookiesProvider>
      <ChakraProvider theme={theme}>
        <RouterProvider router={router} />
      </ChakraProvider>
    </CookiesProvider>
  </React.StrictMode>
);
