import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Link } from "react-router";
import { $QUERY_KEYS } from "../../../query-keys/queryKeys";
import { $Services } from "../../../services/services-repository";
import { useState } from "react";
import avatarFallback from "../../../assets/images/avatar-generations_rpge.jpg";

export default function SuggestionsCard({ suggestions }) {
  const { followersCount, mutualFollowersCount, name, photo, username, _id } =
    suggestions;
  let [isFollowing, setIsFollowing] = useState(false);

  const queryClient = useQueryClient();
  const followUserMutation = useMutation({
    mutationFn: (_id) => $Services.USER_REPOSITORY.followUnfollowUser(_id),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: $QUERY_KEYS.profile.myProfile,
      });
      queryClient.invalidateQueries({
        queryKey: $QUERY_KEYS.suggestionFriends,
      });
      queryClient.invalidateQueries({
        queryKey: $QUERY_KEYS.searchSuggestions,
      });
      setIsFollowing(!isFollowing);
    },
  });

  function followUnfollowHandler() {
    followUserMutation.mutate(_id);
  }
  return (
    <div className="flex flex-col gap-3 border border-neutral-200 rounded-xl p-3">
      <div className="flex items-center justify-between">
        <Link to={`/profile/${_id}`} className="flex items-center gap-2">
          <div className="size-10">
            <img
              className="w-10 h-10 rounded-full"
              src={photo || avatarFallback}
              alt="avatar"
              onError={(e) => (
                (e.currentTarget.onerror = null),
                (e.currentTarget.src = avatarFallback)
              )}
            />
          </div>
          <div>
            <p className="text-sm font-bold text-neutral-800 w-10 md:w-25 truncate hover:underline">
              {name}
            </p>
            <p className="text-xs text-neutral-400 w-10 md:w-20 truncate">
              {`${username ? `@${username}` : ""}`}
            </p>
          </div>
        </Link>
        <button
          onClick={followUnfollowHandler}
          className={`${isFollowing ? "bg-white text-blue-500" : "bg-blue-100  text-blue-500 border border-blue-300"} ${followUserMutation.isPending ? "cursor-not-allowed" : "cursor-pointer"} text-xs  font-bold rounded-full py-1 px-3 flex items-center gap-1 cursor-pointer`}
        >
          {isFollowing ? (
            <i className="fa-solid fa-user-check"></i>
          ) : (
            <i className="fa-solid fa-user-plus"></i>
          )}
          {isFollowing ? "Unfollow" : "Follow"}
          {followUserMutation.isPending && (
            <i className="fa-solid fa-spinner animate-spin"></i>
          )}
        </button>
      </div>
      <div className="flex items-center gap-2 font-semibold">
        <p className="text-xs text-gray-500 bg-gray-50 rounded-full px-3 py-1 w-fit">
          {followersCount || 0} followers
        </p>
        <p className="text-xs text-blue-500 bg-blue-50 rounded-full px-2 py-1 w-fit">
          {mutualFollowersCount || 0} mutual friends
        </p>
      </div>
    </div>
  );
}
