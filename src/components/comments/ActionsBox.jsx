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

const LinkBtn = ({ clickHandler, liked, likeCount }) => {
  const ref = useRef(0);
  return (
    <>
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
        className="action-btn"
      >
        {liked ? (
          <MdFavorite color={colors.primary} />
        ) : (
          <MdFavoriteBorder color={colors.text} />
        )}
        <span className="count">
          {!!likeCount ? likeCount <= 1 ? `${likeCount} like` : `${likeCount} likes` : "Be the first to like it"}
        </span>
      </motion.button>
    </>
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

const ActionsBox = ({ actions }) => {
  const { id, comment, like } = actions;
  const { addToast } = useToast();

  // like
  const { liked, setLiked, momentlikes } = like;
  const [likeCount, setLikeCount] = useState(momentlikes.length);
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

  // comments
  const { commentBoxOpened, setCommentBoxOpened, momentComments } = comment;

  return (
    <ul className="flex gap-x-4">
      <li>
        <LinkBtn
          clickHandler={() => run(id)}
          liked={liked}
          likeCount={likeCount}
        />
      </li>
      <li>
        <CommentBtn
          commentBoxOpened={commentBoxOpened}
          clickHandler={() => {
            setCommentBoxOpened(!commentBoxOpened);
          }}
          commentCount={momentComments.length}
        />
      </li>
    </ul>
  );
};

export default ActionsBox;
