import React from "react";
import { useForm } from "react-hook-form";
import { post } from "../../api/axios";
import { TIME, TYPE, useToast } from "../../ui/GyToast/ToastProvider";
import { useRequest } from "ahooks";
import { EmailInput, PwdInput } from "./AuthInput";

const Signin = ({ children }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const { addToast } = useToast();
  /**
   *
   * @param {object} data form info object
   * @returns axios http request promise
   */
  const postSignin = (data) => post("/auth/login", data);

  const { run, loading } = useRequest(postSignin, {
    manual: true,
    onBefore: () => {
      addToast({
        content: "Sign in, wait...",
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
    run(data);
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
              message: "Invalid email address",
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
        {errors.password && (
          <p className="error-msg">{errors.password.message}</p>
        )}
      </section>
      {/* forget pwd section */}
      {children}
      <button type="submit" disabled={loading} className="submit-btn my-2">
        {loading ? "Loading..." : "Sign In"}
      </button>
    </form>
  );
};

export default Signin;
