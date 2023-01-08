import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { BsEye, BsEyeSlash } from "react-icons/bs";

export const PwdInput = ({ form, placeholder }) => {
  const [showPwd, setShowPwd] = useState(false);

  const show = (event) => {
    setShowPwd(event);
  };
  return (
    <div className="relative">
      <input
        className="input pr-10"
        type={showPwd ? "text" : "password"}
        name="pwd"
        placeholder={placeholder}
        {...form}
      />

      {showPwd ? (
        <button type="button" onClick={() => show(false)}>
          <BsEye className="show-eye-icon" />
        </button>
      ) : (
        <button type="button" onClick={() => show(true)}>
          <BsEyeSlash className="show-eye-icon" />
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

const Signin = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    alert(JSON.stringify(data));
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <h1 className="title mb-6">Sign in</h1>
      <section className="mb-2">
        <EmailInput
          form={register("email", {
            required: "Email is required.",
            pattern: {
              value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
              message: "invalid email address",
            },
          })}
        />
        {errors.email && <p className="error-msg">{errors.email.message}</p>}
      </section>
      <section className="mb-2">
        <PwdInput
          placeholder="Password *"
          form={register("password", { required: "Password is required." })}
        />
        {errors.password && <p className="error-msg">{errors.email.message}</p>}
      </section>
      <button type="submit" className="submit-btn my-2">
        Sign In
      </button>
    </form>
  );
};

export default Signin;
