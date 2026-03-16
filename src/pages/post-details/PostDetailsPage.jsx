import { useQuery } from "@tanstack/react-query";
import { Link, useParams } from "react-router";
import { $QUERY_KEYS } from "../../query-keys/queryKeys";
import { $Services } from "../../services/services-repository";
import PostCard from "../../components/feed/posts/comments/PostCard";
import CreateComment from "../../components/feed/posts/comments/CreateComment";
import PostComment from "../../components/feed/posts/comments/PostComment";

export default function PostDetailsPage() {
  const { postId } = useParams();

  // Get post details
  const postDetailsQuery = useQuery({
    queryKey: $QUERY_KEYS.posts.postDetails(postId),
    queryFn: () => $Services.POSTS_REPOSITORY.getSinglePost(postId),
  });

  // Get comments for the post
  const commentsQuery = useQuery({
    queryKey: $QUERY_KEYS.comments.all(postId),
    queryFn: () => $Services.COMMENTS_REPOSITORY.getPostComments(postId),
  });

  if (postDetailsQuery.isLoading) {
    return (
      <div className="w-[90%] lg:w-[60%] mx-auto bg-white text-center text-sm p-6 rounded-2xl shadow-md mt-10">
        Loading post details ...
      </div>
    );
  }

  const comments = commentsQuery?.data?.data?.comments || [];

  return (
    <div className="bg-gray-100 min-h-screen py-6">
      <div className="w-[90%] lg:w-[60%] mx-auto space-y-5">
        {/* Back button */}
        <Link
          to="/feed"
          className="bg-white text-gray-600 text-sm font-semibold px-3 py-2 rounded-lg shadow-md flex items-center gap-2 w-fit"
        >
          <i className="fa fa-arrow-left fa-sm"></i>
          Back
        </Link>

        {/* Post */}
        <div>
          <PostCard
            userPosts={postDetailsQuery?.data?.data?.post}
            isMyPost={false}
          />
        </div>

        {/* Create Comment */}
        <div>
          <CreateComment postId={postId} />
        </div>

        {/* Comments */}
        <div className="bg-white rounded-2xl shadow-md p-4">
          <div className="flex items-center justify-between mb-4">
            <p className="text-sm font-bold flex items-center gap-2">
              <i className="fa-solid fa-comments text-blue-500"></i>
              Comments
            </p>

            <span className="text-xs bg-gray-200 px-2 py-1 rounded-full font-semibold">
              {commentsQuery?.data?.meta?.pagination?.total}{" "}
            </span>
          </div>

          {commentsQuery.isLoading ? (
            <div className="text-center text-sm text-gray-500 py-5">
              <i className="fa-solid fa-spinner animate-spin mr-2"></i>
              Loading comments...
            </div>
          ) : comments.length > 0 ? (
            <div className="flex flex-col gap-4 max-h-125 overflow-y-auto pr-2">
              {comments.map((comment) => (
                <PostComment key={comment._id} comment={comment} />
              ))}
            </div>
          ) : (
            <p className="text-xs text-gray-500 text-center py-5">
              No comments yet
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
