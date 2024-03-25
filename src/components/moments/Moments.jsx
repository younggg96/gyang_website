import React from "react";
// hooks
import useAuth from "../../hooks/useAuth";
// components
import EditorInput from "../editor/EditorInput";
import MomentList from "./MomentList";
// scss
import "./index.scss";

const Moments = ({ getMomentListRequest, momentList, curPage }) => {
  const { state } = useAuth();

  const updateMomentList = () => {
    getMomentListRequest.run(curPage, state.user.id);
  };

  return (
    <div className="moments">
      {state.isAuth && <EditorInput updateMomentList={updateMomentList} />}
      <MomentList
        momentList={momentList}
        getMomentListRequest={getMomentListRequest}
      />
    </div>
  );
};

export default Moments;
