import React, { useState } from "react";
import GyBodySection from "../ui/GyBodySection/GyBodySection";
import Error from "../components/error/Error";

const ErrorPage = () => {
  return (
    <GyBodySection>
      <Error
        content={{ title: "The page you are looking for isn’t here..." }}
        type="404"
      />
    </GyBodySection>
  );
};

export default ErrorPage;
