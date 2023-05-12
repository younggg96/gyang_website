import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
// ui
import GyCard from "../ui/GyCard/GyCard";
import GyLoader from "../ui/GyLoader/GyLoader";
import GyBodySection from "../ui/GyBodySection/GyBodySection";
// import components
import Error from "../components/error/Error";
import UserHeader from "../components/user/UserHeader";
import UserProfile from "../components/profile/UserProfile";
import ArticleDetails from "../components/article/ArticleDetails";
// scss
import "./style/index.scss";
// hooks
import useAuth from "../hooks/useAuth";
import { useRequest, useUpdateLayoutEffect } from "ahooks";
// apis
import { getArticleByArticleId } from "../api";

const ArticlePage = () => {
  let params = useParams();
  const { state } = useAuth();
  const { isAuth } = state;
  const articleId = params.id;
  const [articleDetail, setArticleDetail] = useState();
  const { error, loading, run } = useRequest(getArticleByArticleId, {
    manual: true,
    onSuccess: (result) => {
      setArticleDetail(result?.data);
    },
  });

  useEffect(() => {
    const setScrollTop = () => {
      document.documentElement.scrollTop = 0;
    };
    setScrollTop();
  }, []);

  useEffect(() => {
    isAuth && run(articleId);
  }, [articleId, run, isAuth]);

  return (
    <GyBodySection>
      {error && (
        <Error
          content={{
            title: "The Article doesn't exist...",
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
            <ArticleDetails
              articleDetail={articleDetail}
              setArticleDetail={setArticleDetail}
              isAuth={isAuth}
              articleId={articleId}
            />
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
