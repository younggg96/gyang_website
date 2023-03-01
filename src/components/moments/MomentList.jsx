import React, { useState } from "react";
import { useRequest } from "ahooks";
import GyTime from "../../ui/GyTime/GyTime";

import "./index.scss";
import UserHeader from "../user/UserHeader";
import GyPagination from "../../ui/GyPagination/GyPagination";
import { useEffect } from "react";
import { getMomentList, getMomentListByUserId } from "../../api";
import GyLoader from "../../ui/GyLoader/GyLoader";
import EditorInput from "../editor/EditorInput";

const MomentItem = (props) => {
  const { content, imgs, createdAt, id } = props.data;
  return (
    <li className="moment-item">
      <div className="user">
        {props.data.user && <UserHeader user={props.data.user} size="sm" />}
        <GyTime date={createdAt} className="date" />
      </div>
      <p className="content">{content}</p>
      <div className="imgs">
        {imgs.map((img) => {
          return <img src={img.url} alt={"header-img"} key={img.id} />;
        })}
      </div>
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
