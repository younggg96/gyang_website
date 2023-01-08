import React from "react";
import { useForm } from "react-hook-form";
import { EmailInput, NormalInput, PwdInput } from "./Signin";

const Signup = () => {
  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    alert(JSON.stringify(data));
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <h1 className="title mb-6">Sign Up</h1>
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
        <NormalInput
          form={register("username", { required: "Username is required." })}
          type="text"
          category="username"
          required
        />
        {errors.username && (
          <p className="error-msg">{errors.username.message}</p>
        )}
      </section>
      <section className="mb-2">
        <PwdInput
          placeholder="Password *"
          form={register("password", { required: "Password is required." })}
        />
        {/* getValues("test") */}
        {errors.password && <p className="error-msg">{errors.email.message}</p>}
      </section>
      <section className="mb-2">
        <PwdInput
          placeholder="Password confirmation *"
          form={register("password_comfirm", {
            required: "Please confirm your password.",
            validate: (value) =>
              value === getValues("password") ||
              "Password confirmation does not match.",
          })}
        />
        {errors.password_comfirm && (
          <p className="error-msg">{errors.password_comfirm.message}</p>
        )}
      </section>
      <button type="submit" className="submit-btn my-2">
        Sign Up
      </button>
    </form>
  );
};

export default Signup;
