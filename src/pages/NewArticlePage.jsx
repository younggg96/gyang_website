import React from "react";
import GyBodySection from "../ui/GyBodySection/GyBodySection";
import EditorArticle from "../components/editor/EditorArticle";

import EditorBtnsComponents from "../components/editor/EditorBtns";
import { useForm } from "react-hook-form";
import { useRequest } from "ahooks";
import { uploadImg } from "../api/upload";
import { createArticle } from "../api/article";
import { TIME, TYPE, useToast } from "../ui/GyToast/ToastProvider";
import { useNavigate } from "react-router-dom";

const NewArticlePage = () => {
  const form = useForm();
  const { addToast } = useToast();
  const navigate = useNavigate();

  const uploadImgRequest = useRequest(uploadImg, {
    manual: true,
  });
  const createArticleRequest = useRequest(createArticle, {
    manual: true,
  });

  const onSubmit = async (data) => {
    try {
      addToast({
        content: "Uploading article cover image...",
        time: TIME.SHORT,
        type: TYPE.INFO,
      });
      const file = await uploadImgRequest.runAsync(data.img[0].file);
      addToast({
        content: "Generating your article...",
        time: TIME.SHORT,
        type: TYPE.INFO,
      });
      await createArticleRequest
        .runAsync({
          ...data,
          img: file.data.url,
        })
        .then((newArticle) => {
          addToast({
            content: "Your article created, redirecting...",
            time: TIME.SHORT,
            type: TYPE.INFO,
          });
          navigate("/article/" + newArticle.data.id);
        });
    } catch (error) {
      console.log(error);
    }
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
