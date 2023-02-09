import React from "react";
import { useParams } from "react-router-dom";
// import components
import GyBodySection from "../ui/GyBodySection/GyBodySection";
import ArticleDetails from "../components/article/ArticleDetails";
// scss
import "./style/article-page.scss";

const ArticlePage = () => {
  let params = useParams();
  const articleId = params.id;

  return (
    <GyBodySection>
      <div className="article-page-section">
        <section className="left-section">
          <ArticleDetails articleId={articleId} />
        </section>
        <section className="right-section">right</section>
      </div>
    </GyBodySection>
  );
};

export default ArticlePage;
