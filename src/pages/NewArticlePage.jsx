import React, { useState } from "react";
import GyBodySection from "../ui/GyBodySection/GyBodySection";
import EditorArticle from "../components/editor/EditorArticle";

import EditorBtnsComponents from "../components/editor/EditorBtns";
import { useForm } from "react-hook-form";
import { useRequest } from "ahooks";
import { uploadImg } from "../api/upload";
import { createArticle } from "../api/article";

const NewArticlePage = () => {
  const form = useForm();

  const uploadImgRequest = useRequest(uploadImg, {
    manual: true,
  });
  // const createArticleRequest = useRequest(createArticle, {
  //   manual: true,
  // });

  const onSubmit = async (data) => {
    try {
      const file = await uploadImgRequest.runAsync(data.img[0].file);
      console.log(data.categoryIds);
      const obj = {
        ...data,
        categoryIds: [1, 3],
        img: file.data.url,
      };
      console.log(obj);
      await createArticle(obj);
    } catch (error) {
      console.log(error);
    }
    // run(data);
  };

  return (
    <GyBodySection>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <div className="page-section">
          <section className="left-section">
            <EditorArticle form={form} />
          </section>
          <section className="right-section">
            <div className="sticky-side">
              <EditorBtnsComponents.EditorSubmitBtns form={form} />
            </div>
          </section>
        </div>
      </form>
    </GyBodySection>
  );
};

export default NewArticlePage;
