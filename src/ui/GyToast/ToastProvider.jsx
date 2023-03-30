import { createContext, useContext, useMemo } from "react";
import { useCallback } from "react";
import { useState } from "react";
import ToastContainer from "./ToastContainer";

const ToastContext = createContext(null);

const TIME = {
  SHORT: 3000,
  LONG: 6000,
};

const TYPE = {
  SUCCESS: "success",
  INFO: "info",
  WARNING: "warning",
  ERROR: "error",
};

let id = 1;

const MyChildren = ({ Childcomponent }) => {
  return <>{Childcomponent}</>;
};

const ToastProvider = ({ children }) => {
  const [toasts, setToasts] = useState([]);

  const childComponent = useMemo(
    () => <ToastContainer toasts={toasts} />,
    [toasts]
  );

  const addToast = useCallback(
    ({ content, time, type }) => {
      setToasts((toasts) => [
        ...toasts,
        {
          id: id++,
          content,
          time,
          type,
        },
      ]);
    },
    [setToasts]
  );

  const removeToast = useCallback(
    (id) => {
      setToasts((toasts) => toasts.filter((t) => t.id !== id));
    },
    [setToasts]
  );

  return (
    <ToastContext.Provider
      value={{
        addToast,
        removeToast,
      }}
    >
      {childComponent}
      {/* <ToastContainer toasts={toasts} /> */}
      {children}
    </ToastContext.Provider>
  );
};

// hook
const useToast = () => {
  const toastHelpers = useContext(ToastContext);
  return toastHelpers;
};

export { ToastContext, useToast, TIME, TYPE };
export default ToastProvider;
