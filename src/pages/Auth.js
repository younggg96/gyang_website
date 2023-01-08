import React, { useState } from "react";
// import motion
import { motion } from "framer-motion";
// import transition
import { transition } from "../helper/animation";
import Signin from "../components/auth/Signin";
import Signup from "../components/auth/Signup";

const Auth = () => {
  const [type, setType] = useState("signin");

  return (
    <>
      <motion.section
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={transition}
        className="mx-auto h-[calc(100vh-100px)] flex justify-center items-center rounded-sm bg-gray-50 shadow-md"
      >
        {type === "signin" && (
          <div className="auth-form">
            <Signin />
            <p
              className="underline cursor-pointer"
              onClick={() => setType("signup")}
            >
              Or create a new account?
            </p>
          </div>
        )}
        {type === "signup" && (
          <div className="auth-form">
            <Signup />
            <p
              className="underline cursor-pointer"
              onClick={() => setType("signin")}
            >
              Having an account?
            </p>
          </div>
        )}
      </motion.section>
    </>
  );
};

export default Auth;
