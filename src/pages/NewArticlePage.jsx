import React, { useState } from "react";
import GyBodySection from "../ui/GyBodySection/GyBodySection";
import EditorArticle from "../components/editor/EditorArticle";

import EditorBtnsComponents from "../components/editor/EditorBtns";
import { useForm } from "react-hook-form";

const NewArticlePage = () => {
  const form = useForm();
  const [uploadImg, setUploadImg] = useState([]);

  const onSubmit = (data) => {
    console.log("aaaa");
    if (!uploadImg.length) {
      form.setError("cover", {
        type: "required",
        message: "Article cover is required.",
      });
    }
    // run(data);
  };

  return (
    <GyBodySection>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <p>{JSON.stringify(uploadImg)}</p>
        <div className="page-section">
          <section className="left-section">
            <EditorArticle form={form} setUploadImg={setUploadImg} />
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
