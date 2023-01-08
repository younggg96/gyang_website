import React, { useState } from "react";
// import motion
import { motion } from "framer-motion";
// import transition
import { transition } from "../helper/animation";
import Signup from "../components/auth/Signup";
import Signin from "../components/auth/Signin"

const Auth = () => {
  const [type, setType] = useState("signin");

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
  );
};

export default Auth;
