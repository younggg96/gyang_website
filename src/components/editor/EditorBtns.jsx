import React, { useState } from "react";
import { useRequest } from "ahooks";
import { Controller } from "react-hook-form";
import { useNavigate } from "react-router-dom";
// scss
import "./index.scss";

// hooks
import useAuth from "../../hooks/useAuth";
import GyCard from "../../ui/GyCard/GyCard";
import GyButton from "../../ui/GyButton/GyButton";
import GySelector from "../../ui/GySelector/GySelector";
// apis
import { getCates } from "../../api/article";
// icons
import { HiOutlinePencil } from "react-icons/hi";
import { BsBookmarksFill } from "react-icons/bs";
import { FaUserCircle } from "react-icons/fa";
import { MdSaveAlt } from "react-icons/md";

const EditorSubmitBtns = ({ form }) => {
  const {
    register,
    control,
    formState: { errors },
  } = form;
  const [options, setOptions] = useState([]);

  const articleVisibilityOptions = [
    { title: "Public", id: true },
    { title: "Private", id: false },
  ];

  const { error, loading } = useRequest(getCates, {
    manual: false,
    onSuccess: (result) => {
      setOptions(result.data);
    },
  });

  return (
    <GyCard>
      <div className="mb-2">
        <Controller
          name="categoryIds"
          control={control}
          form={register("categoryIds", {
            required: "Article category is required.",
          })}
          render={({ field }) => {
            return (
              <GySelector
                placeHolder="Select category..."
                title="Category *"
                onSelect={(data) => {
                  field.onChange(data.map((item) => item.id));
                }}
                options={options}
                hasError={errors?.categoryIds}
                errorMsg={errors?.categoryIds?.message}
              ></GySelector>
            );
          }}
        />
      </div>
      <div className="mb-2">
        <Controller
          name="published"
          control={control}
          form={register("published", {
            required: "Article visibility is required.",
          })}
          render={({ field }) => {
            return (
              <GySelector
                placeHolder="Select article visibility..."
                title="Visibility *"
                onSelect={(data) => {
                  console.log(data);
                  field.onChange(data[0]?.id);
                }}
                multiple={false}
                options={articleVisibilityOptions}
                hasError={errors?.published}
                errorMsg={errors?.published?.message}
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
        {/* <GyButton
          icon={() => <HiOutlineDocumentText />}
          title="Save your article as a draft"
          variant="text"
          type="submit"
        >
          Save as draft
        </GyButton> */}
      </div>
    </GyCard>
  );
};

const EditorBtns = () => {
  const { state } = useAuth();
  const { isAuth, user } = state;

  const navigate = useNavigate();

  const goNewArticle = () => {
    navigate("/article/new");
  };
  const goSignin = () => {
    navigate("/auth");
  };

  return (
    <GyCard title={isAuth ? `Hi ${user?.username}!` : "Get started"}>
      {isAuth ? (
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
            className="w-12 h-12"
            title="Your collection"
          ></GyButton>
        </div>
      ) : (
        <GyButton
          icon={() => <FaUserCircle />}
          title="Get started"
          click={() => goSignin()}
        >
          Sign In
        </GyButton>
      )}
    </GyCard>
  );
};

export default { EditorBtns, EditorSubmitBtns };
