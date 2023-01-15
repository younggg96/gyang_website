import React, { useState } from "react";
// import motion
import { motion } from "framer-motion";
// import transition
import { transition } from "../helper/animation";
import Signup from "../components/auth/Signup";
import Signin from "../components/auth/Signin";
import ForgetPwd from "../components/auth/ForgetPwd";
// import icon
import { BiArrowBack } from "react-icons/bi";
import ResetPwd from "../components/auth/ResetPwd";

const Auth = () => {
  const [type, setType] = useState("signin");
  const [userInfo, setUserInfo] = useState("");
  const handleCheck = (user) => {
    setType("resetPwd");
    setUserInfo(user);
  };

  return (
    <motion.section
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 10 }}
      transition={transition}
      className="section mx-auto h-[calc(100vh-100px)] flex justify-center items-center rounded-sm"
    >
      {type === "signin" && (
        <div className="auth-form">
          <Signin>
            <p className="flex mb-2">
              <span
                className="link ml-auto"
                onClick={() => setType("forgetPwd")}
              >
                Forget an account?
              </span>
            </p>
          </Signin>
          <span className="link" onClick={() => setType("signup")}>
            Or create a new account?
          </span>
        </div>
      )}
      {type === "signup" && (
        <div className="auth-form">
          <Signup />
          <span className="link" onClick={() => setType("signin")}>
            Having an account?
          </span>
        </div>
      )}
      {type === "forgetPwd" && (
        <div className="auth-form">
          <span
            className="link flex items-center mb-6 w-fit"
            onClick={() => setType("signin")}
          >
            <BiArrowBack className="mr-2" />
            Back to signin
          </span>
          <ForgetPwd handleCheck={handleCheck} />
        </div>
      )}
      {type === "resetPwd" && (
        <div className="auth-form">
          <span
            className="link flex items-center mb-6 w-fit"
            onClick={() => setType("signin")}
          >
            <BiArrowBack className="mr-2" />
            Back to signin
          </span>
          <ResetPwd userInfo={userInfo} />
        </div>
      )}
    </motion.section>
  );
};

export default Auth;
