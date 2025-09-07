import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { AppContextProvider } from "./context/appContext.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <AppContextProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <App />
    </AppContextProvider>
  </StrictMode>,
);
