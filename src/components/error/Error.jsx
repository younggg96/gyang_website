import React from "react";

// imgs
import error404 from "../../assets/imgs/errors/error404.svg";
import error_no_found from "../../assets/imgs/errors/error_no_found.svg";

// style
import "./index.scss";
import GyButton from "../../ui/GyButton/GyButton";
import { Link } from "react-router-dom";

const Error = ({ content, type = "404" }) => {
  let url = null;
  switch (type) {
    case "404":
      url = error404;
      break;
    case "error_no_found":
      url = error_no_found;
      break;
    default:
      break;
  }

  return (
    <div className="error-section">
      <div className="error-img">
        <img src={url} alt="error-404" />
        <p className="title">{content.title}</p>
        <p className="sub-title">{content.sub}</p>
        <GyButton size={["sm", "round"]}>
          <Link to="/">Back to Home</Link>
        </GyButton>
      </div>
    </div>
  );
};

export default Error;
