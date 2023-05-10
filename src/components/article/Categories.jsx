import React from "react";
import { Link } from "react-router-dom";

import "./index.scss";

const Categories = ({ categories }) => {
  return (
    <>
      {!!categories?.length && (
        <div className="article-categories">
          {categories?.slice(0, 3).map((cate) => {
            return (
              <Link className="item" key={cate.id}>
                {cate.title}
              </Link>
            );
          })}
          {!!(categories?.length - 3 > 0) && (
            <span className="item more">{categories?.length - 3}+ more</span>
          )}
        </div>
      )}
    </>
  );
};

export default Categories;
