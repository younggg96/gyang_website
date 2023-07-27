import React, { useState, useEffect } from "react";
import classNames from "classnames";
// hooks
import { useParams } from "react-router-dom";
import { useRequest, useToggle } from "ahooks";
import useAuth from "../hooks/useAuth";
// import api
import { getUserInfo } from "../api/user";
// import components
import UserHeader from "../components/user/UserHeader";
import ArticleList from "../components/article/ArticleList";
import GyBodySection from "../ui/GyBodySection/GyBodySection";
import UserProfile from "../components/profile/UserProfile";
import MomentList from "../components/moments/MomentList";
import Error from "../components/error/Error";
// ui
import { tabs } from "./HomePage";
import GyButton from "../ui/GyButton/GyButton";
import GyLoader from "../ui/GyLoader/GyLoader";
import Gytab from "../ui/GyTab/Gytab";
// icons
import { BsThreeDotsVertical } from "react-icons/bs";
import { IoMdSettings } from "react-icons/io";
// scss
import "./style/index.scss";

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

const UserContactBtns = ({ self }) => {
  return (
    <div className="user-profile-btns">
      {!self ? (
        <>
          <GyButton className="message">message</GyButton>
          <GyButton size={["round"]} className="icon-btn">
            <BsThreeDotsVertical />
          </GyButton>
        </>
      ) : (
        <GyButton size={["round"]} className="icon-btn">
          <IoMdSettings />
        </GyButton>
      )}
    </div>
  );
};

const Profile = ({ self = false }) => {
  let params = useParams();
  const userId = params.id;
  const { state } = useAuth();
  const [toggleState, { setLeft, setRight }] = useToggle("list", "grid");
  // states
  const [activeIndex, setActiveIndex] = useState(0);
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
            title: "The Author doesn’t exist...",
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
      {!loading && user && profile && (
        <div className="mx-auto">
          <UserBackground url={profile?.backgroundImg} editable={self} />
          <section className="user-profile">
            <div className="user-profile-header">
              <UserHeader size="lg" user={user} />
              <UserContactBtns self={self} />
            </div>
            <div className="user-profile-content">
              <section className="left-section">
                <Gytab
                  data={tabs}
                  activeIndex={activeIndex}
                  setActiveIndex={setActiveIndex}
                >
                  {activeIndex === 0 ? (
                    <ArticleList userId={!self ? userId : state?.user?.id} />
                  ) : (
                    <MomentList
                      userId={!self ? userId : state?.user?.id}
                      type={toggleState}
                    />
                  )}
                </Gytab>
              </section>
              <section className="right-section">
                <div className="sticky-side">
                  <UserProfile.AboutUser profile={profile} />
                </div>
              </section>
            </div>
          </section>
        </div>
      )}
    </GyBodySection>
  );
};

export default Profile;
