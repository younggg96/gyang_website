import React from "react";
import { useRef } from "react";
// hooks
import { useToggle } from "ahooks";
import useAuth from "../../hooks/useAuth";
// icons
import { FaThList } from "react-icons/fa";
import { BsGridFill } from "react-icons/bs";
// components
import EditorInput from "../editor/EditorInput";
import MomentList from "./MomentList";
// ui
import GyToggleGroup from "../../ui/GyToggle/GyToggleGroup";
import GyToggle from "../../ui/GyToggle/GyToggle";
// scss
import "./index.scss";
import ChatRoom from "../chat/ChatRoom";

const Moments = () => {
  const { state } = useAuth();
  const [toggleState, { setLeft, setRight }] = useToggle("list", "grid");
  // ref
  const listRef = useRef(null);

  const updateMomentList = () => {
    listRef.current && listRef.current.refreshMomentList();
  };

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
    <div className="moments">
      {state.isAuth && <EditorInput updateMomentList={updateMomentList} />}
      <MomentBtns />
      <MomentList type={toggleState} ref={listRef} />
    </div>
  );
};

export default Moments;
