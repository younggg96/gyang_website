import React, { useState, useRef, useContext } from "react";
// import icons
import { MdFavorite, MdFavoriteBorder } from "react-icons/md";
import { BiCommentDetail } from "react-icons/bi";
import { colors } from "../../config";
// import motion
import { motion } from "framer-motion";
import { transition } from "../../helper/animation";
// import scss
import "./index.scss";
import { commentContext } from "../moments/MomentList";

const LinkBtn = () => {
  const { like } = useContext(commentContext);
  const { liked, setLiked, likeCount } = like;
  const ref = useRef(0);
  return (
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
        setLiked(!liked);
        ref.current++;
      }}
      className="action-btn"
    >
      {liked ? (
        <MdFavorite color={colors.primary} />
      ) : (
        <MdFavoriteBorder color={colors.text} />
      )}
      {!!likeCount && <span className="count">{likeCount}</span>}
    </motion.button>
  );
};

const CommentBtn = () => {
  const { comment } = useContext(commentContext);
  const { commentBoxOpened, setCommentBoxOpened, commentCount } = comment;
  return (
    <button
      className="action-btn"
      onClick={() => {
        setCommentBoxOpened(!commentBoxOpened);
      }}
    >
      <BiCommentDetail color={colors.text} />
      <span className="count">{commentCount}</span>
    </button>
  );
};

const ActionsBox = () => {
  return (
    <ul className="flex gap-x-4">
      <li>
        <LinkBtn />
      </li>
      <li>
        <CommentBtn />
      </li>
    </ul>
  );
};

export default ActionsBox;
