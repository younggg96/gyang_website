import React, { useState, useEffect, createContext } from "react";
import { useRequest } from "ahooks";
// api
import { getMomentList, getMomentListByUserId } from "../../api";
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

export const commentContext = createContext();

const MomentItem = (props) => {
  const { content, imgs, createdAt, id } = props.data;
  const [commentBoxOpened, setCommentBoxOpened] = useState(false);
  const [liked, setLiked] = useState(false);
  const value = {
    comment: { commentBoxOpened, setCommentBoxOpened, commentCount: 5 },
    like: { liked, setLiked, likeCount: 5 },
  };
  return (
    <li className="moment-item">
      <div className="user">
        {props.data.user && <UserHeader user={props.data.user} size="sm" />}
        <GyTime date={createdAt} className="date" />
      </div>
      <p className="content">{content}</p>
      {!!imgs.length && (
        <div className="imgs">
          {imgs.map((img) => {
            return <img src={img.url} alt={"header-img"} key={img.id} />;
          })}
        </div>
      )}
      <commentContext.Provider value={value}>
        <div className="actions-box">
          <ActionsBox />
        </div>
        {commentBoxOpened && <CommentList />}
      </commentContext.Provider>
    </li>
  );
};

const MomentList = ({ userId = null }) => {
  const [curPage, setCurPage] = useState(1);
  const [MomentList, setMomentList] = useState([]);
  const [pagination, setPagination] = useState();

  const getData = !userId ? getMomentList : getMomentListByUserId;

  const { error, loading, run } = useRequest(getData, {
    manual: true,
    onSuccess: (result, params) => {
      setMomentList(result?.data);
      setPagination(result?.meta);
    },
  });
  useEffect(() => {
    run(curPage, userId);
  }, [curPage, userId]);

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
