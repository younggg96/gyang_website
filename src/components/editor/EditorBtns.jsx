import React from "react";
import GyCard from "../../ui/GyCard/GyCard";

import useAuth from "../../hooks/useAuth";
import GyButton from "../../ui/GyButton/GyButton";
// icons
import { HiOutlineDocumentText, HiOutlinePencil } from "react-icons/hi";
import { BsBookmarksFill } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import GySelector from "../../ui/GySelector/GySelector";
import { MdSaveAlt } from "react-icons/md";
import { Controller } from "react-hook-form";

const EditorSubmitBtns = ({ form }) => {
  const {
    register,
    control,
    formState: { errors },
  } = form;

  return (
    <GyCard>
      <div className="mb-2">
        <Controller
          name="category"
          control={control}
          form={register("category", {
            required: "Article category is required.",
          })}
          render={({ field }) => {
            return (
              <GySelector
                placeHolder="Select category..."
                title="Category *"
                onSelect={(data) => {
                  field.onChange(data);
                }}
                hasError={errors?.category}
                errorMsg={errors?.category?.message}
              ></GySelector>
            );
          }}
        />
      </div>
      <div className="flex flex-col gap-4">
        <GyButton
          icon={() => <MdSaveAlt />}
          title="Publish your article"
          variant="contained"
          type="submit"
        >
          Publish
        </GyButton>
        <GyButton
          icon={() => <HiOutlineDocumentText />}
          title="Save your article as a draft"
          variant="text"
        >
          Save as draft
        </GyButton>
      </div>
    </GyCard>
  );
};

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

export default { EditorBtns, EditorSubmitBtns };
