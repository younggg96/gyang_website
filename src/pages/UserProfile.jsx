import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useRequest } from "ahooks";
// import api
import { getUserInfo } from "../api";
// import components
import UserHeader from "../components/user/UserHeader";
import AboutUser from "../components/profile/AboutUser";
import ArticleList from "../components/article/ArticleList";
import GyBodySection from "../ui/GyBodySection/GyBodySection";
import GyButton from "../ui/GyButton/GyButton";
// icons
import { BsThreeDotsVertical } from "react-icons/bs";
// scss
import "./style/user-profile.scss";

const UserHeaderImg = ({ url }) => {
  return (
    <div
      style={{ backgroundImage: `url(${url})` }}
      className="user-profile-header-img"
    ></div>
  );
};

const UserContactBtns = () => {
  return (
    <div className="user-profile-btns">
      <GyButton className="message">message</GyButton>
      <GyButton size="round" className="more">
        <BsThreeDotsVertical />
      </GyButton>
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
        <section className="user-profile">
          <div className="user-profile-header">
            <UserHeader type="big" user={user} />
            <UserContactBtns />
          </div>
          <div className="user-profile-content">
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
