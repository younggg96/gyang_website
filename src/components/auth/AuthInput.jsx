import { useState } from "react";
import { BsEye, BsEyeSlash } from "react-icons/bs";

import "./index.scss";

export const PwdInput = ({ form, placeholder }) => {
  const [showPwd, setShowPwd] = useState(false);

  const show = (event) => {
    setShowPwd(event);
  };

  return (
    <div className="pwd-input">
      <input
        className="input"
        type={showPwd ? "text" : "password"}
        name="pwd"
        placeholder={placeholder}
        {...form}
      />
      {showPwd ? (
        <button onClick={() => show(false)} className="eye-btn" type="button">
          <BsEye />
        </button>
      ) : (
        <button onClick={() => show(true)} className="eye-btn" type="button">
          <BsEyeSlash />
        </button>
      )}
    </div>
  );
};

export const EmailInput = ({ form }) => {
  return (
    <input
      className="input"
      type="text"
      name="email"
      placeholder="Email *"
      {...form}
    />
  );
};

export const NormalInput = ({ form, type, category, required }) => {
  const cateStr = `${category[0].toUpperCase()}${category
    .slice(1)
    .toLowerCase()}`;
  return (
    <input
      className="input"
      type={type}
      name={category}
      placeholder={required ? `${cateStr} *` : cateStr}
      {...form}
    />
  );
};
