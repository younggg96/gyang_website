import React, { useState } from "react";
import ArticleList from "../components/article/ArticleList";
import TopUserList from "../components/user/TopUserList";
// import components
import Gytab from "../ui/GyTab/Gytab";
import GyBodySection from "../ui/GyBodySection/GyBodySection";
// scss
import "./style/home.scss";
import EditorBtns from "../components/editor/EditorBtns";
// import GyLoader from "../ui/GyLoader/GyLoader"

const Home = () => {
  const tabs = ["Articles", "Moments"];
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <GyBodySection>
      {/* <GyLoader /> */}
      <div className="home-section">
        <section className="left-section">
          <Gytab
            data={tabs}
            activeIndex={activeIndex}
            setActiveIndex={setActiveIndex}
          >
            {activeIndex === 0 ? <ArticleList /> : <div>Moments</div>}
          </Gytab>
        </section>
        <section className="right-section">
          <EditorBtns />
          <TopUserList row={5} page={1} />
        </section>
      </div>
    </GyBodySection>
  );
};

export default Home;
