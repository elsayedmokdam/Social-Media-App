import CommentHeader from "./CommentHeader";
import CommentActions from "./CommentActions";

export default function PostComment({ comment }) {
  return (
    <div className="mb-6">
      {/* comment header & content */}
      <CommentHeader
        headerData={{
          commentCreator: {
            ...comment?.commentCreator,
          },
          comment: {
            content: comment?.content,
            createdAt: comment?.createdAt,
          },
        }}
      />

      <div className="container">
        {/* Comment Image */}
        {comment?.image && comment?.image !== "undefined" && (
          <div className="mt-2 ml-6">
            <img
              src={comment.image}
              alt="comment"
              className="rounded-xl border border-neutral-200 max-w-xs"
            />
          </div>
        )}

        {/* comment Actions */}
        <div className="flex items-center justify-between gap-3 mt-2 ml-6">
          <CommentActions
            commentActionsData={{
              likes: comment?.likes,
              commentId: comment?._id,
              postId: comment?.post,
              createdAt: comment?.createdAt,
            }}
          />
        </div>
      </div>
    </div>
  );
}
