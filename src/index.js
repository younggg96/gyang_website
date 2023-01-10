import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
// import cursor context provider
import CursorProvider from "./context/CursorContext";
import ToastProvider from "./ui/GyToast/ToastProvider";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <CursorProvider>
    <ToastProvider>
      <React.StrictMode>
        <App />
      </React.StrictMode>
    </ToastProvider>
  </CursorProvider>
);
