import React, { useState } from "react";
import GyBodySection from "../../ui/GyBodySection/GyBodySection";
import "../style/error.scss";
// imgs
import error404 from "../../assets/errors/error404.svg";

const ErrorPage = () => {
  return (
    <GyBodySection>
      <div className="error-section">
        <div className="error-img">
          <img src={error404} alt="error-404" />
          <p className="title">The page you are looking for isn’t here...</p>
        </div>
      </div>
    </GyBodySection>
  );
};

export default ErrorPage;
