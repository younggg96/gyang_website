import React, { useState } from "react";
import ArticleList from "../components/article/ArticleList";
import TopUserList from "../components/user/TopUserList";
// import components
import Gytab from "../ui/GyTab/Gytab";
import GyBodySection from "../ui/GyBodySection/GyBodySection";
// scss
import "./style/index.scss";
import EditorBtns from "../components/editor/EditorBtns";
import EditorInput from "../components/editor/EditorInput";
import MomentList from "../components/moments/MomentList"

export const tabs = ["Articles", "Moments"];

const Home = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <GyBodySection>
      <div className="page-section">
        <section className="left-section">
          <Gytab
            data={tabs}
            activeIndex={activeIndex}
            setActiveIndex={setActiveIndex}
          >
            {activeIndex === 0 ? (
              <ArticleList />
            ) : (
              <MomentList />
            )}
          </Gytab>
        </section>
        <section className="right-section">
          <div className="sticky-side">
            <EditorBtns />
            <TopUserList row={5} page={1} />
          </div>
        </section>
      </div>
    </GyBodySection>
  );
};

export default Home;