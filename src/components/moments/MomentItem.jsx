import React, { useState } from "react";
// components
import UserHeader from "../user/UserHeader";
// ui
import GyTime from "../../ui/GyTime/GyTime";

// scss
import "./index.scss";
import ActionsBox from "../comments/ActionsBox";
import useAuth from "../../hooks/useAuth";
import { TIME, TYPE, useToast } from "../../ui/GyToast/ToastProvider";
import { useNavigate } from "react-router-dom";
import GyImgSwiper from "../../ui/GyImgSwiper/GyImgSwiper";

const ImgList = ({ imgs }) => {
  return (
    <>
      {!!imgs.length && (
        <div className="imgs">
          {imgs.map((img) => {
            return <img src={img.url} alt="moment img" key={img.id} />;
          })}
        </div>
      )}
    </>
  );
};

const MomentItem = ({ data, type = "list" }) => {
  const { id, user, content, imgs, createdAt, curUserLiked, _count } = data;
  // states
  const [commentBoxOpened, setCommentBoxOpened] = useState(false);
  const [liked, setLiked] = useState(curUserLiked);
  // const [page, setPage] = useState(1);
  // const [row, setRow] = useState(3);
  // hooks
  const { addToast } = useToast();
  const navigate = useNavigate();
  const { state } = useAuth();

  const actions = {
    id,
    comment: {
      commentBoxOpened,
      commentCount: 1,
    },
    like: { liked, setLiked, count: 0 },
  };

  const clickCommentBtn = () => {
    if (commentBoxOpened) {
      // close comment list back to page 1
      // setPage(1);
      // setRow(3);
      setCommentBoxOpened(!commentBoxOpened);
    } else {
      if (state.isAuth) {
        setCommentBoxOpened(!commentBoxOpened);
        // run(page, row, id);
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

  const clickBtnHandler = (btnType) => {
    switch (btnType) {
      case "commentBtn":
        clickCommentBtn();
        break;
      case "replyBtn":
        // clickReplyBtn();
        break;
      default:
        break;
    }
  };

  return (
    <>
      {type === "list" && (
        <li className="moment-item">
          {/* user header & moment date */}
          <section className="user">
            {user && <UserHeader user={user} size="sm" />}
            <GyTime date={createdAt} className="date text-xs" />
          </section>
          {/* content */}
          <p className="content">{content}</p>
          {/* imgs */}
          <ImgList imgs={imgs} />
          {/* user actions */}
          <ActionsBox
            actions={actions}
            type="comments"
            clickBtnHandler={(type) => clickBtnHandler(type)}
          />
          {/* comment list */}
          {commentBoxOpened && (
            <>aaa</>
            // <CommentList
            //   data={momentCommentList}
            //   setData={setMomentCommentList}
            //   count={5}
            //   type="comments"
            // />
          )}
        </li>
      )}
      {type === "grid" && (
        <div className="moment-item-card">
          {/* imgs */}
          <GyImgSwiper imgs={imgs} className="moment-item-card__imgs"/>
          {/* content */}
          <p class="content">{content}</p>
          {/* user header & moment date */}
          <section className="user">
            {user && <UserHeader user={user} size="xs" />}
            <GyTime date={createdAt} className="date text-xs" />
          </section>
        </div>
      )}
    </>
  );
};

export default MomentItem;
