import React, { useEffect, useState } from "react";
import "./index.scss";
import classNames from "classnames";
import GyPopup from "../GyPopup";
import { FiChevronDown, FiChevronUp } from "react-icons/fi";
import GyCard from "../GyCard/GyCard";

const init = [
  { title: "option1", id: "1" },
  { title: "option2", id: "2" },
  { title: "option3", id: "3" },
  { title: "option4", id: "4" },
  { title: "option5", id: "5" },
  { title: "option5", id: "6" },
  { title: "option5", id: "7" },
  { title: "option5", id: "8" },
  { title: "option5", id: "9" },
];

const GySelector = ({
  children,
  options = init,
  onSelect,
  multiple = true,
  opened = false,
  title = "",
  placeHolder = "Select...",
  hasError = false,
  errorMsg = "",
  ...props
}) => {
  const [openOptions, setOpenOptions] = useState(opened);
  const [selectedItem, setSelectedItem] = useState([]);

  useEffect(() => {
    onSelect(selectedItem);
  }, [selectedItem]);

  const handleOpenOptions = () => {
    !openOptions && setOpenOptions(true);
  };

  const handleChooseItem = (item) => {
    setSelectedItem(item);
  };

  const hasDuplicateValue = (arr, item) =>
    arr.some((prevItem) => prevItem.id === item.id);

  const handleChooseMultipleItem = (item) => {
    setSelectedItem((prev) => {
      if (hasDuplicateValue(prev, item)) {
        const data = prev.filter((o) => o.id !== item.id);
        return data;
      } else {
        return [...prev, item];
      }
    });
  };

  return (
    <div className={classNames(["gy-selector"])} {...props}>
      <p className="gy-selector__title">{title}</p>
      <GyCard className="selected-item" onClick={() => handleOpenOptions()}>
        {!!!selectedItem.length ? (
          <span className="selected-item__placeholder">{placeHolder}</span>
        ) : (
          <>
            {!multiple ? (
              <span className="selected-item__text">
                {selectedItem[0].title}
              </span>
            ) : (
              <span className="selected-item__text">
                {selectedItem.map((item, index) => (
                  <span key={index}>
                    {item.title}
                    {index !== selectedItem.length - 1 && <>, </>}
                  </span>
                ))}
              </span>
            )}
          </>
        )}
        <div className="selected-item__icon">
          {openOptions ? <FiChevronUp /> : <FiChevronDown />}
        </div>
      </GyCard>
      {hasError && <p className="error-msg">{errorMsg}</p>}
      <GyPopup
        className="gy-selector-popup"
        open={openOptions}
        setOpen={setOpenOptions}
      >
        {!multiple ? (
          <div className="options-wapper">
            {options.map((item, index) => {
              return (
                <div
                  className="option"
                  key={`${item.title}-${index}`}
                  onClick={() => {
                    handleChooseItem([item]);
                    setOpenOptions(false);
                  }}
                >
                  {item.title}
                </div>
              );
            })}
          </div>
        ) : (
          <div className="options-wapper">
            {options.map((item, index) => {
              return (
                <div
                  className="option option-multiple"
                  key={`${item.id}-${index}`}
                >
                  <input
                    type="checkbox"
                    className="form-checkbox"
                    id={`${item.id}-${index}`}
                    checked={hasDuplicateValue(selectedItem, item)}
                    onChange={() => handleChooseMultipleItem(item)}
                  />
                  <label htmlFor={`${item.id}-${index}`}>{item.title}</label>
                </div>
              );
            })}
          </div>
        )}
      </GyPopup>
    </div>
  );
};

export default GySelector;
