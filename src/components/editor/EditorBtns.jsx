import React from "react";
import GyCard from "../../ui/GyCard/GyCard";

import useAuth from "../../hooks/useAuth";
import GyButton from "../../ui/GyButton/GyButton";
// icons
import { HiOutlinePencil } from "react-icons/hi";
import { BsBookmarksFill } from "react-icons/bs";

const EditorBtns = () => {
  const { state } = useAuth();
  const { user } = state;
  return (
    <GyCard title={"Hi " + user?.username + "!"}>
      <div className="flex gap-4">
        <GyButton icon={() => <HiOutlinePencil />} className="flex-1" title="Write a article">Write</GyButton>
        <GyButton icon={() => <BsBookmarksFill />} size="round w-12 h-12" title="Your collection"></GyButton>
      </div>
    </GyCard>
  );
};

export default EditorBtns;
