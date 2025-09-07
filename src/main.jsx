import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import "./index.css";
import { ToastContainer } from "react-toastify";

const root = createRoot(document.getElementById("root"));

root.render(
  <StrictMode>
    <App />
    <ToastContainer theme="dark" pauseOnHover={false} autoClose={2500} />
  </StrictMode>
);
