import React from "react";
import { useForm } from "react-hook-form";
import { EmailInput, NormalInput, PwdInput } from "./Signin";
import { TIME, TYPE, useToast } from "../../ui/GyToast/ToastProvider";
import { post } from "../../api/axios";

const Signup = () => {
  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm();
  const { addToast } = useToast();

  const signin = (data) => {
    post("/auth/login", data)
      .then((res) => {
        if (res.data) {
          addToast({
            content: "Signin success, welcome...",
            time: TIME.SHORT,
            type: TYPE.SUCCESS,
          });
        }
      })
      .catch((errs) => {
        for (const value of Object.values(errs.response.data)) {
          addToast({
            content: `${value}`,
            time: TIME.SHORT,
            type: TYPE.ERROR,
          });
        }
      });
  };

  const onSubmit = (data) => {
    addToast({
      content: "Sign up, wait...",
      time: TIME.SHORT,
      type: TYPE.INFO,
    });
    post("/auth/register", data)
      .then((res) => {
        if (res.data) {
          addToast({
            content: "Your account has been successfully created...",
            time: TIME.SHORT,
            type: TYPE.SUCCESS,
          });
          setTimeout(() => {
            addToast({
              content: "Sign in now, wait...",
              time: TIME.SHORT,
              type: TYPE.INFO,
            });
            signin({ email: data.email, password: data.password });
          }, 500);
        }
      })
      .catch((errs) => {
        for (const value of Object.values(errs.response.data)) {
          addToast({
            content: `${value}`,
            time: TIME.SHORT,
            type: TYPE.ERROR,
          });
        }
      });
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
          form={register("password_confirm", {
            required: "Please confirm your password.",
            validate: (value) =>
              value === getValues("password") ||
              "Password confirmation does not match.",
          })}
        />
        {errors.password_confirm && (
          <p className="error-msg">{errors.password_confirm.message}</p>
        )}
      </section>
      <button type="submit" className="submit-btn my-2">
        Sign Up
      </button>
    </form>
  );
};

export default Signup;
