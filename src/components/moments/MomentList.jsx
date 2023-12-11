import React, { useState, useEffect } from "react";
import classNames from "classnames";
// hooks
import { useToggle } from "ahooks";
import { useImperativeHandle } from "react";
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
// icons
import { FaThList } from "react-icons/fa";
import { BsGridFill } from "react-icons/bs";
// ui
import GyToggle from "../../ui/GyToggle/GyToggle";
import GyToggleGroup from "../../ui/GyToggle/GyToggleGroup";
import GyLoader from "../../ui/GyLoader/GyLoader";
import GyPagination from "../../ui/GyPagination/GyPagination";
import GyMasonryLayout from "../../ui/GyMasonryLayout/GyMasonryLayout";

/**
 *
 * @param {object} {userId} get moments in user profile, use userId to getMoments
 */
const MomentList = React.forwardRef(({ userId = null }, ref) => {
  // states
  const [curPage, setCurPage] = useState(1);
  const [MomentList, setMomentList] = useState([]);
  const [pagination, setPagination] = useState();
  const [toggleState, { setLeft, setRight }] = useToggle("list", "grid");

  // get data
  const { state } = useAuth();
  const getMoments = state.isAuth ? getMomentListAuth : getMomentList;
  const getData = !userId ? getMoments : getMomentListByUserId;

  // api
  const { error, loading, run } = useRequest(getData, {
    manual: true,
    onSuccess: (result, params) => {
      setMomentList(result?.data);
      setPagination(result?.meta);
    },
  });

  // ref
  useImperativeHandle(ref, () => ({
    refreshMomentList,
  }));
  const refreshMomentList = () => {
    run(curPage, state.user.id);
  };

  
  useEffect(() => {
    run(curPage, state.isAuth ? state.user.id : null);
  }, [curPage]);

  if (error) {
    return <div>failed to load</div>;
  }

  const MomentBtns = () => {
    return (
      <section className="moments-btns">
        <GyToggleGroup className="grid-list-btn">
          <GyToggle click={setLeft} active={toggleState === "list"}>
            <FaThList />
          </GyToggle>
          <GyToggle click={setRight} active={toggleState === "grid"}>
            <BsGridFill />
          </GyToggle>
        </GyToggleGroup>
      </section>
    );
  };

  return (
    <>
      {!loading && <MomentBtns />}
      <section className="moment-list">
        <div
          className={classNames([
            "moment-list__content",
            { "list-layout": toggleState === "list" },
            { "grid-layout": toggleState === "grid" },
          ])}
        >
          {loading && <GyLoader />}
          {!loading && (
            <>
              {toggleState === "list" && (
                <ul>
                  {MomentList.map((item) => {
                    return <MomentItem key={item.id} data={item} type={toggleState} />;
                  })}
                </ul>
              )}
              {toggleState === "grid" && (
                <GyMasonryLayout items={MomentList}>
                  {MomentList.map((item) => {
                    return (
                      <MomentItem
                        key={item.id}
                        data={item}
                        type={toggleState}
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
    </>
  );
});

export default MomentList;
