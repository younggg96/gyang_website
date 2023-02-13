import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useRequest } from "ahooks";
// import api
import { getUserInfo } from "../api";
// import components
import UserHeader from "../components/user/UserHeader";
import ArticleList from "../components/article/ArticleList";
import GyBodySection from "../ui/GyBodySection/GyBodySection";
import GyButton from "../ui/GyButton/GyButton";
// icons
import { BsThreeDotsVertical } from "react-icons/bs";
// scss
import "./style/user-profile.scss";
import UserProfile from "../components/profile/UserProfile";

const UserBackground = ({ url }) => {
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

const Profile = () => {
  let params = useParams();
  const userId = params.id;
  const [userData, setUserData] = useState({ user: null, profile: null });
  const { user, profile } = userData;

  const { error, loading, run } = useRequest(getUserInfo, {
    manual: true,
    onSuccess: (result, params) => {
      setUserData(result?.data);
    },
  });

  useEffect(() => {
    userId && run(userId);
  }, [run, userId]);

  return (
    <GyBodySection>
      <div className="mx-auto">
        <UserBackground url={profile?.backgroundImg} />
        <section className="user-profile">
          <div className="user-profile-header">
            <UserHeader size="lg" user={user} />
            <UserContactBtns />
          </div>
          <div className="user-profile-content">
            <section className="basis-1/3">
              <UserProfile.AboutUser profile={profile} />
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

export default Profile;
