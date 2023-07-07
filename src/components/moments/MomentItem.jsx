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
import MomentInput from "./MomentInput";
import MomentCommentList from "./MomentCommentList";
import { useRequest } from "ahooks";
import {
  getChildrenMomentCommentsByPid,
  getMomentCommentsByMomentId,
} from "../../api/momentComment";
import MomentCommentItem from "./MomentCommentItem";
import MomentCommentSubItem from "./MomentCommentSubItem";
import GyButton from "../../ui/GyButton/GyButton";

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
  const {
    content,
    createdAt,
    curUserLiked,
    id,
    imgs,
    momentComments,
    momentlikes,
    user,
    _count,
  } = data;

  // states
  const [commentBoxOpened, setCommentBoxOpened] = useState(false);
  const [replyInputOpened, setReplyInputOpened] = useState(false);
  const [liked, setLiked] = useState(curUserLiked);
  const [momentCommentList, setMomentCommentList] = useState(momentComments);
  const [commentList, setCommentList] = useState();
  const [page, setPage] = useState(1);
  const [row, setRow] = useState(5);
  // total mount of moments more than how many now shows -> hasMore -> true
  const [hasMore, sethasMore] = useState(
    _count.momentComments > momentComments.length
  );

  // hooks
  const [isMomentModalOpen, toggleMomentModalOpen] = useCycle(false, true);
  const { addToast } = useToast();
  const { state } = useAuth();
  const navigate = useNavigate();

  const { error, loading, run } = useRequest(getMomentCommentsByMomentId, {
    manual: true,
    onSuccess: (result, params) => {
      setMomentCommentList(result.data);
      sethasMore(result.hasMore);
    },
  });

  const clickReplyBtn = () => {
    if (replyInputOpened) {
      setReplyInputOpened(!replyInputOpened);
    } else {
      if (state.isAuth) {
        setReplyInputOpened(!replyInputOpened);
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

  const submitMomentCommentHandler = (data) => {
    console.log(data);
  };

  const showMoreComments = () => {
    setPage((p) => p + 1);
    run(page + 1, row, id);
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
              like: { liked, setLiked, count: _count.momentlikes },
              comment: {
                commentBoxOpened,
                commentCount: _count.momentComments,
              },
            }}
            displayType="list"
            clickBtnHandler={(type) => clickBtnHandler(type)}
          />
          {replyInputOpened && (
            <MomentInput onSubmit={submitMomentCommentHandler} />
          )}
          {/* comment list */}
          {commentBoxOpened && (
            <MomentCommentList
              count={_count.momentComments}
              type="momentComment"
            >
              {momentCommentList.map((item) => (
                <MomentCommentItem data={item} key={item.id} type={type} />
              ))}
              {hasMore && (
                <GyButton
                  size={["sm", "round"]}
                  className="show-more-btn"
                  click={() => showMoreComments()}
                >
                  More comments
                </GyButton>
              )}
            </MomentCommentList>
          )}
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
              {replyInputOpened && <MomentInput />}
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
