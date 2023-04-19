import React from "react";
import GyCard from "../../ui/GyCard/GyCard";
import GyInput from "../../ui/GyInput/GyInput";
import GyTextarea from "../../ui/GyTextarea/GyTextarea";
import GyUploader from "../../ui/GyUploader/GyUploader";
// editor
import MarkdownIt from "markdown-it";
import MdEditor from "react-markdown-editor-lite";
import "react-markdown-editor-lite/lib/index.css";

const mdParser = new MarkdownIt(/* Markdown-it options */);

const handleEditorChange = ({ html, text }) => {
  console.log("handleEditorChange", html, text);
};

const hanleFileChange = (file) => {
  console.log("file", file);
};

const EditorArticle = () => {
  return (
    <GyCard>
      <GyCard title="Article Info" hasDivider={false}>
        <GyInput placeholder="Article title *" className="mb-6" />
        <GyTextarea placeholder="Short description *" />
      </GyCard>
      <GyCard title="Article Cover" hasDivider={false}>
        <GyUploader onFileChange={hanleFileChange} type="single" />
      </GyCard>
      <GyCard title="Content" hasDivider={false}>
        <MdEditor
          style={{ width: "100%" }}
          renderHTML={(text) => mdParser.render(text)}
          onChange={handleEditorChange}
        />
      </GyCard>
    </GyCard>
  );
};

export default EditorArticle;
