import React, { useState } from "react";
// components
import ArticleList from "../components/article/ArticleList";
import TopUserList from "../components/user/TopUserList";
import EditorBtnsComponents from "../components/editor/EditorBtns";
// ui
import Gytab from "../ui/GyTab/Gytab";
import GyBodySection from "../ui/GyBodySection/GyBodySection";
// scss
import "./style/index.scss";
import Moments from "../components/moments/Moments";
import useWindowsSize from "../hooks/useWindowsSize";

export const tabs = ["Articles", "Moments"];

const Home = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const window = useWindowsSize();

  return (
    <GyBodySection>
      <div className="page-section">
        <section className="left-section">
          <Gytab
            data={tabs}
            activeIndex={activeIndex}
            setActiveIndex={setActiveIndex}
            mobile={window === "md" || window === "sm"}
            className="page-tabs"
          >
            {activeIndex === 0 ? <ArticleList /> : <Moments />}
          </Gytab>
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
