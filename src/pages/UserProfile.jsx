import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useRequest } from "ahooks";
// import api
import { getUserInfo } from "../api";
// import components
import UserHeader from "../components/user/UserHeader";
import AboutUser from "../components/profile/AboutUser";
import ArticleList from "../components/article/ArticleList";

import { BsThreeDotsVertical } from "react-icons/bs";
import GyBodySection from "../ui/GyBodySection/GyBodySection";

const UserHeaderImg = ({ url }) => {
  return (
    <div
      style={{ backgroundImage: `url(${url})` }}
      className="w-full h-[230px] lg:h-[460px] bg-center bg-no-repeat bg-cover"
    ></div>
  );
};

const UserContactBtns = () => {
  return (
    <div className="flex items-center gap-4 w-full lg:w-fit">
      <button className="btn-small flex-1 lg:flex-auto hover:opacity-90">
        message
      </button>
      <button className=" hover:bg-slate-300 border hover:border-black rounded-full w-12 h-12 grid place-items-center">
        <BsThreeDotsVertical />
      </button>
    </div>
  );
};

const UserProfile = () => {
  let params = useParams();
  const userId = params.id;
  const [user, setUser] = useState();

  const { error, loading, run } = useRequest(getUserInfo, {
    manual: true,
    onSuccess: (result, params) => {
      setUser(result?.data.user);
    },
  });

  useEffect(() => {
    run(userId);
  }, []);

  return (
    <GyBodySection>
      <div className="mx-auto">
        <UserHeaderImg
          url={
            "https://images.unsplash.com/photo-1488831861984-179da3647265?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1828&q=80"
          }
        />
        <section className="container mx-auto">
          <div className="flex flex-col lg:flex-row lg:justify-between gap-2 lg:gap-4 px-4">
            <UserHeader type="big" user={user} />
            <UserContactBtns />
          </div>
          <div className="flex flex-col lg:flex-row gap-2 lg:gap-4 px-4">
            <section className="basis-1/3">
              <AboutUser />
            </section>
            <section className="basis-2/3">
              <ArticleList userId={userId} />
            </section>
          </div>
        </section>
      </div>
    </GyBodySection>
  );
};

export default UserProfile;
