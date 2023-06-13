import React, { useState, useEffect, createContext } from "react";
// hooks
import { useRequest } from "ahooks";
import useAuth from "../../hooks/useAuth";
// api
import {
  getMomentList,
  getMomentListAuth,
  getMomentListByUserId,
} from "../../api/moments";
// components
import MomentItem from "./MomentItem";
// ui
import GyLoader from "../../ui/GyLoader/GyLoader";
import GyPagination from "../../ui/GyPagination/GyPagination";
// scss
import "./index.scss";
import classNames from "classnames";

export const commentContext = createContext();

const MomentList = ({ type }) => {
  const [curPage, setCurPage] = useState(1);
  const [MomentList, setMomentList] = useState([]);
  const [pagination, setPagination] = useState();

  const { state } = useAuth();
  const getMoments = state.isAuth ? getMomentListAuth : getMomentList;
  const getData = state.user.id ? getMoments : getMomentListByUserId;

  const { error, loading, run } = useRequest(getData, {
    manual: true,
    onSuccess: (result, params) => {
      setMomentList(result?.data);
      setPagination(result?.meta);
    },
  });

  useEffect(() => {
    run(curPage, state.user.id);
  }, [curPage, run, state.user.id]);

  if (error) {
    return <div>failed to load</div>;
  }

  return (
    <section className="moment-list">
      <div
        className={classNames([
          "moment-list__content",
          { "list-layout": type === "list" },
          { "grid-layout": type === "grid" },
        ])}
      >
        {loading && <GyLoader />}
        {!loading && (
          <>
            {type === "list" && (
              <ul>
                {MomentList.map((item) => {
                  return <MomentItem key={item.id} data={item} type={type} />;
                })}
              </ul>
            )}
            {type === "grid" && (
              <>
                {MomentList.map((item) => {
                  return <MomentItem key={item.id} data={item} type={type} />;
                })}
              </>
            )}
          </>
        )}
      </div>
      {!loading && (
        <GyPagination
          row={pagination?.row}
          curPage={pagination?.current_page}
          pageRow={pagination?.page_row}
          onCurPageChange={(page) => {
            setCurPage(page);
          }}
        />
      )}
    </section>
  );
};

export default MomentList;
