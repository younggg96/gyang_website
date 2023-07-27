import React from "react";
import { useForm } from "react-hook-form";
import { PwdInput } from "./AuthInput";
import { TIME, TYPE, useToast } from "../../ui/GyToast/ToastProvider";
import { useRequest } from "ahooks";

import { postReset } from "../../api/auth";
import "./index.scss";

const ResetPwd = ({ userInfo }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const { addToast } = useToast();

  const { run, loading } = useRequest(postReset, {
    manual: true,
    onBefore: () => {
      addToast({
        content: "Updating your password, wait...",
        time: TIME.SHORT,
        type: TYPE.INFO,
      });
    },
    onSuccess: (res, data) => {
      if (res.data.pwdUpdated) {
        addToast({
          content: "Update succeeded!",
          time: TIME.SHORT,
          type: TYPE.SUCCESS,
        });
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
    run(data, userInfo.email);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="auth-form-content">
      <h1 className="title">Hi, {userInfo.username}</h1>
      <section>
        <PwdInput
          placeholder="Old Password *"
          form={register("old_password", {
            required: "Old Password is required.",
          })}
        />
        {errors.old_password && (
          <p className="error-msg">{errors.old_password.message}</p>
        )}
      </section>
      <section>
        <PwdInput
          placeholder="New Password *"
          form={register("new_password", {
            required: "New Password is required.",
          })}
        />
        {errors.new_password && (
          <p className="error-msg">{errors.new_password.message}</p>
        )}
      </section>
      <button type="submit" disabled={loading} className="submit-btn">
        {loading ? "Loading..." : "Update"}
      </button>
    </form>
  );
};

export default ResetPwd;
