import React, { useState } from "react";
// import components
import GyBodySection from "../ui/GyBodySection/GyBodySection";
// scss
import "./style/article-page.scss";

const ArticlePage = () => {
  return (
    <GyBodySection>
      <div className="article-page-section">
        <section className="left-section">
          left
        </section>
        <section className="right-section">
          right
        </section>
      </div>
    </GyBodySection>
  );
};

export default ArticlePage;
