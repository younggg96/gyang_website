import { CommentItem, CommentSubItem } from "../comments/CommentList";
import EmptyData from "../error/EmptyData";
import { InputPropsComment, InputPropsReply } from "./config";

const MomentCommentList = ({ data, setData, count, type }) => {
  const CommentTitle = () => {
    return (
      <>
        <h2 className="title">
          {type === "comments" ? InputPropsComment.num : InputPropsReply.num}{" "}
          {!!count && <span>({count})</span>}
        </h2>
        {!count && (
          <EmptyData
            content={{
              sub:
                type === "comments"
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
      {/* <div className="comments-content">
        {data.map((item) => {
          return type === "comments" ? (
            <CommentItem
              data={item}
              setData={setData}
              key={item.id}
              type={type}
            />
          ) : (
            <CommentSubItem
              data={item}
              setData={setData}
              key={item.id}
              type={type}
            />
          );
        })}
      </div> */}
    </section>
  );
};

export default MomentCommentList;
