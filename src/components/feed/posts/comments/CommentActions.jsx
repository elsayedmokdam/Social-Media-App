import { useMutation, useQueryClient } from "@tanstack/react-query";
import { $Utilities } from "../../../../utilities/utilities-repository";
import CommentLikes from "./CommentLikes";
import { $Services } from "../../../../services/services-repository";
import { $QUERY_KEYS } from "../../../../query-keys/queryKeys";
import { useMyProfile } from "../../../../hooks/useMyProfile";
import { useState } from "react";

export default function CommentActions({ commentActionsData }) {
  const { commentId, postId, likes, createdAt } = commentActionsData;
  const queryClient = useQueryClient();
  const userProfile = useMyProfile();
  const userProfileId = userProfile?.data?.data?.user?.id;
  const isLikedByMe = likes?.includes(userProfileId);
  const [isLiked, setIsLiked] = useState(isLikedByMe);

  const commentLikeMutation = useMutation({
    mutationKey: $QUERY_KEYS.comments.commentLike(commentId, postId),
    mutationFn: () =>
      $Services.COMMENTS_REPOSITORY.likeAndUnlikeComment(postId, commentId),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: $QUERY_KEYS.comments.all(postId),
      });
      queryClient.invalidateQueries({
        queryKey: $QUERY_KEYS.posts.postDetails(postId),
      });
      queryClient.invalidateQueries({
        queryKey: $QUERY_KEYS.posts.all,
      });
    },
    onError: (error) => {
      console.log(error);
    },
  });

  const handleLikeComment = () => {
    setIsLiked((prev) => !prev);
    commentLikeMutation.mutate();
  };

  return (
    <>
      <div className="flex items-center gap-6">
        <p className="text-sm font-semibold text-neutral-400">
          {$Utilities.Dates.displayPostAndCommentDate(createdAt)}
        </p>
        <div className="flex items-center gap-4">
          <button className="text-sm font-semibold text-neutral-400 cursor-pointer hover:text-blue-500">
            Reply
          </button>
          {likes.length > 0 && <CommentLikes commentLikes={likes} />}
        </div>
      </div>
      <div>
        <button
          onClick={handleLikeComment}
          className={`hover:text-blue-500 rounded-full size-8 ${
            isLiked ? "text-blue-500 bg-blue-100" : "text-neutral-400"
          } cursor-pointer`}
        >
          <span>
            <i
              className={`fa-${isLiked ? "solid" : "regular"} fa-thumbs-up`}
            ></i>
          </span>
        </button>
      </div>
    </>
  );
}
