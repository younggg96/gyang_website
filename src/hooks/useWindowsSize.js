import { useState, useEffect } from "react";

const SETTING = {
  sm: "640",
  md: "768",
  lg: "1024",
  xl: "1280",
};

const useWindowsSize = () => {
  const [windowsSize, setWindowsSize] = useState("");

  const checkWindowsSize = () => {
    const width = window.innerWidth;
    let currentSize = "";

    if (width < parseInt(SETTING.sm)) {
      currentSize = "sm";
    } else if (width >= parseInt(SETTING.sm) && width < parseInt(SETTING.md)) {
      currentSize = "md";
    } else if (width >= parseInt(SETTING.md) && width < parseInt(SETTING.lg)) {
      currentSize = "lg";
    } else if (width >= parseInt(SETTING.lg)) {
      currentSize = "xl";
    }

    setWindowsSize(currentSize);
  };

  useEffect(() => {
    checkWindowsSize();
    window.addEventListener("resize", checkWindowsSize);

    return () => {
      window.removeEventListener("resize", checkWindowsSize);
    };
  }, []); // Empty dependency array to run the effect only once on mount

  return windowsSize;
};

export default useWindowsSize;
