import React from "react";
import { Link } from "react-router-dom";

import "./index.scss";

const Categories = ({ categories }) => {
  if (categories?.length) {
    return (
      <div className="article-categories">
        {categories?.map((cate) => {
          return (
            <Link className="item" key={cate.id}>
              {cate.title}
            </Link>
          );
        })}
      </div>
    );
  } else {
    return <></>;
  }
};

export default Categories;
