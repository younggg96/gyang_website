import React from "react";
import GyBodySection from "../ui/GyBodySection/GyBodySection";
import EditorArticle from "../components/editor/EditorArticle";
import GyCard from "../ui/GyCard/GyCard";
import GyButton from "../ui/GyButton/GyButton";
import { MdSaveAlt } from "react-icons/md";
import { HiOutlineDocumentText } from "react-icons/hi";
import GySelector from "../ui/GySelector/GySelector";

const NewArticlePage = () => {
  return (
    <GyBodySection>
      <div className="page-section">
        <section className="left-section">
          <EditorArticle />
        </section>
        <section className="right-section">
          <GyCard className="sticky-side">
            <div>
              <GySelector title="Select category"></GySelector>
            </div>
            {/* <div className="flex flex-col gap-4">
              <GyButton
                icon={() => <MdSaveAlt />}
                title="Publish your article"
                variant="contained"
                click={() => {}}
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
            </div> */}
          </GyCard>
        </section>
      </div>
    </GyBodySection>
  );
};

export default NewArticlePage;
