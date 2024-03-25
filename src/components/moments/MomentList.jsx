import React from "react";
import classNames from "classnames";
// hooks
import { useToggle } from "ahooks";
// components
import MomentItem from "./MomentItem";
import EmptyData from "../error/EmptyData";
// icons
import { FaThList } from "react-icons/fa";
import { BsGridFill } from "react-icons/bs";
// ui
import GyToggle from "../../ui/GyToggle/GyToggle";
import GyToggleGroup from "../../ui/GyToggle/GyToggleGroup";
import GyLoader from "../../ui/GyLoader/GyLoader";
import GyMasonryLayout from "../../ui/GyMasonryLayout/GyMasonryLayout";

const MomentList = React.forwardRef(({ getMomentListRequest, momentList }) => {
  // states
  const [toggleState, { setLeft, setRight }] = useToggle("list", "grid");

  const { error, loading } = getMomentListRequest;

  if (error) {
    return <div>failed to load</div>;
  }

  const MomentLayoutSwitch = () => {
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
      {!!!loading && !!momentList.length && <MomentLayoutSwitch />}
      <section className="moment-list">
        <div
          className={classNames([
            "moment-list__content",
            { "list-layout": toggleState === "list" },
            { "grid-layout": toggleState === "grid" },
          ])}
        >
          {loading ? (
            <GyLoader />
          ) : (
            <>
              {toggleState === "list" && (
                <ul>
                  {momentList.map((item) => {
                    return (
                      <MomentItem
                        key={item.id}
                        data={item}
                        type={toggleState}
                      />
                    );
                  })}
                </ul>
              )}
              {toggleState === "grid" && (
                <GyMasonryLayout items={momentList}>
                  {momentList.map((item) => {
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
              {!!!momentList.length && (
                <EmptyData content={{ sub: "No data..." }}></EmptyData>
              )}
            </>
          )}
        </div>
      </section>
    </>
  );
});

export default MomentList;
