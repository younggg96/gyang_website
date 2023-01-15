import React from "react";
import { useForm } from "react-hook-form";
import { EmailInput } from "./AuthInput";
import { TIME, TYPE, useToast } from "../../ui/GyToast/ToastProvider";
import { post } from "../../api/axios";
import { useRequest } from "ahooks";

const ForgetPwd = ({ handleCheck }) => {
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
  const postCheck = (data) => post("/auth/check", data);
  const { run, loading } = useRequest(postCheck, {
    manual: true,
    onBefore: () => {
      addToast({
        content: "Check your email, wait...",
        time: TIME.SHORT,
        type: TYPE.INFO,
      });
    },
    onSuccess: (res, data) => {
      const {userExist, ...userInfo} = res.data;
      if (userExist) {
        addToast({
          content: "Account exists, reset your password...",
          time: TIME.SHORT,
          type: TYPE.SUCCESS,
        });
        handleCheck(userInfo);
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
  const onSubmit = (data) => {
    run(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <h1 className="title mb-6">Find your account</h1>
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
      <button type="submit" disabled={loading} className="submit-btn my-2">
        {loading ? "Loading..." : "Check"}
      </button>
    </form>
  );
};

export default ForgetPwd;
