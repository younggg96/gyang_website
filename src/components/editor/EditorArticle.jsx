import React from "react";
import GyCard from "../../ui/GyCard/GyCard";
import GyInput from "../../ui/GyInput/GyInput";
import GyTextarea from "../../ui/GyTextarea/GyTextarea";
import GyUploader from "../../ui/GyUploader/GyUploader";
// editor
import MarkdownIt from "markdown-it";
import MdEditor from "react-markdown-editor-lite";
import "react-markdown-editor-lite/lib/index.css";
import { Controller } from "react-hook-form";

const mdParser = new MarkdownIt(/* Markdown-it options */);

const EditorArticle = ({ form }) => {
  const {
    register,
    control,
    formState: { errors },
  } = form;

  return (
    <GyCard>
      <GyCard title="Article Info" hasDivider={false}>
        <GyInput
          placeholder="Article title *"
          className="mb-6"
          form={register("title", {
            required: "Article title is required.",
          })}
          hasError={errors?.title}
          errorMsg={errors?.title?.message}
        />
        <GyTextarea
          placeholder="Short description *"
          form={register("description", {
            required: "Article description is required.",
          })}
          hasError={errors?.description}
          errorMsg={errors?.description?.message}
        />
      </GyCard>
      <GyCard title="Article Cover *" hasDivider={false}>
        <Controller
          name="img"
          control={control}
          form={register("img", {
            required: "Article cover is required.",
          })}
          render={({ field }) => {
            return (
              <GyUploader
                onFileChange={(file) => {
                  field.onChange(file);
                }}
                type="single"
                hasError={errors?.img}
                errorMsg={errors?.img?.message}
              />
            );
          }}
        />
      </GyCard>
      <GyCard title="Content *" hasDivider={false}>
        <Controller
          name="content"
          control={control}
          form={register("content", {
            required: "Article content is required.",
          })}
          render={({ field }) => {
            return (
              <MdEditor
                renderHTML={(text) => mdParser.render(text)}
                onChange={({ html, text }) => field.onChange(html)}
              />
            );
          }}
        />
        {errors.MdEditor && (
          <p className="error-msg">{errors.MdEditor.message}</p>
        )}
      </GyCard>
    </GyCard>
  );
};

export default EditorArticle;
