import React, { useState } from "react";
import ArticleList from "../components/article/ArticleList";
import TopUserList from "../components/user/TopUserList";
// import components
import Gytab from "../ui/GyTab/Gytab";
import GyBodySection from "../ui/GyBodySection/GyBodySection";
import SwitchBtn from "../ui/GySwitchBtn/GySwitchBtn"

const Home = () => {
  const tabs = ["Articles", "Moments"];
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <GyBodySection>
      <div className="home-section">
        <section className="flex-1">
          <SwitchBtn.GyThemeSwitchBtn />
          <Gytab
            data={tabs}
            activeIndex={activeIndex}
            setActiveIndex={setActiveIndex}
          >
            {activeIndex === 0 ? <ArticleList /> : <div>Moments</div>}
          </Gytab>
        </section>
        <section className="w-full lg:w-[300px]">
          <TopUserList row={5} page={1} />
        </section>
      </div>
    </GyBodySection>
  );
};

export default Home;
