import React, { useState, useEffect } from "react";
import classNames from "classnames";
// hooks
import { useParams } from "react-router-dom";
import { useRequest, useToggle } from "ahooks";
import useAuth from "../hooks/useAuth";
import useWindowsSize from "../hooks/useWindowsSize";
// import api
import { getUserInfo } from "../api/user";
import { getArticleList, getArticleListByUserId } from "../api/article";
// import components
import UserHeader from "../components/user/UserHeader";
import ArticleList from "../components/article/ArticleList";
import UserProfile from "../components/profile/UserProfile";
import MomentList from "../components/moments/MomentList";
import Error from "../components/error/Error";
import ChatRoom from "../components/chat/ChatRoom";
// ui
import { tabs } from "./HomePage";
import GyModal from "../ui/GyModal/GyModal";
import GyButton from "../ui/GyButton/GyButton";
import GyLoader from "../ui/GyLoader/GyLoader";
import Gytab from "../ui/GyTab/Gytab";
import GyBodySection from "../ui/GyBodySection/GyBodySection";
import GyPagination from "../ui/GyPagination/GyPagination";
// icons
import { BsThreeDotsVertical } from "react-icons/bs";
import { IoMdSettings } from "react-icons/io";
// scss
import "./style/index.scss";
import { useCycle } from "framer-motion";
import { createConversation } from "../api/chat";
import {
  getMomentList,
  getMomentListAuth,
  getMomentListByUserId,
} from "../api/moments";

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

const UserContactBtns = ({ self, sendMsgHandler }) => {
  return (
    <div className="user-profile-btns">
      {!self ? (
        <>
          <GyButton size={["sm"]} className="message" click={sendMsgHandler}>
            message
          </GyButton>
          <GyButton size={["sm", "round"]}>
            <BsThreeDotsVertical />
          </GyButton>
        </>
      ) : (
        <GyButton size={["sm", "round"]}>
          <IoMdSettings />
        </GyButton>
      )}
    </div>
  );
};

const Profile = () => {
  const { state } = useAuth();
  let params = useParams();
  const userId = +params.id; // string id -> number
  const self = userId === state.user?.id; // profile user <-> cur user

  const window = useWindowsSize();
  const [toggleState, { setLeft, setRight }] = useToggle("list", "grid");
  // states
  const [activeIndex, setActiveIndex] = useState(0);
  const [userData, setUserData] = useState({ user: null, profile: null });
  // article states
  const [articleList, setArticleList] = useState([]);
  // moment states
  const [momentList, setMomentList] = useState([]);

  // pagination
  const [articlePagination, setArticlePagination] = useState();
  const [momentPagination, setMomentPagination] = useState();
  const [curPageMoment, setCurPageMoment] = useState(1);
  const [curPageArticle, setCurPageArticle] = useState(1);

  const getArticleListRequest = useRequest(getArticleListByUserId, {
    manual: true,
    onSuccess: (result, params) => {
      setArticleList(result?.data);
      setArticlePagination(result?.meta);
    },
  });

  const getMomentListRequest = useRequest(getMomentListByUserId, {
    manual: true,
    onSuccess: (result, params) => {
      setMomentList(result?.data);
      setMomentPagination(result?.meta);
    },
  });

  const { user, profile } = userData;

  const [isMsgRoomOpen, toggleMsgRoomOpen] = useCycle(false, true);

  const getUserInfoRequest = useRequest(getUserInfo, {
    manual: true,
    onSuccess: (result, params) => {
      setUserData(result?.data);
    },
  });

  const createConversationRequest = useRequest(createConversation, {
    manual: true,
    onSuccess: (result) => {
      console.log(result);
    },
  });

  const sendMsgHandler = () => {
    createConversationRequest.run({ userIds: [state.user.id, userId] });
    toggleMsgRoomOpen();
  };

  useEffect(() => {
    getUserInfoRequest.run(self ? state.user.id : userId);
  }, []);

  useEffect(() => {
    getArticleListRequest.run(curPageArticle, userId);
  }, [curPageArticle]);

  useEffect(() => {
    getMomentListRequest.run(curPageMoment, userId);
  }, [curPageMoment]);

  return (
    <GyBodySection>
      {getUserInfoRequest.error && (
        <Error
          content={{
            title: "The Author doesn’t exist...",
            sub: "Please check your URL or return to home.",
          }}
          type="error_no_found"
        ></Error>
      )}
      {getUserInfoRequest.loading && (
        <div className="page-loading">
          <GyLoader />
        </div>
      )}
      {!getUserInfoRequest.loading && user && profile && (
        <div className="mx-auto">
          <UserBackground url={profile?.backgroundImg} editable={self} />
          <section className="user-profile">
            <div className="user-profile-header">
              <UserHeader size="lg" user={user} />
              <UserContactBtns self={self} sendMsgHandler={sendMsgHandler} />
            </div>
            <div className="user-profile-content">
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
                    <MomentList
                      getMomentListRequest={getArticleListRequest}
                      momentList={momentList}
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
              <section className="right-section">
                <div className="sticky-side">
                  <UserProfile.AboutUser profile={profile} />
                </div>
              </section>
            </div>
          </section>
        </div>
      )}
      <GyModal
        isOpen={isMsgRoomOpen}
        toggleOpen={toggleMsgRoomOpen}
        modalClass={"msgroom-modal"}
      >
        <ChatRoom />
      </GyModal>
    </GyBodySection>
  );
};

export default Profile;
