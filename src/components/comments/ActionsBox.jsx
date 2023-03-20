import React, { useState, useRef } from "react";
// import ui
import { TIME, TYPE, useToast } from "../../ui/GyToast/ToastProvider";
// import icons
import { MdFavorite, MdFavoriteBorder } from "react-icons/md";
import { BiCommentDetail } from "react-icons/bi";
import { colors } from "../../config";
// import motion
import { motion } from "framer-motion";
import { transition } from "../../helper/animation";
// import scss
import "./index.scss";
import { useRequest } from "ahooks";
// apis
import { addLikeMoment, removeLikeMoment } from "../../api";
import useAuth from "../../hooks/useAuth";
import classNames from "classnames";
import GyButton from "../../ui/GyButton/GyButton";

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
          : "Be the first to like it"}
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
        {commentCount} {commentCount > 1 ? "replies" : "reply"}
      </span>
    </button>
  );
};

const ReplyBtn = ({ clickHandler }) => {
  const [show, setShow] = useState(false);
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

const ActionsBox = ({ actions, className, clickBtnHandler, ...props }) => {
  const { id, comment, like } = actions;
  const { addToast } = useToast();
  const { state } = useAuth();

  // like
  const { liked, setLiked, count } = like;
  const [likeCount, setLikeCount] = useState(count);
  const likeAct = !liked ? addLikeMoment : removeLikeMoment;
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

  // comments
  const { commentBoxOpened, commentCount } = comment;

  return (
    <ul
      className={classNames(["flex items-center gap-x-4", className])}
      {...props}
    >
      <li>
        <LinkBtn
          clickHandler={clickLike}
          liked={liked}
          likeCount={likeCount}
          inactive={!state.isAuth}
        />
      </li>
      <li>
        <CommentBtn
          commentBoxOpened={commentBoxOpened}
          clickHandler={() => clickBtnHandler("commentBtn")}
          commentCount={commentCount}
        />
      </li>
      <li className="ml-auto">
        <ReplyBtn clickHandler={() => clickBtnHandler("replyBtn")} />
      </li>
    </ul>
  );
};

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
  const { liked, setLiked, count } = like;
  const [likeCount, setLikeCount] = useState(count);
  // const likeAct = !liked ? addLikeMoment : removeLikeMoment;
  // const { error, loading, run } = useRequest(likeAct, {
  //   manual: true,
  //   onSuccess: (result, params) => {
  //     setLiked(!liked);
  //     setLikeCount(result.data?.count);
  //     addToast({
  //       content: result.data?.success,
  //       time: TIME.SHORT,
  //       type: TYPE.SUCCESS,
  //     });
  //   },
  // });

  const clickLike = () => {
    if (state.isAuth) {
      // run(id);
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
      </ul>
    </div>
  );
};

export default ActionsBox;
