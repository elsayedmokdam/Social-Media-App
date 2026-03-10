import { useInfiniteQuery } from "@tanstack/react-query";
import { useRef } from "react";
import { $Services } from "../../../services/services-repository";
import PostCard from "../../feed/posts/comments/PostCard";
import { useParams } from "react-router";
import { $QUERY_KEYS } from "../../../query-keys/queryKeys";
export default function UserProfileBody() {
  const observerRef = useRef();
  const { userId } = useParams();

  // Get user posts
  const userPostsQuery = useInfiniteQuery({
    queryKey: $QUERY_KEYS.posts.userPosts(userId),
    queryFn: ({ pageParam: page = 1 }) =>
      $Services.USER_REPOSITORY.getUserPosts(userId),
    getNextPageParam: (lastPage, allPages) => {
      return lastPage?.meta?.pagination?.nextPage ?? undefined;
    },
  });
  const postsLength =
    userPostsQuery?.data?.pages?.[0]?.data?.posts?.length ?? 0;

  if (userPostsQuery.isLoading) {
    return (
      <div className="bg-white text-center text-sm p-4 rounded-2xl shadow-md">
        Loading posts ...
      </div>
    );
  }
  return (
    <>
      <div className="mt-5 space-y-5">
        {postsLength > 0 &&
          userPostsQuery?.data?.pages?.map((page) =>
            page?.data?.posts?.map((post) => (
              <PostCard key={post._id} userPosts={post} />
            )),
          )}
        {postsLength === 0 && (
          <div className="text-center bg-white p-5 rounded-2xl shadow-md text-gray-500 font-bold text-sm">
            No Posts Yet
          </div>
        )}
      </div>
      <div ref={observerRef}></div>
      <div className="text-center mt-5 bg-white p-5 rounded-2xl shadow-md text-gray-500 w-fit mx-auto">
        {userPostsQuery.isFetchingNextPage && userPostsQuery.hasNextPage ? (
          <p className="flex items-center font-semibold">
            <span>
              <i className="fa-solid fa-spinner animate-spin"></i>
            </span>
            <span className="ml-2">Loading...</span>
          </p>
        ) : (
          <p className="font-semibold">No More Posts</p>
        )}
      </div>
    </>
  );
}
