import React, { useState } from "react";
import "./index.scss";
import classNames from "classnames";
import { BsImage, BsCloudUploadFill } from "react-icons/bs";
import { useRequest } from "ahooks";
import { uploadImgs } from "../../api/upload";
import GyButton from "../GyButton/GyButton";
import PropTypes from "prop-types";
import { TIME, TYPE, useToast } from "../GyToast/ToastProvider";
import { colors } from "../../config";
import { RiDeleteBinLine } from "react-icons/ri";

const byteToMegaByte = (bytes) => {
  return bytes / 1048576 < 1
    ? `${(bytes / 1024).toFixed(2)} KB`
    : `${(bytes / 1048576).toFixed(2)} MB`;
};

export const MAX_UPLOAD_IMG_NUM = 9;

export const GyUploaderPrevier = ({ fileList, fileRemove }) => {
  const GyUploaderPrevierItem = ({ item, index }) => {
    const [hovered, setHovered] = useState(false);
    return (
      <div
        className="uploader-preview__content__item"
        key={index}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        <img
          className="uploader-preview__content__item__img"
          alt={`${item.name} preview img`}
          src={item.url}
        />
        {!!hovered && (
          <>
            <div className="uploader-preview__content__item__overlap"></div>
            <GyButton
              className="uploader-preview__content__item__del"
              type="button"
              variant="iconOnly"
              onClick={() => fileRemove(item)}
            >
              <RiDeleteBinLine color={"#000"} />
              <span className="sr-only">Delete img</span>
            </GyButton>
          </>
        )}
      </div>
    );
  };
  return (
    <div className="uploader-preview">
      <div className="uploader-preview__content">
        {fileList.map((item, index) => (
          <GyUploaderPrevierItem item={item} index={index} />
        ))}
      </div>
    </div>
  );
};

const GyUploader = ({
  children,
  className,
  onFileChange = () => {},
  type = "single",
  preview = false,
  hasError = false,
  errorMsg = "",
  ...props
}) => {
  const [dragging, setDragging] = useState(false);
  const [fileList, setFileList] = useState([]);

  const { addToast } = useToast();

  const handleDrop = (e) => {
    e.preventDefault();
    setDragging(false);
    const files = [...e.dataTransfer.files];
    addFiles(files);
  };

  const handleDragEnter = (e) => {
    e.preventDefault();
    setDragging(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setDragging(false);
  };

  const addFiles = (files) => {
    const fileArray = [];
    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      const reader = new FileReader();
      reader.onload = () => {
        const fileType = reader.result.split(";")[0].split(":")[1];
        if (fileType === "image/jpeg" || fileType === "image/png") {
          fileArray.push({
            file,
            url: reader.result,
            name: file.name,
            size: file.size,
          });
          if (fileArray.length === files.length) {
            setFileList([...fileList, ...fileArray]);
            onFileChange(
              type === "single" ? [fileArray[0]] : [...fileList, ...fileArray]
            );
          }
        } else {
          addToast({
            content: "Invalid file format. Please upload a PNG or JPG image.",
            time: TIME.SHORT,
            type: TYPE.ERROR,
          });
          return;
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const fileRemove = (file) => {
    const updatedList = [...fileList];
    updatedList.splice(fileList.indexOf(file), 1);
    setFileList(updatedList);
    onFileChange(updatedList);
  };

  const { error, loading, run } = useRequest(uploadImgs, {
    manual: true,
    onSuccess: (result) => {},
  });

  return (
    <>
      <div
        className={classNames([
          "gy-uploader",
          { dragging: dragging },
          className,
        ])}
        {...props}
      >
        {type === "single" && !!fileList.length ? (
          <div className="relative w-full">
            <img
              className="rounded-md w-full h-80 object-cover"
              alt={`${fileList[0].name} preview img`}
              src={fileList[0].url}
            />
            <div className="text-center mb-2">
              <p>{fileList[0].name}</p>
              <p className="text-xs text-gray-400">
                {byteToMegaByte(fileList[0].size)}
              </p>
            </div>
            <GyButton
              type="button"
              variant="iconOnly"
              icon={() => <RiDeleteBinLine />}
              onClick={() => fileRemove(fileList[0])}
              className="absolute top-4 right-4"
            ></GyButton>
          </div>
        ) : (
          <>
            <input
              multiple={type === "multiple"}
              type="file"
              className="gy-uploader__input"
              accept="image/*"
              onChange={(e) => addFiles([...e.target.files])}
              onDragEnter={handleDragEnter}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
            />
            <div className="gy-uploader__content">
              <div className="gy-uploader__content__img">
                {dragging ? (
                  <BsImage className="icon active" />
                ) : (
                  <BsCloudUploadFill className="icon" />
                )}
              </div>
              <p className="gy-uploader__content__header">
                {dragging ? (
                  <span className="font-semibold">Drop the image file...</span>
                ) : (
                  <>
                    <span className="font-semibold">Click to upload</span> or
                    drag and drop
                  </>
                )}
              </p>
              <p className="gy-uploader__content__header-sm">
                SVG, PNG, JPG or GIF (MAX. 800x400px)
              </p>
            </div>
          </>
        )}
      </div>
      {hasError && <p className="error-msg">{errorMsg}</p>}
      {!!fileList.length && type === "multiple" && preview && (
        <GyUploaderPrevier fileList={fileList} fileRemove={fileRemove} />
      )}
    </>
  );
};

GyUploader.prototype = {
  type: PropTypes.oneOf(["single", "multiple"]).isRequired,
  preview: PropTypes.bool.isRequired,
  onFileChange: PropTypes.func.isRequired,
};

export default GyUploader;
