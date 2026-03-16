import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Link } from "react-router";
import { $Services } from "../../../services/services-repository";
import { $HOOKS_REPOSITORY } from "../../../hooks/hooks_repository";
import { Tooltip, useDisclosure } from "@heroui/react";
import SharePostModal from "../../modals/SharePostModal";
import { useState } from "react";
import { $QUERY_KEYS } from "../../../query-keys/queryKeys";

export default function PostActions({ postActions }) {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const { userProfile } = $HOOKS_REPOSITORY.useAuth();
  const isLikedByMe = postActions?.likes?.includes(userProfile?._id);
  const [isLiked, setIsLiked] = useState(isLikedByMe);
  const queryClient = useQueryClient();

  // Like and Unlike Post
  const postLikeMutation = useMutation({
    mutationFn: (postId) =>
      $Services.POSTS_REPOSITORY.likeAndUnlikePost(postId),
    onSuccess: (data) => {
      queryClient.invalidateQueries({
        queryKey: $QUERY_KEYS.posts.all,
      });
    },
  });

  // Toggle Post Likes
  function togglePostLikes() {
    setIsLiked((prev) => !prev);
    postLikeMutation.mutate(postActions.postId);
  }

  function togglePostShare() {
    onOpenChange(true);
  }
  return (
    <div className="grid grid-cols-3 gap-3 border-1 border-neutral-200 rounded-xl my-3 overflow-hidden text-sm">
      <Tooltip content={isLikedByMe ? "Unlike" : "Like"} placement="top">
        <div
          onClick={togglePostLikes}
          className="hover:bg-gray-100  transition-background duration-200 p-2 rounded-md text-center cursor-pointer flex items-center justify-center gap-2"
        >
          <span
            className={`${isLiked ? "text-blue-500" : "text-neutral-500"} rounded-full`}
          >
            <i
              className={`fa-${isLiked ? "solid" : "regular"} fa-thumbs-up`}
            ></i>
          </span>
          <span className={isLiked ? "text-blue-500" : "text-neutral-500"}>
            Like
          </span>
        </div>
      </Tooltip>
      <Link
        to={`/posts/${postActions.postId}`}
        // onClick={() => postActions.toggleShowComments(postActions.postId)}
        className="hover:bg-gray-100 transition-background duration-200 p-2 rounded-md text-center cursor-pointer flex items-center justify-center gap-2"
      >
        <span className="text-neutral-500 rounded-full">
          <i className="fa-regular fa-comment-dots"></i>
        </span>
        <span className="text-neutral-500">Comment</span>
      </Link>
      <div
        onClick={togglePostShare}
        className="hover:bg-gray-100 transition-background duration-200 p-2 rounded-md text-center cursor-pointer flex items-center justify-center gap-2"
      >
        <span className="text-neutral-500 rounded-full">
          <i className="fa-solid fa-share-nodes"></i>
        </span>
        <span className="text-neutral-500">Share</span>
      </div>
      {/* Share Post Medal */}
      <SharePostModal
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        postId={postActions.postId}
      />
    </div>
  );
}
