import React from "react";

// imgs
import no_data from "../../assets/empty/no_data.svg";

// style
import "./index.scss";

const EmptyData = ({ content, type = "no_data" }) => {
  let url = null;
  switch (type) {
    case "no_data":
      url = no_data;
      break;
    default:
      break;
  }

  return (
    <div className="empty-section">
      <div className="empty-img">
        <img src={url} alt={type} />
        <p className="title">{content.title}</p>
        <p className="sub-title">{content.sub}</p>
      </div>
    </div>
  );
};

export default EmptyData;
