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
  return (
    <button className="action-btn" onClick={() => clickHandler()}>
      <BiCommentDetail
        color={commentBoxOpened ? colors.primary : colors.text}
      />
      <span className="count">{commentCount}</span>
    </button>
  );
};

const ActionsBox = ({ actions, className, clickCommentHandler, ...props }) => {
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
    <ul className={classNames(["flex gap-x-4", className])} {...props}>
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
          clickHandler={() => clickCommentHandler()}
          commentCount={commentCount}
        />
      </li>
    </ul>
  );
};

export default ActionsBox;
