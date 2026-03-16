import PostComment from "./PostComment";
import { Link } from "react-router";

export default function TopComment({ topComment, postId }) {
  return (
    <div className="p-5 rounded-b-3xl">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <h5 className="text-xs font-semibold text-neutral-500 uppercase tracking-wide flex items-center gap-2">
          <i className="fa-solid fa-fire text-orange-500"></i>
          Top Comment
        </h5>
      </div>

      {/* Comment */}
      <div className="mb-3">
        <PostComment comment={topComment} postId={postId} />
      </div>

      {/* View more */}
      <Link
        to={`/posts/${postId}`}
        className="text-blue-500 hover:text-blue-600 hover:underline font-semibold text-sm transition cursor-pointer"
      >
        View more comments
      </Link>
    </div>
  );
}
