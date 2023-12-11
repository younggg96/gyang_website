import React from "react";
import { useRef } from "react";
// hooks
import { useToggle } from "ahooks";
import useAuth from "../../hooks/useAuth";
// components
import EditorInput from "../editor/EditorInput";
import MomentList from "./MomentList";
// scss
import "./index.scss";

const Moments = () => {
  const { state } = useAuth();
  // ref
  const listRef = useRef(null);

  const updateMomentList = () => {
    listRef.current && listRef.current.refreshMomentList();
  };
  return (
    <div className="moments">
      {state.isAuth && <EditorInput updateMomentList={updateMomentList} />}
      <MomentList ref={listRef} />
    </div>
  );
};

export default Moments;
