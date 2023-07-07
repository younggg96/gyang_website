import EmptyData from "../error/EmptyData";
import { InputPropsComment, InputPropsReply } from "./config";

const MomentCommentList = ({ children, count, type }) => {
  const CommentTitle = () => {
    return (
      <>
        <h2 className="title">
          {type === "momentComment"
            ? InputPropsComment.num
            : InputPropsReply.num}{" "}
          {!!count && <span>({count})</span>}
        </h2>
        {!count && (
          <EmptyData
            content={{
              sub:
                type === "momentComment"
                  ? InputPropsComment.empty
                  : InputPropsReply.empty,
            }}
          ></EmptyData>
        )}
      </>
    );
  };

  return (
    <section className="comments-list">
      <CommentTitle />
      <div className="comments-content">{children}</div>
    </section>
  );
};

export default MomentCommentList;
