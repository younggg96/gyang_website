import React from "react";
import { useRef, createContext, useState } from "react";
import { useRequest } from "ahooks";
// components
import UserHeader from "../user/UserHeader";
import MomentInput from "./MomentInput";
import MomentCommentList from "./MomentCommentList";
import { MomentCommentActionsBox } from "../comments/ActionsBox";
// hooks
import { useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
// apis
import {
  createMomentCommentReply,
  getChildrenMomentCommentsByPid,
} from "../../api/momentComment";
// ui
import GyTime from "../../ui/GyTime/GyTime";
import GyLoader from "../../ui/GyLoader/GyLoader";
import GyButton from "../../ui/GyButton/GyButton";
import { TIME, TYPE, useToast } from "../../ui/GyToast/ToastProvider";
import MomentCommentSubItem from "./MomentCommentSubItem";
import { InputPropsComment } from "./config";

const MomentCommentItem = ({ data, setData, type, ...props }) => {
  const { content, createdAt, curUserLiked, user, id, momentId, _count } = data;

  const navigate = useNavigate();
  const { state } = useAuth();
  const { addToast } = useToast();
  // states
  const [commentBoxOpened, setCommentBoxOpened] = useState(false);
  const [replies, setReplies] = useState();
  const [liked, setLiked] = useState(curUserLiked);
  const [openInput, setOpenInput] = useState(false);
  const [page, setPage] = useState(1);
  const [row, setRow] = useState(3);
  // ref
  const inputRef = useRef(null);

  const actions = {
    id,
    comment: {
      commentBoxOpened,
      commentCount: _count.replies,
    },
    like: { liked, setLiked, count: _count.momentCommentLikes },
  };

  const { error, loading, run } = useRequest(getChildrenMomentCommentsByPid, {
    manual: true,
    onSuccess: (result, params) => {
      setReplies(result);
    },
  });

  const createMomentCommentReplyRequest = useRequest(createMomentCommentReply, {
    manual: true,
    onSuccess: (result) => {
      inputRef.current && inputRef.current.reset();
      run(page, row, id);
      addToast({
        content: InputPropsComment.success,
        time: TIME.SHORT,
        type: TYPE.SUCCESS,
      });
    },
  });

  const clickCommentBtn = () => {
    if (commentBoxOpened) {
      // close comment list back to page 1
      setPage(1);
      setRow(3);
      setCommentBoxOpened(!commentBoxOpened);
    } else {
      if (state.isAuth) {
        setCommentBoxOpened(!commentBoxOpened);
        run(page, row, id);
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

  const clickReplyBtn = () => {
    setOpenInput(!openInput);
  };

  const submitReplyToMomentCommentHandler = (data) => {
    createMomentCommentReplyRequest.run({
      content: data.comment,
      momentId,
      parentId: id,
      replyTo: null,
    });
  };

  const clickBtnHandler = (btnType) => {
    switch (btnType) {
      case "commentBtn":
        clickCommentBtn();
        break;
      case "replyBtn":
        clickReplyBtn();
        break;
      default:
        break;
    }
  };

  const showMore = () => {
    setPage(page + 1);
    setRow(5);
    run(page + 1, 5, id);
  };

  return (
    <div className="comments-item" {...props}>
      <section className="user">
        <UserHeader user={user} size="xs" className="mr-auto" />
        <GyTime date={createdAt} className="date" />
      </section>
      <p className="content">{content}</p>
      <MomentCommentActionsBox
        actions={actions}
        clickBtnHandler={(type) => clickBtnHandler(type)}
      />
      {openInput && (
        <MomentInput
          type="reply"
          onSubmit={submitReplyToMomentCommentHandler}
          loading={createMomentCommentReplyRequest.loading}
          ref={inputRef}
        />
      )}
      {/* comment list */}
      {commentBoxOpened && (
        <>
          {!!replies && !loading && (
            <MomentCommentList count={replies?.meta.total} type="replies">
              {replies?.data.map((item) => (
                <MomentCommentSubItem
                  data={item}
                  key={item.id}
                  updateParentData={() => run(page, row, id)}
                />
              ))}
            </MomentCommentList>
          )}
          {!!loading && <GyLoader />}
          {!!replies?.hasMore && !loading && (
            <GyButton
              size={["sm", "round"]}
              className="show-more-btn"
              click={() => showMore()}
            >
              Show more replies
            </GyButton>
          )}
        </>
      )}
    </div>
  );
};

export default MomentCommentItem;
