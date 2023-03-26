import React from "react";
import GyBodySection from "../ui/GyBodySection/GyBodySection";
import EditorArticle from "../components/editor/EditorArticle";

const NewArticlePage = () => {
  return (
    <GyBodySection>
      <div className="page-section">
        <section className="left-section">
          <EditorArticle />
        </section>
        <section className="right-section"></section>
      </div>
    </GyBodySection>
  );
};

export default NewArticlePage;
