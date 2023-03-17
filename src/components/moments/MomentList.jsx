import React, { useState, useEffect, createContext } from "react";
import { useRequest } from "ahooks";
// api
import {
  getMomentList,
  getMomentListByUser,
  getMomentListByUserId,
} from "../../api";
// components
import UserHeader from "../user/UserHeader";
import EditorInput from "../editor/EditorInput";
// ui
import GyTime from "../../ui/GyTime/GyTime";
import GyLoader from "../../ui/GyLoader/GyLoader";
import GyPagination from "../../ui/GyPagination/GyPagination";

// scss
import "./index.scss";
import ActionsBox from "../comments/ActionsBox";
import CommentList from "../comments/CommentList";
import useAuth from "../../hooks/useAuth";

export const commentContext = createContext();

const ImgList = ({ imgs }) => {
  return (
    <>
      {!!imgs.length && (
        <div className="imgs">
          {imgs.map((img) => {
            return <img src={img.url} alt={"header-img"} key={img.id} />;
          })}
        </div>
      )}
    </>
  );
};

const MomentItem = ({ data }) => {
  const {
    id,
    user,
    content,
    imgs,
    createdAt,
    momentlikes,
    curUserLiked,
    momentComments,
  } = data;
  const [commentBoxOpened, setCommentBoxOpened] = useState(false);
  const [liked, setLiked] = useState(curUserLiked);
  const actions = {
    id,
    comment: {
      commentBoxOpened,
      setCommentBoxOpened,
      commentData: momentComments.length,
    },
    like: { liked, setLiked, likeData: momentlikes.length },
  };
  return (
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
      <ActionsBox actions={actions} />
      {/* comment list */}
      {commentBoxOpened && <CommentList data={momentComments} type="comment" />}
    </li>
  );
};

const MomentList = ({ userId = null }) => {
  const [curPage, setCurPage] = useState(1);
  const [MomentList, setMomentList] = useState([]);
  const [pagination, setPagination] = useState();

  const { state } = useAuth();
  const getMoments = state.isAuth ? getMomentListByUser : getMomentList;
  const getData = !userId ? getMoments : getMomentListByUserId;

  const { error, loading, run } = useRequest(getData, {
    manual: true,
    onSuccess: (result, params) => {
      setMomentList(result?.data);
      setPagination(result?.meta);
    },
  });
  useEffect(() => {
    run(curPage, userId);
  }, [curPage, run, userId]);

  if (error) {
    return <div>failed to load</div>;
  }

  return (
    <section className="moment-list">
      {!userId && <EditorInput />}
      <div className="list">
        {loading && <GyLoader />}
        <ul>
          {MomentList.map((item) => {
            return <MomentItem key={item.id} data={item} />;
          })}
        </ul>
        <GyPagination
          row={pagination?.row}
          curPage={pagination?.current_page}
          pageRow={pagination?.page_row}
          onCurPageChange={(page) => {
            setCurPage(page);
          }}
        />
      </div>
    </section>
  );
};

export default MomentList;
