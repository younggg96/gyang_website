import React, { useEffect, useRef } from "react";
import Masonry, { ResponsiveMasonry } from "react-responsive-masonry";
import "./index.scss";

const GyMasonryLayout = ({ items, children }) => {
  return (
    <div className="gy-masonry-layout">
      <ResponsiveMasonry columnsCountBreakPoints={{ 350: 2, 750: 3 }}>
        <Masonry gutter="1rem">{children}</Masonry>
      </ResponsiveMasonry>
    </div>
  );
};

export default GyMasonryLayout;
