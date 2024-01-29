import React from "react";
import { ChakraProvider } from "@chakra-ui/react";
import ReactDOM from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import { router } from "./routes/routes";
import { CookiesProvider } from "react-cookie";
import { extendTheme } from "@chakra-ui/react";

import type { ComponentStyleConfig } from "@chakra-ui/theme";

// You can also use the more specific type for
// a single part component: ComponentSingleStyleConfig
const Button: ComponentStyleConfig = {
  // The styles all button have in common
  baseStyle: {
    fontWeight: "bold",
    textTransform: "uppercase",
    borderRadius: "base", // <-- border radius is same for all variants and sizes
  },
  // Two sizes: sm and md
  sizes: {
    sm: {
      fontSize: "sm",
      px: 4, // <-- px is short for paddingLeft and paddingRight
      py: 3, // <-- py is short for paddingTop and paddingBottom
    },
    md: {
      fontSize: "md",
      px: 6, // <-- these values are tokens from the design system
      py: 4, // <-- these values are tokens from the design system
    },
  },
  // Two variants: outline and solid
  variants: {
    outline: {
      border: "2px solid",
      borderColor: "orange.700",
      color: "orange.700",
      _hover: {
        transform: "scale(1.05, 1.05)",
        backgroundColor: "orange.50",
      },
    },
    solid: {
      bg: "orange.700",
      color: "white",
      _hover: {
        transform: "scale(1.05, 1.05)",
        backgroundColor: "orange.600",
      },
    },
  },
  // The default size and variant values
  defaultProps: {
    size: "md",
    variant: "outline",
  },
};

// example theme
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
  Button,
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
