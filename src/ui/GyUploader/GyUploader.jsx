import React, { useState } from "react";
import "./index.scss";
import classNames from "classnames";
import { BsImage, BsCloudUploadFill } from "react-icons/bs";
import { AiFillDelete } from "react-icons/ai";
import { useRequest } from "ahooks";
import { uploadImgs } from "../../api/upload";
import { colors } from "../../config";
import GyButton from "../GyButton/GyButton";
import PropTypes from "prop-types";

const byteToMegaByte = (bytes) => {
  return bytes / 1048576 < 1
    ? `${(bytes / 1024).toFixed(2)} KB`
    : `${(bytes / 1048576).toFixed(2)} MB`;
};

const GyUploader = ({
  children,
  className,
  onFileChange = () => {},
  type = "single",
  ...props
}) => {
  const [dragging, setDragging] = useState(false);
  const [fileList, setFileList] = useState([]);

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
        fileArray.push({
          file,
          url: reader.result,
          name: file.name,
          size: file.size,
        });
        if (fileArray.length === files.length) {
          setFileList([...fileList, ...fileArray]);
          onFileChange(
            type === "single" ? fileArray[0] : [...fileList, ...fileArray]
          );
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
          <div className="flex flex-col items-center gap-2">
            <img
              className="rounded-md w-96 h-80 object-cover"
              alt={`${fileList[0].name} preview img`}
              src={fileList[0].url}
            />
            <div className="text-center mb-2">
              <p>{fileList[0].name}</p>
              <p className="text-xs text-gray-400">
                {byteToMegaByte(fileList[0].size)}
              </p>
            </div>
            <div className="flex gap-2">
              <GyButton type="button" icon={() => <AiFillDelete />}>
                <span>Upload image</span>
              </GyButton>
              <GyButton
                type="button"
                icon={() => <AiFillDelete />}
                onClick={() => fileRemove(fileList[0])}
              >
                <span>Delete image</span>
              </GyButton>
            </div>
          </div>
        ) : (
          <>
            <input
              multiple={type === "mutiple"}
              type="file"
              className="gy-uploader__input"
              onChange={(e) => addFiles([...e.target.files])}
              onDragEnter={handleDragEnter}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
            />
            <div className="gy-uploader__content">
              <div className="gy-uploader__content__img">
                {dragging ? (
                  <BsImage
                    className="w-[80px] h-[80px]"
                    style={{ color: colors.primary }}
                  />
                ) : (
                  <BsCloudUploadFill className="w-[80px] h-[80px]" />
                )}
              </div>
              <p className="gy-uploader__content__header">
                <span className="font-semibold">Click to upload</span> or drag
                and drop
              </p>
              <p className="gy-uploader__content__header-sm">
                SVG, PNG, JPG or GIF (MAX. 800x400px)
              </p>
            </div>
          </>
        )}
      </div>
      {!!fileList.length && type === "mutiple" && (
        <div className="uploader-preview">
          <p className="uploader-preview__title">Ready to upload</p>
          <div className="uploader-preview__content">
            {fileList.map((item, index) => (
              <div className="uploader-preview__content__item" key={index}>
                <img
                  className="uploader-preview__content__item__img"
                  alt={`${item.name} preview img`}
                  src={item.url}
                />
                <div className="uploader-preview__content__item__info">
                  <p>{item.name}</p>
                  <p className="text-xs text-gray-400">
                    {byteToMegaByte(item.size)}
                  </p>
                </div>
                <GyButton
                  className="uploader-preview__content__item__del"
                  type="button"
                  size={["sm", "round"]}
                  onClick={() => fileRemove(item)}
                >
                  <AiFillDelete />
                  <span className="sr-only">Delete img</span>
                </GyButton>
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  );
};

GyUploader.prototype = {
  type: PropTypes.oneOf(["single", "mutiple"]).isRequired,
  onFileChange: PropTypes.func.isRequired,
};

export default GyUploader;
