import React from "react";
import GyCard from "../../ui/GyCard/GyCard";

import useAuth from "../../hooks/useAuth";
import GyButton from "../../ui/GyButton/GyButton";
// icons
import { HiOutlinePencil } from "react-icons/hi";
import { BsBookmarksFill } from "react-icons/bs";
import { useNavigate } from "react-router-dom";

const EditorBtns = () => {
  const { state } = useAuth();
  const { user } = state;

  const navigate = useNavigate();

  const goNewArticle = () => {
    navigate("/article/new");
  };

  return (
    <GyCard title={"Hi " + user?.username + "!"}>
      <div className="flex gap-4">
        <GyButton
          icon={() => <HiOutlinePencil />}
          className="flex-1"
          title="Write a article"
          click={() => goNewArticle()}
        >
          Write
        </GyButton>
        <GyButton
          icon={() => <BsBookmarksFill />}
          size={["round"]}
          className={"w-12 h-12"}
          title="Your collection"
        ></GyButton>
      </div>
    </GyCard>
  );
};

export default EditorBtns;
