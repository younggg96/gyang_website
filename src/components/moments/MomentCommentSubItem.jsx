import React, { useRef, useState } from "react";
import { useRequest } from "ahooks";
// components
import UserHeader from "../user/UserHeader";
import MomentInput from "./MomentInput";
import { MomentCommentActionsBox } from "../comments/ActionsBox";
import { createMomentCommentReply } from "../../api/momentComment";
// hooks
import { TIME, TYPE, useToast } from "../../ui/GyToast/ToastProvider";
// config
import { InputPropsComment } from "./config";
// ui
import GyTime from "../../ui/GyTime/GyTime";

const MomentCommentSubItem = ({
  data,
  setData,
  updateParentData,
  ...props
}) => {
  const {
    content,
    createdAt,
    user,
    id,
    parentId,
    momentId,
    curUserLiked,
    replyToComment,
    _count,
  } = data;
  const { addToast } = useToast();
  // states
  const [liked, setLiked] = useState(curUserLiked);
  const [openInput, setOpenInput] = useState(false);
  // ref
  const inputRef = useRef(null);

  const actions = {
    id,
    comment: null,
    like: { liked, setLiked, count: _count.momentCommentLikes },
  };

  const clickReplyBtn = () => {
    setOpenInput(!openInput);
  };

  const createMomentCommentReplyRequest = useRequest(createMomentCommentReply, {
    manual: true,
    onSuccess: (result) => {
      inputRef.current && inputRef.current.reset();
      updateParentData();
      addToast({
        content: InputPropsComment.success,
        time: TIME.SHORT,
        type: TYPE.SUCCESS,
      });
    },
  });

  const submitReplyToMomentCommentHandler = (data) => {
    createMomentCommentReplyRequest.run({
      content: data.comment,
      momentId,
      parentId: parentId,
      replyTo: id,
    });
  };

  return (
    <div className="comments-item" {...props}>
      <section className="user">
        <div className="user-wapper">
          {user && <UserHeader user={user} size="sm" />}
          {replyToComment && (
            <>
              <span className="reply-label">Replied</span>
            </>
          )}
        </div>
        <GyTime date={createdAt} className="date" />
      </section>
      {replyToComment && (
        <div className="reply-content">
          <div className="reply-content-user">
            <div className="line"></div>
            <UserHeader user={replyToComment.user} size="xs" />:
          </div>
          <p className="reply-content-details">{replyToComment.content}</p>
        </div>
      )}
      <p className="content">{content}</p>
      <MomentCommentActionsBox
        type="subComment"
        actions={actions}
        clickBtnHandler={() => clickReplyBtn()}
      />
      {/* comment input */}
      {openInput && (
        <MomentInput
          type="reply"
          onSubmit={submitReplyToMomentCommentHandler}
          loading={createMomentCommentReplyRequest.loading}
          ref={inputRef}
        />
      )}
    </div>
  );
};

export default MomentCommentSubItem;
