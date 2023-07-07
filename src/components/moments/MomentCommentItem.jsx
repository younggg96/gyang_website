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
import { getChildrenMomentCommentsByPid } from "../../api/momentComment";
// ui
import GyTime from "../../ui/GyTime/GyTime";
import GyLoader from "../../ui/GyLoader/GyLoader";
import GyButton from "../../ui/GyButton/GyButton";
import { TIME, TYPE, useToast } from "../../ui/GyToast/ToastProvider";
import MomentCommentSubItem from "./MomentCommentSubItem";

const CommentItemContext = createContext({
  refreshData: () => {},
});

const MomentCommentItem = ({
  data,
  setData,
  type,
  parentId = null,
  ...props
}) => {
  const {
    content,
    createdAt,
    curUserLiked,
    user,
    id,
    momentId,
    _count,
  } = data;

  const navigate = useNavigate();
  const { state } = useAuth();
  const { addToast } = useToast();
  // const actionRef = useRef(null);
  // states
  const [commentBoxOpened, setCommentBoxOpened] = useState(false);
  const [replies, setReplies] = useState();
  const [liked, setLiked] = useState(curUserLiked);
  const [openInput, setOpenInput] = useState(false);
  const [page, setPage] = useState(1);
  const [row, setRow] = useState(3);

  const actions = {
    id,
    comment: {
      commentBoxOpened,
      commentCount: _count.replies,
    },
    like: { liked, setLiked, count: _count.commentLikes },
  };

  const { error, loading, run } = useRequest(getChildrenMomentCommentsByPid, {
    manual: true,
    onSuccess: (result, params) => {
      setReplies(result);
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

  const hideReplyBtn = () => {
    setOpenInput(false);
    // actionRef.current.setShow(false);
  };

  const submitReplyToMomentCommentHandler = (data) => {
    console.log(data);
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

  const refreshData = (pid) => {
    run(page, row, pid);
  };

  //   let actionType;
  //   if (type === "comments") {
  //     actionType = "reply";
  //   } else if (type === "reply") {
  //     actionType = "subReply";
  //   }

  const replyObj = {
    momentId,
    parentId: parentId ? parentId : id,
    replyTo: parentId ? id : null,
  };

  return (
    <div className="comments-item" {...props}>
      <section className="user">
        <UserHeader user={user} size="sm" className="mr-auto" />
        <GyTime date={createdAt} className="date" />
      </section>
      <p className="content">{content}</p>
      <MomentCommentActionsBox
        actions={actions}
        clickBtnHandler={(type) => clickBtnHandler(type)}
        // ref={actionRef}
      />
      {/* comment input */}
      <CommentItemContext.Provider value={{ refreshData }}>
        {openInput && (
          <MomentInput
            type="reply"
            onSubmit={submitReplyToMomentCommentHandler}
            // replyObj={replyObj}
            // hideReplyBtn={hideReplyBtn}
          />
        )}
        {/* comment list */}
        {commentBoxOpened && (
          <>
            {replies && !loading && (
              <MomentCommentList count={replies?.meta.total} type="subReply">
                {replies?.data.map((item) => (
                  <MomentCommentSubItem
                    data={item}
                    // setData={setData}
                    key={item.id}
                    type={type}
                  />
                ))}
              </MomentCommentList>
            )}
            {loading && <GyLoader />}
            {replies?.hasMore && !loading && (
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
      </CommentItemContext.Provider>
    </div>
  );
};

export default MomentCommentItem;
