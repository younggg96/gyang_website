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
import GyMasonryLayout from "../../ui/GyMasonryLayout/GyMasonryLayout";

export const commentContext = createContext();

/**
 *
 * @param {object} {type} list / grid
 * @param {object} {userId} get moments in user profile, use userId to getMoments
 */
const MomentList = ({ type, userId = null }) => {
  const [curPage, setCurPage] = useState(1);
  const [MomentList, setMomentList] = useState([]);
  const [pagination, setPagination] = useState();

  const { state } = useAuth();
  console.log(state.user.id);
  const getMoments = state.isAuth ? getMomentListAuth : getMomentList;
  const getData = !userId ? getMoments : getMomentListByUserId;

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
              <GyMasonryLayout items={MomentList}>
                {MomentList.map((item) => {
                  return (
                    <MomentItem
                      key={item.id}
                      data={item}
                      type={type}
                      className="grid-item"
                    />
                  );
                })}
              </GyMasonryLayout>
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
