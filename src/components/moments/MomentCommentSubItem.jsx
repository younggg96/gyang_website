import React, { useRef, useState } from "react";
import UserHeader from "../user/UserHeader"
import GyTime from "../../ui/GyTime/GyTime"
import { MomentCommentActionsBox } from "../comments/ActionsBox"
import MomentInput from "./MomentInput"

const MomentCommentSubItem = ({ data, setData, type, ...props }) => {
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
  const [liked, setLiked] = useState(curUserLiked);
  const [openInput, setOpenInput] = useState(false);
  const actionRef = useRef(null);

  const actions = {
    id,
    comment: null,
    like: { liked, setLiked, count: _count.commentLikes },
  };

  const clickReplyBtn = () => {
    setOpenInput(!openInput);
  };

  const hideReplyBtn = () => {
    setOpenInput(false);
    actionRef.current.setShow(false);
  };

  const replyObj = {
    momentId,
    parentId: parentId ? parentId : id,
    replyTo: parentId ? id : null,
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
        type={type}
        actions={actions}
        clickBtnHandler={() => clickReplyBtn()}
        ref={actionRef}
      />
      {/* comment input */}
      {openInput && (
        <MomentInput
          type={type}
          // replyObj={replyObj}
          // hideReplyBtn={hideReplyBtn}
        />
      )}
    </div>
  );
};

export default MomentCommentSubItem;
