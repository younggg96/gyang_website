import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
// import cursor context provider
// import CursorProvider from "./context/CursorContext";
import ToastProvider from "./ui/GyToast/ToastProvider";
import { AuthProvider } from "./context/AuthContext";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  // <CursorProvider>
    <ToastProvider>
      <AuthProvider>
        {/* <React.StrictMode> */}
          <App />
        {/* </React.StrictMode> */}
      </AuthProvider>
    </ToastProvider>
  // </CursorProvider>
);
