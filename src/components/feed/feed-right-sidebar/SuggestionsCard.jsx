import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Link } from "react-router";
import { $HOOKS_REPOSITORY } from "../../../hooks/hooks_repository";
import { $QUERY_KEYS } from "../../../query-keys/queryKeys";

export default function SuggestionsCard({ suggestions }) {
  const { followersCount, mutualFollowersCount, name, photo, username, _id } =
    suggestions;
  const { userProfile } = $HOOKS_REPOSITORY.useAuth();
  console.log("userProfile", userProfile);
  console.log("suggestions", suggestions);

  const queryClient = useQueryClient();
  const followUserMutation = useMutation({
    mutationFn: (_id) => $Services.USER_REPOSITORY.followUnfollowUser(_id),
    onSuccess: () =>
      queryClient.invalidateQueries({
        queryKey: $QUERY_KEYS.profile.myProfile,
      }),
  });

  function followUnfollowHandler() {
    followUserMutation.mutate(_id);
    // console.log("followUnfollowHandler");
  }

  const isFollowing = userProfile?.following?.some((userId) => userId === _id);
  console.log("isFollowing", isFollowing);

  return (
    <div className="flex flex-col gap-3 border border-neutral-200 rounded-xl p-3">
      <div className="flex items-center justify-between">
        <Link to={`/profile/${_id}`} className="flex items-center gap-2">
          {" "}
          <div className="size-10">
            <img className="w-10 h-10 rounded-full" src={photo} alt="avatar" />
          </div>
          <div>
            <p className="text-sm font-bold text-neutral-800 w-10 md:w-25 truncate hover:underline">
              {name}
            </p>
            <p className="text-xs text-neutral-400 w-10 md:w-20 truncate">
              @{username}
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
          {followersCount} followers
        </p>
        <p className="text-xs text-blue-500 bg-blue-50 rounded-full px-2 py-1 w-fit">
          {mutualFollowersCount} mutual friends
        </p>
      </div>
    </div>
  );
}
