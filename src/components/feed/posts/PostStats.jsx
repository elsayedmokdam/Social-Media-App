import { Link } from "react-router";
export default function PostStats({ postStats = {} }) {
  const {
    postId,
    likesCount = 0,
    sharesCount = 0,
    commentsCount = 0,
  } = postStats;
  return (
    <Link
      to={`/posts/${postId}`}
      className="flex flex-col gap-4 md:flex-row justify-between text-xs text-gray-500 my-4"
    >
      <div className="flex items-center justify-between gap-6">
        <div className="flex items-center gap-2">
          <span className="text-blue-500">
            <i className="fa-regular fa-thumbs-up"></i>
          </span>
          <span>
            {likesCount}{" "}
            {likesCount > 1 ? "likes" : "like"}
          </span>
        </div>
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-2">
            <span className="text-blue-500">
              <i className="fa-solid fa-retweet"></i>
            </span>
            <span>
              {sharesCount}{" "}
              {sharesCount > 1 ? "shares" : "share"}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-blue-500">
              <i className="fa-regular fa-comment"></i>
            </span>
            <span>
              {commentsCount}{" "}
              {commentsCount > 1 ? "comments" : "comment"}
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
}
