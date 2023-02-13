import React from "react";
import classNames from "classnames";
// import icons
import { FaFacebook, FaLinkedin, FaGithub } from "react-icons/fa";

import "./index.scss";

const GySocialBtn = ({ url, icon }) => {
  return (
    <a href={"https://" + url} target="_blank" rel="noopener noreferrer">
      {icon()}
    </a>
  );
};

const GySocial = ({ data, className, ...props }) => {
  return (
    <div className={classNames("gy-social", className)} {...props}>
      {data["github"] && (
        <GySocialBtn url={data["github"]} icon={() => <FaGithub />} />
      )}
      {data["linkedin"] && (
        <GySocialBtn url={data["github"]} icon={() => <FaLinkedin />} />
      )}
      {data["facebook"] && (
        <GySocialBtn url={data["github"]} icon={() => <FaFacebook />} />
      )}
    </div>
  );
};

export default GySocial;
