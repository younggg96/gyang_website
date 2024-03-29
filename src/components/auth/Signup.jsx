import React from "react";
import { useForm } from "react-hook-form";
import { EmailInput, NormalInput, PwdInput } from "./AuthInput";
import { TIME, TYPE, useToast } from "../../ui/GyToast/ToastProvider";
import { useRequest } from "ahooks";
import useAuth from "../../hooks/useAuth";
import { useNavigate } from "react-router-dom";
import { post } from "../../api/axios";

import "./index.scss";

const Signup = () => {
  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm();
  const { addToast } = useToast();
  const { login } = useAuth();
  const navigate = useNavigate();

  const sininUseRequest = useRequest(post, {
    manual: true,
    onBefore: () => {
      addToast({
        content: "Sign in with new account, wait...",
        time: TIME.SHORT,
        type: TYPE.INFO,
      });
    },
    onSuccess: (res, data) => {
      addToast({
        content: "Signin success, welcome...",
        time: TIME.SHORT,
        type: TYPE.SUCCESS,
      });
      const { token, user } = res.data;
      login(token, user);
      navigate("/");
    },
    onError: (errs) => {
      if (errs.response.status === 404) {
        addToast({
          content: `${errs.response.statusText} (404)`,
          time: TIME.SHORT,
          type: TYPE.ERROR,
        });
        return;
      }
      for (const value of Object.values(errs.response.data)) {
        addToast({
          content: `${value}`,
          time: TIME.SHORT,
          type: TYPE.ERROR,
        });
      }
    },
  });

  const sinupUseRequest = useRequest(post, {
    manual: true,
    onBefore: () => {
      addToast({
        content: "Sign up, wait...",
        time: TIME.SHORT,
        type: TYPE.INFO,
      });
    },
    onSuccess: (res, data) => {
      if (res.data) {
        addToast({
          content: "Your account has been successfully created...",
          time: TIME.SHORT,
          type: TYPE.SUCCESS,
        });
        setTimeout(() => {
          sininUseRequest.run("/auth/login", data[1]);
        }, 500);
      }
    },
    onError: (errs) => {
      if (errs.response.status === 404) {
        addToast({
          content: `${errs.response.statusText} (404)`,
          time: TIME.SHORT,
          type: TYPE.ERROR,
        });
        return;
      }
      for (const value of Object.values(errs.response.data)) {
        addToast({
          content: `${value}`,
          time: TIME.SHORT,
          type: TYPE.ERROR,
        });
      }
    },
  });

  /**
   * submit form
   * @param {object} data form info object
   */
  const onSubmit = (data) => {
    sinupUseRequest.run("/auth/register", data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="auth-form-content">
      <h1 className="title">Sign Up</h1>
      <section>
        <EmailInput
          form={register("email", {
            required: "Email is required.",
            pattern: {
              value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
              message: "Invalid email address",
            },
          })}
        />
        {errors.email && <p className="error-msg">{errors.email.message}</p>}
      </section>
      <section>
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
      <section>
        <PwdInput
          placeholder="Password *"
          form={register("password", { required: "Password is required." })}
        />
        {errors.password && (
          <p className="error-msg">{errors.password.message}</p>
        )}
      </section>
      <section>
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
      <button
        type="submit"
        disabled={sinupUseRequest.loading || sininUseRequest.loading}
        className="submit-btn"
      >
        {sinupUseRequest.loading || sininUseRequest.loading
          ? "Loading..."
          : "Sign Up"}
      </button>
    </form>
  );
};

export default Signup;
