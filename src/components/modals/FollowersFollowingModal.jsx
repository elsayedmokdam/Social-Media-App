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

  const removedIdsRef = useRef(new Set());
  const [optimisticFollowed, setOptimisticFollowed] = useState(new Set());
  const [optimisticUnfollowed, setOptimisticUnfollowed] = useState(new Set());

  const prevFollowTypeRef = useRef(null);

  // ✅ FIX: reset only when type changes
  if (prevFollowTypeRef.current !== followType?.type) {
    prevFollowTypeRef.current = followType?.type;
    removedIdsRef.current = new Set();
    setOptimisticFollowed(new Set());
    setOptimisticUnfollowed(new Set());
  }

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
        removedIdsRef.current = new Set([...removedIdsRef.current, id]);
      } else {
        const isCurrentlyFollowingBack =
          optimisticFollowed.has(id) ||
          (!optimisticUnfollowed.has(id) && myProfile?.following?.includes(id));

        if (isCurrentlyFollowingBack) {
          setOptimisticFollowed((prev) => {
            const next = new Set(prev);
            next.delete(id);
            return next;
          });
          setOptimisticUnfollowed((prev) => new Set([...prev, id]));
        } else {
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
      isCurrentlyFollowing = true;
    } else {
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
        label: "Following",
        icon: "fa-check",
        className: "text-neutral-600 border-neutral-300 hover:bg-neutral-100",
      };
    }

    return {
      label: "Follow",
      icon: "fa-user-plus",
      className: "text-blue-500 border-blue-200 hover:bg-blue-50",
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
          {/* Header */}
          <ModalHeader className="text-lg font-bold  pb-3">
            {title}
          </ModalHeader>

          <ModalBody>
            {followersListQuery.pending ? (
              <div className="flex justify-center py-10">
                <i className="fa-solid fa-spinner animate-spin text-xl text-neutral-500" />
              </div>
            ) : followersListQuery.data?.length ? (
              <ul className="flex flex-col gap-3 pb-3">
                {followersListQuery.data.map((user) => {
                  const id = user?.user?._id;
                  if (!id) return null;

                  const isLoading = loadingUser === id;
                  const { label, icon, className } = getButtonConfig(id);

                  return (
                    <li
                      key={id}
                      className="flex items-center justify-between gap-3 p-3 rounded-xl border border-neutral-200 hover:bg-neutral-50 transition"
                    >
                      {/* User */}
                      <Link
                        to={`/profile/${id}`}
                        className="flex items-center gap-3 min-w-0"
                        onClick={() => onOpenChange(false)}
                      >
                        <CustomAvatar
                          avatarData={{
                            image: user?.user?.photo,
                            name: user?.user?.name,
                            username: user?.user?.username,
                          }}
                          size="h-10 w-10"
                        />

                        <div className="flex flex-col min-w-0">
                          <span className="font-semibold text-sm text-neutral-800 truncate hover:underline">
                            {user?.user?.name}
                          </span>
                          {user?.user?.username && (
                            <span className="text-xs text-neutral-400 truncate">
                              @{user?.user?.username}
                            </span>
                          )}
                        </div>
                      </Link>

                      {/* Button */}
                      <button
                        disabled={isLoading}
                        onClick={() => handleFollowToggle(id)}
                        className={`flex items-center gap-2 text-sm font-semibold px-3 py-1.5 rounded-lg border transition shrink-0 disabled:opacity-50 cursor-pointer ${className}`}
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
              <div className="text-center text-sm text-neutral-500 py-10">
                No {title.toLowerCase()} yet
              </div>
            )}
          </ModalBody>
        </>
      </ModalContent>
    </Modal>
  );
}
