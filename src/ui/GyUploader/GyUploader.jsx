import React from "react";
import "./index.scss";
import classNames from "classnames";

import image_upload from "../../assets/ui/image_upload.svg";

const GyUploader = ({ children, className, ...props }) => {
  return (
    <label
      htmlFor="dropzone-file"
      className={classNames(["gy-uploader", className])}
      {...props}
    >
      <input
        id="dropzone-file"
        type="file"
        name="img"
        accept="image/*"
        className=" hidden"
      />
      <img src={image_upload} alt="image_upload" />
      <p className="uploader-header">
        <span className="font-semibold">Click to upload</span> or drag and drop
      </p>
      <p className="uploader-header-sm">
        SVG, PNG, JPG or GIF (MAX. 800x400px)
      </p>
    </label>
  );
};

export default GyUploader;
