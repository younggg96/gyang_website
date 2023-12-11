import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import classNames from "classnames";
// ui
import GyTime from "../../ui/GyTime/GyTime";
import GyImgSwiper from "../../ui/GyImgSwiper/GyImgSwiper";
import GyModal from "../../ui/GyModal/GyModal";
import GyButton from "../../ui/GyButton/GyButton";
// hooks
import useAuth from "../../hooks/useAuth";
import { useRequest } from "ahooks";
import { useCycle } from "framer-motion";
import { TIME, TYPE, useToast } from "../../ui/GyToast/ToastProvider";
// components
import MomentInput from "./MomentInput";
import MomentCommentList from "./MomentCommentList";
import MomentCommentItem from "./MomentCommentItem";
import UserHeader from "../user/UserHeader";
import { MomentActionsBox } from "../comments/ActionsBox";
// apis
import {
  createMomentComment,
  getMomentCommentsByMomentId,
} from "../../api/momentComment";
// config
import { InputPropsComment } from "./config";
import { useRef } from "react";
import GyLoader from "../../ui/GyLoader/GyLoader";

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
  // states
  const [momentData, setMomentData] = useState(data);
  const {
    content,
    createdAt,
    curUserLiked,
    id,
    imgs,
    momentlikes,
    user,
    _count,
  } = momentData;

  const [commentBoxOpened, setCommentBoxOpened] = useState(false);
  const [replyInputOpened, setReplyInputOpened] = useState(false);
  const [liked, setLiked] = useState(curUserLiked);
  const [momentCommentList, setMomentCommentList] = useState([]);
  const [page, setPage] = useState(1);
  const [row, setRow] = useState(5);
  // total mount of moments more than how many now shows -> hasMore -> true
  const [hasMore, sethasMore] = useState();

  // hooks
  const [isMomentModalOpen, toggleMomentModalOpen] = useCycle(false, true);
  const { addToast } = useToast();
  const { state } = useAuth();
  const navigate = useNavigate();

  // ref
  const inputRef = useRef(null);

  // requests
  const getMomentCommentsByMomentIdRequest = useRequest(
    getMomentCommentsByMomentId,
    {
      manual: true,
      onSuccess: (result, params) => {
        setMomentCommentList(result.data);
        sethasMore(result.hasMore);
      },
    }
  );

  const creatMomentCommentRequest = useRequest(createMomentComment, {
    manual: true,
    onSuccess: (result) => {
      // update moment item data
      setMomentData(result.data);
      getMomentCommentsByMomentIdRequest.run(page, row, id);
      inputRef.current && inputRef.current.reset();
      addToast({
        content: InputPropsComment.success,
        time: TIME.SHORT,
        type: TYPE.SUCCESS,
      });
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
        getMomentCommentsByMomentIdRequest.run(page, row, id);
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

  const openMomentModal = () => {
    toggleMomentModalOpen();
    getMomentCommentsByMomentIdRequest.run(page, row, id);
  };

  const submitMomentCommentHandler = (data) => {
    const obj = {
      content: data.comment,
      momentId: id,
      parentId: "",
      replyTo: "",
    };
    creatMomentCommentRequest.run(obj);
  };

  const showMoreComments = () => {
    setPage((p) => p + 1);
    getMomentCommentsByMomentIdRequest.run(page + 1, row, id);
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
            <MomentInput
              onSubmit={submitMomentCommentHandler}
              loading={creatMomentCommentRequest.loading}
              type="comments"
              ref={inputRef}
            />
          )}
          {/* comment list */}
          {commentBoxOpened && (
            <MomentCommentList count={_count.momentComments} type="comments">
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
          {/* user header & moment date */}
          <section className="user">
            {user && <UserHeader user={user} size="xs" />}
            <GyTime date={createdAt} className="date text-xs" />
          </section>
          {/* content */}
          <p className="content text-line-2" onClick={openMomentModal}>
            {content}
          </p>
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
              {getMomentCommentsByMomentIdRequest.loading && <GyLoader />}
              <MomentActionsBox
                actions={{
                  id,
                  like: { liked, setLiked, count: _count.momentlikes },
                  comment: null,
                }}
                displayType="grid"
                clickBtnHandler={(type) => clickBtnHandler(type)}
              />
              {/* comment list */}
              {replyInputOpened && (
                <MomentInput
                  onSubmit={submitMomentCommentHandler}
                  loading={creatMomentCommentRequest.loading}
                  type="comments"
                  ref={inputRef}
                />
              )}
            </section>
            <section>
              <MomentCommentList count={_count.momentComments} type="comments">
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
            </section>
          </GyModal>
        </div>
      )}
    </>
  );
};

export default MomentItem;
