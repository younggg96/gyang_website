import { createPortal } from "react-dom";
import Toast from "./Toast";

const ToastContainer = ({ toasts }) => {
  return createPortal(
    <div className="fixed right-0 bottom-0 flex flex-col items-end">
      {toasts.map((item) => {
        return (
          <Toast id={item.id} key={item.id} time={item.time} type={item.type}>
            {item.content}
          </Toast>
        );
      })}
    </div>,
    document.body
  );
};

export default ToastContainer;
