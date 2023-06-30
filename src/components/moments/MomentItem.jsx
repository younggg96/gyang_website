import React, { useState } from "react";
// components
import UserHeader from "../user/UserHeader";
// ui
import GyTime from "../../ui/GyTime/GyTime";

// scss
import "./index.scss";
import { MomentActionsBox } from "../comments/ActionsBox";
import useAuth from "../../hooks/useAuth";
import { TIME, TYPE, useToast } from "../../ui/GyToast/ToastProvider";
import { useNavigate } from "react-router-dom";
import GyImgSwiper from "../../ui/GyImgSwiper/GyImgSwiper";
import classNames from "classnames";
import { useCycle } from "framer-motion";
import GyModal from "../../ui/GyModal/GyModal";
import MomentCommentInput from "./MomentCommentInput";
import MomentCommentList from "./MomentCommentList";

const ImgList = ({ imgs }) => {
  return (
    <>
      {!!imgs.length && (
        <div className="imgs">
          {imgs.map((img) => {
            return <img src={img.url} alt="moment img" key={img.id} />;
          })}
        </div>
      )}
    </>
  );
};

const MomentItem = ({ data, type = "list", className }) => {
  const { id, user, content, imgs, createdAt, curUserLiked, _count } = data;
  // states
  const [commentBoxOpened, setCommentBoxOpened] = useState(false);
  const [replyInputOpened, setReplyInputOpened] = useState(false);
  const [liked, setLiked] = useState(curUserLiked);

  const [commentList, setCommentList] = useState();

  // const [page, setPage] = useState(1);
  // const [row, setRow] = useState(3);
  // hooks
  const [isMomentModalOpen, toggleMomentModalOpen] = useCycle(false, true);
  const { addToast } = useToast();
  const navigate = useNavigate();
  const { state } = useAuth();

  const clickReplyBtn = () => {
    if (replyInputOpened) {
      // close comment list back to page 1
      // setPage(1);
      // setRow(3);
      setReplyInputOpened(!replyInputOpened);
    } else {
      if (state.isAuth) {
        setReplyInputOpened(!replyInputOpened);
        // run(page, row, id);
      } else {
        addToast({
          content: "Please sign in to view more details.",
          time: TIME.SHORT,
          type: TYPE.INFO,
        });
        navigate("/auth");
      }
    }
  };

  const clickCommentBtn = () => {
    if (commentBoxOpened) {
      // close comment list back to page 1
      // setPage(1);
      // setRow(3);
      setCommentBoxOpened(!commentBoxOpened);
    } else {
      if (state.isAuth) {
        setCommentBoxOpened(!commentBoxOpened);
        // run(page, row, id);
      } else {
        addToast({
          content: "Please sign in to view more details.",
          time: TIME.SHORT,
          type: TYPE.INFO,
        });
        navigate("/auth");
      }
    }
  };

  const clickBtnHandler = (btnType) => {
    switch (btnType) {
      case "replyBtn":
        clickReplyBtn();
        break;
      case "commentBtn":
        clickCommentBtn();
        break;
      default:
        break;
    }
  };

  return (
    <>
      {type === "list" && (
        <li className="moment-item">
          {/* user header & moment date */}
          <section className="user">
            {user && <UserHeader user={user} size="sm" />}
            <GyTime date={createdAt} className="date text-xs" />
          </section>
          {/* content */}
          <p className="content">{content}</p>
          {/* imgs */}
          <ImgList imgs={imgs} />
          {/* user actions */}
          <MomentActionsBox
            actions={{
              id,
              like: { liked, setLiked, count: 0 },
              comment: {
                commentBoxOpened,
                commentCount: _count.momentComments,
              },
            }}
            displayType="list"
            clickBtnHandler={(type) => clickBtnHandler(type)}
          />
          {/* comment list */}
          {/* {commentBoxOpened && (
            <>
              <MomentCommentList
                data={replies?.data}
                count={replies?.meta.total}
                type="subReply"
              />
            </>
          )} */}
        </li>
      )}
      {type === "grid" && (
        <div className={classNames(["moment-item-card", className])}>
          {/* imgs */}
          <GyImgSwiper imgs={imgs} className="moment-item-card__imgs" />
          {/* content */}
          <p className="content" onClick={toggleMomentModalOpen}>
            {content}
          </p>
          {/* user header & moment date */}
          <section className="user">
            {user && <UserHeader user={user} size="xs" />}
            <GyTime date={createdAt} className="date text-xs" />
          </section>
          <GyModal
            isOpen={isMomentModalOpen}
            toggleOpen={toggleMomentModalOpen}
            modalClass={"moment-modal"}
          >
            <section className="user">
              {user && <UserHeader user={user} size="sm" />}
              <GyTime date={createdAt} className="date" />
            </section>
            {/* imgs */}
            <GyImgSwiper imgs={imgs} className="moment-item-card__imgs" />
            {/* content */}
            <p className="content" onClick={toggleMomentModalOpen}>
              {content}
            </p>
            {/* user header & moment date */}
            <section className="actions" id="actions">
              <MomentActionsBox
                actions={{
                  id,
                  like: { liked, setLiked, count: 0 },
                  comment: null,
                }}
                displayType="grid"
                clickBtnHandler={(type) => clickBtnHandler(type)}
              />
              {/* comment list */}
              {replyInputOpened && <MomentCommentInput />}
            </section>
            <section>
              <MomentCommentList
                data={commentList}
                setData={setCommentList}
                count={0}
                type="comments"
              />
            </section>
          </GyModal>
        </div>
      )}
    </>
  );
};

export default MomentItem;
