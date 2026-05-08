import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Toaster } from "react-hot-toast";
import App from "./App.jsx";
import { AppProviders } from "./components/providers.jsx";
import "./index.css";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AppProviders>
      <App />
      <Toaster position="top-right" toastOptions={{ className: "text-sm" }} />
    </AppProviders>
  </StrictMode>,
);
