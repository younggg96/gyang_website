import React, { useState } from "react";
import "./index.scss";
import classNames from "classnames";
import GyPopup from "../GyPopup";
import { FiChevronDown } from "react-icons/fi";
import GyCard from "../GyCard/GyCard";

const init = [
  { name: "option1", value: "1" },
  { name: "option2", value: "2" },
  { name: "option3", value: "3" },
  { name: "option4", value: "4" },
  { name: "option5", value: "5" },
  { name: "option5", value: "6" },
  { name: "option5", value: "7" },
  { name: "option5", value: "8" },
  { name: "option5", value: "9" },
];

const GySelector = ({
  children,
  options = init,
  onSelect,
  multiple = true,
  opened = false,
  title = "Select...",
  ...props
}) => {
  const [openOptions, setOpenOptions] = useState(opened);
  const [selectedItem, setSelectedItem] = useState([]);

  const handleOpenOptions = () => {
    !openOptions && setOpenOptions(true);
  };

  const handleChooseItem = (item) => {
    setSelectedItem([item]);
  };

  const hasDuplicateValue = (arr, item) =>
    arr.some((prevItem) => prevItem.value === item.value);

  const handleChooseMultipleItem = (item) => {
    setSelectedItem((prev) => {
      if (hasDuplicateValue(prev, item)) {
        return prev.filter((o) => o.value !== item.value);
      } else {
        return [...prev, item];
      }
    });
  };

  return (
    <div className={classNames(["gy-selector"])} {...props}>
      <p className="gy-selector__title title">{title}</p>
      <GyCard className="selected-item" onClick={() => handleOpenOptions()}>
        {!!!selectedItem.length ? (
          <span className="selected-item__placeholder">Select...</span>
        ) : (
          <>
            {!multiple ? (
              <span className="selected-item__text">
                {selectedItem[0].name}
              </span>
            ) : (
              <span className="selected-item__text">
                {selectedItem.map((item, index) => (
                  <span key={index}>
                    {item.name}
                    {index !== selectedItem.length - 1 && <>, </>}
                  </span>
                ))}
              </span>
            )}
          </>
        )}
        <div className="selected-item__icon">
          <FiChevronDown />
        </div>
      </GyCard>
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
                  key={`${item.value}-${index}`}
                  onClick={() => handleChooseItem(item.value)}
                >
                  {item.name}
                </div>
              );
            })}
          </div>
        ) : (
          <div className="options-wapper">
            {options.map((item, index) => {
              return (
                <div className="option-multiple" key={`${item.value}-${index}`}>
                  <input
                    type="checkbox"
                    className="form-checkbox"
                    id={`${item.value}-${index}`}
                    checked={hasDuplicateValue(selectedItem, item)}
                    onChange={() => handleChooseMultipleItem(item)}
                  />
                  <label htmlFor={`${item.value}-${index}`}>{item.name}</label>
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
