import React, { useRef, useState } from "react";
import UserHeader from "../user/UserHeader";
import GyTime from "../../ui/GyTime/GyTime";
import { MomentCommentActionsBox } from "../comments/ActionsBox";
import MomentInput from "./MomentInput";
import { useRequest } from "ahooks";
import {
  createMomentCommentReply,
  getChildrenMomentCommentsByPid,
} from "../../api/momentComment";
import { InputPropsComment } from "./config";
import { TIME, TYPE, useToast } from "../../ui/GyToast/ToastProvider";

const MomentCommentSubItem = ({ data, setData, ...props }) => {
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
    like: { liked, setLiked, count: _count.commentLikes },
  };

  const clickReplyBtn = () => {
    setOpenInput(!openInput);
  };

  const createMomentCommentReplyRequest = useRequest(createMomentCommentReply, {
    manual: true,
    onSuccess: (result) => {
      inputRef.current && inputRef.current.reset();
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
