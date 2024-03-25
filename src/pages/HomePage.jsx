import React, { useEffect, useState } from "react";
// components
import ArticleList from "../components/article/ArticleList";
import TopUserList from "../components/user/TopUserList";
import EditorBtnsComponents from "../components/editor/EditorBtns";
// ui
import Gytab from "../ui/GyTab/Gytab";
import GyBodySection from "../ui/GyBodySection/GyBodySection";
import GyPagination from "../ui/GyPagination/GyPagination";
// scss
import "./style/index.scss";
import Moments from "../components/moments/Moments";
import useWindowsSize from "../hooks/useWindowsSize";
// hooks
import useAuth from "../hooks/useAuth";
import { useRequest } from "ahooks";
// import api
import { getArticleList } from "../api/article";
import { getMomentList, getMomentListAuth } from "../api/moments";

export const tabs = ["Articles", "Moments"];

const Home = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const window = useWindowsSize();
  // article states
  const [articleList, setArticleList] = useState([]);
  // moment states
  const [momentList, setMomentList] = useState([]);
  // pagination
  const [articlePagination, setArticlePagination] = useState();
  const [momentPagination, setMomentPagination] = useState();
  const [curPageMoment, setCurPageMoment] = useState(1);
  const [curPageArticle, setCurPageArticle] = useState(1);
  // auth
  const { state } = useAuth();

  const getArticleListRequest = useRequest(getArticleList, {
    manual: true,
    onSuccess: (result, params) => {
      setArticleList(result?.data);
      setArticlePagination(result?.meta);
    },
  });

  const getMomentListRequest = useRequest(
    state.isAuth ? getMomentListAuth : getMomentList,
    {
      manual: true,
      onSuccess: (result, params) => {
        setMomentList(result?.data);
        setMomentPagination(result?.meta);
      },
    }
  );

  useEffect(() => {
    getArticleListRequest.run(curPageArticle);
  }, [curPageArticle]);

  useEffect(() => {
    getMomentListRequest.run(curPageMoment);
  }, [curPageMoment]);

  return (
    <GyBodySection>
      <div className="page-section">
        <section className="left-section">
          <Gytab
            data={tabs}
            activeIndex={activeIndex}
            setActiveIndex={setActiveIndex}
            mobile={window === "md" || window === "sm"}
          >
            {activeIndex === 0 ? (
              <ArticleList
                getArticleListRequest={getArticleListRequest}
                articleList={articleList}
              />
            ) : (
              <Moments
                getMomentListRequest={getArticleListRequest}
                momentList={momentList}
                curPage={curPageMoment}
              />
            )}
          </Gytab>
          {/* pagination */}
          {activeIndex === 0
            ? !!articleList.length && (
                <GyPagination
                  paginationObj={articlePagination}
                  onCurPageChange={(page) => {
                    setCurPageArticle(page);
                  }}
                />
              )
            : !!momentList.length && (
                <GyPagination
                  paginationObj={momentPagination}
                  onCurPageChange={(page) => {
                    setCurPageMoment(page);
                  }}
                />
              )}
        </section>
        <section className="right-section hidden lg:block">
          <div className="sticky-side">
            <EditorBtnsComponents.EditorBtns />
            <TopUserList row={5} page={1} />
          </div>
        </section>
      </div>
    </GyBodySection>
  );
};

export default Home;
