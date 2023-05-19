import React, {
  useState,
  useRef,
  forwardRef,
  useImperativeHandle,
} from "react";
import { colors } from "../../config";
import classNames from "classnames";
// hooks
import { useRequest } from "ahooks";
import useAuth from "../../hooks/useAuth";
// import ui
import { TIME, TYPE, useToast } from "../../ui/GyToast/ToastProvider";
import GyButton from "../../ui/GyButton/GyButton";
// import icons
import {
  MdFavorite,
  MdFavoriteBorder,
  MdOutlineBookmarkAdd,
  MdOutlineBookmarkAdded,
} from "react-icons/md";
import { BiCommentDetail } from "react-icons/bi";
// import motion
import { motion } from "framer-motion";
import { transition } from "../../helper/animation";
// import scss
import "./index.scss";
// apis
// import { addLikeMoment, removeLikeMoment } from "../../api";
import { addLikeArticle, removeLikeArticle } from "../../api/article";
import { addLikeComment, removeLikeComment } from "../../api/comment";

const LinkBtn = ({ clickHandler, liked, likeCount, inactive }) => {
  const ref = useRef(0);

  return (
    <div className={classNames({ inactive }, "action-btn")}>
      <motion.button
        key={ref.current}
        animate={
          ref.current === 0
            ? {}
            : {
                y: [0, 3, -3, 0],
              }
        }
        transition={transition}
        onClick={() => {
          clickHandler();
          ref.current++;
        }}
      >
        {liked ? (
          <MdFavorite color={colors.primary} />
        ) : (
          <MdFavoriteBorder color={colors.text} />
        )}
      </motion.button>
      <span className="count">
        {!!likeCount
          ? likeCount <= 1
            ? `${likeCount} like`
            : `${likeCount} likes`
          : "Like"}
      </span>
    </div>
  );
};

const CommentBtn = ({ commentBoxOpened, clickHandler, commentCount }) => {
  if (!commentCount) return null;
  return (
    <button className="action-btn" onClick={() => clickHandler()}>
      <BiCommentDetail
        color={commentBoxOpened ? colors.primary : colors.text}
      />
      <span className="count">
        {commentCount} {commentCount > 1 ? "replies" : "reply"}
      </span>
    </button>
  );
};

const CommentArticleBtn = ({ clickHandler, commentCount }) => {
  return (
    <button className="action-btn" onClick={() => clickHandler()}>
      <BiCommentDetail color={colors.text} />
      <span className="count">
        {commentCount} {commentCount > 1 ? "comments" : "comment"}
      </span>
    </button>
  );
};
const SaveArticleBtn = ({ clickHandler, saveStatus }) => {
  return (
    <button className="action-btn" onClick={() => clickHandler()}>
      {saveStatus ? (
        <MdOutlineBookmarkAdded color={colors.text} />
      ) : (
        <MdOutlineBookmarkAdd color={colors.text} />
      )}
      <span className="count">{saveStatus ? "Saved" : "Save"}</span>
    </button>
  );
};

const ReplyBtn = ({ clickHandler, show, setShow }) => {
  return (
    <GyButton
      size={["sm", "round"]}
      onClick={() => {
        setShow(!show);
        clickHandler();
      }}
      className="!m-0"
    >
      {!show ? "Reply" : "Hide reply"}
    </GyButton>
  );
};

const ActionsBox = forwardRef(
  ({ actions, className, clickBtnHandler, type, ...props }, ref) => {
    const { id, comment, like } = actions;
    const { addToast } = useToast();
    const { state } = useAuth();

    // like
    const { liked, setLiked, count } = like;
    const [likeCount, setLikeCount] = useState(count);
    const likeAct = !liked ? addLikeComment : removeLikeComment;
    const { error, loading, run } = useRequest(likeAct, {
      manual: true,
      onSuccess: (result, params) => {
        setLiked(!liked);
        setLikeCount(result.data?.count);
        addToast({
          content: result.data?.success,
          time: TIME.SHORT,
          type: TYPE.SUCCESS,
        });
      },
    });

    const clickLike = () => {
      if (state.isAuth) {
        run(id);
      }
    };

    // reply btn hide or not
    const [show, setShow] = useState(false);

    useImperativeHandle(ref, () => ({
      setShow,
    }));

    return (
      <ul
        className={classNames(["action-box-btns", className])}
        {...props}
        ref={ref}
      >
        <li>
          <LinkBtn
            clickHandler={clickLike}
            liked={liked}
            likeCount={likeCount}
            inactive={!state.isAuth}
          />
        </li>
        {type !== "subReply" && (
          <li>
            <CommentBtn
              commentBoxOpened={comment?.commentBoxOpened}
              clickHandler={() => clickBtnHandler("commentBtn")}
              commentCount={comment?.commentCount}
            />
          </li>
        )}
        {state.isAuth && (
          <li className="ml-auto">
            <ReplyBtn
              show={show}
              setShow={setShow}
              clickHandler={() => clickBtnHandler("replyBtn")}
            />
          </li>
        )}
      </ul>
    );
  }
);

export const ActionsFlowBox = ({
  actions,
  className,
  clickBtnHandler,
  ...props
}) => {
  const { id, comment, like } = actions;
  const { addToast } = useToast();
  const { state } = useAuth();

  // like
  const { curUserLiked, count } = like;
  const [liked, setLiked] = useState(curUserLiked);
  const [likeCount, setLikeCount] = useState(count);
  const likeAct = !liked ? addLikeArticle : removeLikeArticle;
  const { error, loading, run } = useRequest(likeAct, {
    manual: true,
    onSuccess: (result, params) => {
      setLiked(!liked);
      setLikeCount(result.data?.count);
      // addToast({
      //   content: result.data?.success,
      //   time: TIME.SHORT,
      //   type: TYPE.SUCCESS,
      // });
    },
  });

  const clickLike = () => {
    if (state.isAuth) {
      run(id);
    }
  };

  // comments
  const { commentCount } = comment;

  return (
    <div className="action-flow-box">
      <ul className={classNames(["btns", className])} {...props}>
        <li>
          <LinkBtn
            clickHandler={clickLike}
            liked={liked}
            likeCount={likeCount}
            inactive={!state.isAuth}
          />
        </li>
        <li>
          <CommentArticleBtn
            clickHandler={() => clickBtnHandler("commentBtn")}
            commentCount={commentCount}
          />
        </li>
        <li>
          <SaveArticleBtn
            clickHandler={() => clickBtnHandler("saveBtn")}
            saveStatus={false}
          />
        </li>
      </ul>
    </div>
  );
};

export default ActionsBox;
