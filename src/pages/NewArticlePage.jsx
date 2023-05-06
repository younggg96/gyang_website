import React, { useState } from "react";
import GyBodySection from "../ui/GyBodySection/GyBodySection";
import EditorArticle from "../components/editor/EditorArticle";

import EditorBtnsComponents from "../components/editor/EditorBtns";
import { useForm } from "react-hook-form";

const NewArticlePage = () => {
  const form = useForm();

  const onSubmit = (data) => {
    console.log(data);
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
