import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
// import components
import GyBodySection from "../ui/GyBodySection/GyBodySection";
import ArticleDetails from "../components/article/ArticleDetails";
// scss
import "./style/index.scss";
import GyCard from "../ui/GyCard/GyCard";
import UserHeader from "../components/user/UserHeader";
import { useRequest } from "ahooks";
import { getArticleByArticleId } from "../api";
import UserProfile from "../components/profile/UserProfile";
import GyLoader from "../ui/GyLoader/GyLoader";
import Error from "../components/error/Error";

const ArticlePage = () => {
  let params = useParams();
  const articleId = params.id;
  const [articleDetail, setArticleDetail] = useState();
  const { error, loading, run } = useRequest(getArticleByArticleId, {
    manual: true,
    onSuccess: (result) => {
      setArticleDetail(result?.data);
    },
  });
  useEffect(() => {
    run(articleId);
  }, [articleId, run]);

  return (
    <GyBodySection>
      {error && (
        <Error
          content={{
            title: "The Article doesn’t exist...",
            sub: "Please check your URL or return to home.",
          }}
          type="error_no_found"
        ></Error>
      )}
      {loading && (
        <div className="page-loading">
          <GyLoader />
        </div>
      )}
      {!loading && articleDetail && (
        <div className="page-section">
          <section className="left-section">
            <ArticleDetails data={articleDetail} loading={loading} />
          </section>
          <section className="right-section">
            <div className="sticky-side">
              <GyCard title="Author">
                <UserHeader user={articleDetail?.user} />
                <UserProfile.UserProfile
                  userEmail={articleDetail?.user?.email}
                />
              </GyCard>
            </div>
          </section>
        </div>
      )}
    </GyBodySection>
  );
};

export default ArticlePage;
