import { useQuery } from "@tanstack/react-query";
import { Link, useParams } from "react-router";
import { $QUERY_KEYS } from "../../query-keys/queryKeys";
import { $Services } from "../../services/services-repository";
import PostCard from "../../components/feed/posts/comments/PostCard";

export default function PostDetailsPage() {
  const { postId } = useParams();
  console.log(postId);
  const postDetailsQuery = useQuery({
    queryKey: $QUERY_KEYS.posts.postDetails(postId),
    queryFn: () => $Services.POSTS_REPOSITORY.getSinglePost(postId),
  })

  if(postDetailsQuery.isLoading) {
    return (
      <div className="w-[90%] lg:w-[80%] mx-auto bg-white text-center text-sm p-4 rounded-2xl shadow-md">
        Loading post details ...
      </div>
    );
  }
  return (
    <div className="w-[90%] lg:w-[80%] mx-auto">
      <Link
        to="/feed"
        className=" bg-white text-gray-600 text-sm font-semibold p-2 rounded-lg shadow-md ms-1 flex items-center gap-2 w-fit mb-5"
      >
        <span>
          <i className="fa fa-arrow-left fa-sm"></i>
        </span>
        <span>Back</span>
      </Link>
      <PostCard
        userPosts={postDetailsQuery?.data?.data?.post}
        isMyPost={false}
      />
    </div>
  );
}
