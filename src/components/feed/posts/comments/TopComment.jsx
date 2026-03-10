import PostComment from "./PostComment";

export default function TopComment({ topComment }) {
  if (!topComment) return null;

  return (
    <div className="bg-neutral-100 p-4 rounded-b-3xl border-t border-neutral-200">
      <h5 className="font-bold text-neutral-500 text-sm mb-2 uppercase">
        Top Comment
      </h5>

      {/* Render Top comment */}
      <PostComment comment={topComment} />

      <button className="text-blue-500 font-semibold text-sm cursor-pointer hover:underline transition-colors mt-2">
        View more comments
      </button>
    </div>
  );
}
