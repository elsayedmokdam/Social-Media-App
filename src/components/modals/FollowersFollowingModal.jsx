import { Modal, ModalContent, ModalHeader, ModalBody } from "@heroui/react";
import { useMutation, useQueries, useQueryClient } from "@tanstack/react-query";
import { $Services } from "../../services/services-repository";
import CustomAvatar from "../shared-components/avatars/CustomAvatar";
import { Link } from "react-router";
import { $QUERY_KEYS } from "../../query-keys/queryKeys";
import { useRef, useState } from "react";

export default function FollowersFollowingModal({
  isOpen,
  onOpenChange,
  followType,
  myProfile,
}) {
  const queryClient = useQueryClient();
  const [loadingUser, setLoadingUser] = useState(null);

  // Tracks ids optimistically removed (unfollowed in "following" view)
  const removedIdsRef = useRef(new Set());

  // Tracks follow-back toggles in "followers" view for instant UI feedback
  const [optimisticFollowed, setOptimisticFollowed] = useState(new Set());
  const [optimisticUnfollowed, setOptimisticUnfollowed] = useState(new Set());

  const prevFollowTypeRef = useRef(null);

  // Reset all optimistic state when followType identity changes (modal reopens)
  if (prevFollowTypeRef.current !== followType) {
    prevFollowTypeRef.current = followType;
    removedIdsRef.current = new Set();
  }

  // Derive id list from prop, minus optimistically removed ones
  const ids = (followType?.ids ?? []).filter(
    (id) => !removedIdsRef.current.has(id),
  );

  const followersListQuery = useQueries({
    queries: ids.map((id) => ({
      queryKey: ["user", id],
      queryFn: () => $Services.USER_REPOSITORY.getUserProfile(id),
      enabled: !!id && isOpen,
    })),
    combine: (results) => ({
      data: results.map((r) => r?.data?.data).filter(Boolean),
      pending: results.some((r) => r.isPending),
    }),
  });

  const followMutation = useMutation({
    mutationFn: (id) => $Services.USER_REPOSITORY.followUnfollowUser(id),

    onMutate: (id) => {
      setLoadingUser(id);

      if (followType?.type === "following") {
        // Optimistically remove from the following list
        removedIdsRef.current = new Set([...removedIdsRef.current, id]);
      } else {
        // Followers view — toggle follow-back state optimistically
        const isCurrentlyFollowingBack =
          optimisticFollowed.has(id) ||
          (!optimisticUnfollowed.has(id) && myProfile?.following?.includes(id));

        if (isCurrentlyFollowingBack) {
          // Unfollow: remove from followed set, add to unfollowed set
          setOptimisticFollowed((prev) => {
            const next = new Set(prev);
            next.delete(id);
            return next;
          });
          setOptimisticUnfollowed((prev) => new Set([...prev, id]));
        } else {
          // Follow: remove from unfollowed set, add to followed set
          setOptimisticUnfollowed((prev) => {
            const next = new Set(prev);
            next.delete(id);
            return next;
          });
          setOptimisticFollowed((prev) => new Set([...prev, id]));
        }
      }
    },

    onSuccess: (_, id) => {
      queryClient.invalidateQueries({
        queryKey: $QUERY_KEYS.profile.myProfile,
      });
      queryClient.invalidateQueries({ queryKey: ["user", id] });
    },

    onError: (_, id) => {
      // Rollback optimistic changes on failure
      if (followType?.type === "following") {
        removedIdsRef.current = new Set(
          [...removedIdsRef.current].filter((uid) => uid !== id),
        );
      } else {
        setOptimisticFollowed((prev) => {
          const next = new Set(prev);
          next.delete(id);
          return next;
        });
        setOptimisticUnfollowed((prev) => {
          const next = new Set(prev);
          next.delete(id);
          return next;
        });
      }
    },

    onSettled: () => {
      setLoadingUser(null);
    },
  });

  function handleFollowToggle(id) {
    followMutation.mutate(id);
  }

  const isFollowingView = followType?.type === "following";
  const title = isFollowingView ? "Following" : "Followers";

  function getButtonConfig(userId) {
    let isCurrentlyFollowing;

    if (isFollowingView) {
      // Every visible user in the following view is followed (removed ones are gone)
      isCurrentlyFollowing = true;
    } else {
      // Check optimistic overrides first, then fall back to real profile data
      if (optimisticFollowed.has(userId)) {
        isCurrentlyFollowing = true;
      } else if (optimisticUnfollowed.has(userId)) {
        isCurrentlyFollowing = false;
      } else {
        isCurrentlyFollowing = myProfile?.following?.includes(userId) ?? false;
      }
    }

    if (isCurrentlyFollowing) {
      return {
        label: "Unfollow",
        icon: "fa-user-minus",
        className:
          "text-rose-500 border-rose-200 hover:bg-rose-50 active:bg-rose-100",
      };
    }

    return {
      label: "Follow",
      icon: "fa-user-plus",
      className:
        "text-blue-500 border-blue-200 hover:bg-blue-50 active:bg-blue-100",
    };
  }

  return (
    <Modal
      isOpen={isOpen}
      onOpenChange={onOpenChange}
      placement="bottom-center"
      size="lg"
      scrollBehavior="inside"
    >
      <ModalContent>
        <>
          <ModalHeader className="flex flex-col gap-1">#{title}</ModalHeader>

          <ModalBody>
            {followersListQuery.pending ? (
              <div className="flex justify-center py-6">
                <i className="fa-solid fa-spinner animate-spin text-lg" />
              </div>
            ) : followersListQuery.data?.length ? (
              <ul className="flex flex-col gap-4 pb-3">
                {followersListQuery.data.map((user) => {
                  const id = user?.user?._id;
                  if (!id) return null;

                  const isLoading = loadingUser === id;
                  const { label, icon, className } = getButtonConfig(id);

                  return (
                    <li
                      key={id}
                      className="flex items-center justify-between gap-4 shadow-sm p-3 rounded-xl border border-neutral-200 hover:bg-neutral-50 transition"
                    >
                      <Link
                        to={`/profile/${id}`}
                        className="flex items-center gap-4 min-w-0"
                        onClick={() => onOpenChange(false)}
                      >
                        <CustomAvatar avatarData={user?.user} size="h-9 w-9" />
                        <span className="font-semibold text-sm text-neutral-700 capitalize truncate">
                          {user?.user?.name}
                        </span>
                      </Link>

                      <button
                        disabled={isLoading || followMutation.isPending}
                        onClick={() => handleFollowToggle(id)}
                        className={`flex items-center gap-2 text-sm font-semibold px-3 py-1.5 rounded-lg border transition shrink-0 disabled:opacity-50 disabled:cursor-not-allowed ${className}`}
                      >
                        {isLoading ? (
                          <i className="fa-solid fa-spinner animate-spin" />
                        ) : (
                          <i className={`fa-solid ${icon}`} />
                        )}
                        {label}
                      </button>
                    </li>
                  );
                })}
              </ul>
            ) : (
              <div className="text-center text-sm text-neutral-500 py-6">
                No {title.toLowerCase()} yet
              </div>
            )}
          </ModalBody>
        </>
      </ModalContent>
    </Modal>
  );
}
