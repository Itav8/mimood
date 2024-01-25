import React from "react";
import { ChakraProvider } from "@chakra-ui/react";
import ReactDOM from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import { router } from "./routes/routes";
import { CookiesProvider } from "react-cookie";

// import "./index.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ChakraProvider>
      <CookiesProvider>
        <RouterProvider router={router} />
      </CookiesProvider>
    </ChakraProvider>
  </React.StrictMode>
);
