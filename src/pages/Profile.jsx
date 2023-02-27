import React, { useState, useEffect } from "react";
// hooks
import { useParams } from "react-router-dom";
import { useRequest } from "ahooks";
import useAuth from "../hooks/useAuth";
// import api
import { getUserInfo } from "../api";
// import components
import UserHeader from "../components/user/UserHeader";
import ArticleList from "../components/article/ArticleList";
import GyBodySection from "../ui/GyBodySection/GyBodySection";
import GyButton from "../ui/GyButton/GyButton";
import UserProfile from "../components/profile/UserProfile";
// icons
import { BsThreeDotsVertical } from "react-icons/bs";
// scss
import "./style/user-profile.scss";
import Error from "../components/error/Error";
import GyLoader from "../ui/GyLoader/GyLoader";
import classNames from "classnames";

const UserBackground = ({ url, editable = false }) => {
  return (
    <div
      style={{ backgroundImage: `url(${url})` }}
      className={classNames("user-profile-header-img", { editable: editable })}
    >
      {editable && (
        <GyButton className="img-change-btn" size={["sm"]}>
          Change
        </GyButton>
      )}
    </div>
  );
};

const UserContactBtns = () => {
  return (
    <div className="user-profile-btns">
      <GyButton className="message">message</GyButton>
      <GyButton size={["round"]} className="more">
        <BsThreeDotsVertical />
      </GyButton>
    </div>
  );
};

const Profile = ({ self = false }) => {
  let params = useParams();
  const { state } = useAuth();
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
    self && state.user && run(state.user?.id);
    userId && run(userId);
  }, [run, self, userId, state]);

  return (
    <GyBodySection>
      {error && (
        <Error
          content={{
            title: "No Author doesn’t exist...",
            sub: "Please check your URL or return to home.",
          }}
          type="error_no_found"
        ></Error>
      )}
      {loading && (
        <div className="user-profile-loading">
          <GyLoader />
        </div>
      )}
      {!loading && user && profile && (
        <div className="mx-auto">
          <UserBackground url={profile?.backgroundImg} editable={self} />
          <section className="user-profile">
            <div className="user-profile-header">
              <UserHeader size="lg" user={user} />
              <UserContactBtns />
            </div>
            <div className="user-profile-content">
              <section className="left-section">
                <div className="sticky-side">
                  <UserProfile.AboutUser profile={profile} />
                </div>
              </section>
              <section className="right-section">
                <ArticleList userId={userId} />
              </section>
            </div>
          </section>
        </div>
      )}
    </GyBodySection>
  );
};

export default Profile;
