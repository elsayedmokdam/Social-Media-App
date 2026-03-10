import avatar from "../../../assets/images/avatar-generations_rpge.jpg";
import { useNavigate } from "react-router";
import { $Utilities } from "../../../utilities/utilities-repository";
import {
  useIsMutating,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import { $Services } from "../../../services/services-repository";
import { $QUERY_KEYS } from "../../../query-keys/queryKeys";
import { Tooltip } from "@heroui/react";

export default function NotificationCard({ notificationData }) {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const { mutate } = useMutation({
    mutationFn: (notificationId) =>
      $Services.NOTIFICATIONS_REPOSITORY.markNotificationAsRead(notificationId),
    mutationKey: ["mark-notification-as-read", notificationData._id],

    /*
    optimistic updates: 
    1. cancel refetches notifications
    2. save the last notification to the cache
    3. update the last notification
    4. in case error ==> return error
    */

    onMutate: async (notificationId) => {
      await queryClient.cancelQueries({
        queryKey: $QUERY_KEYS.notifications.all,
      });

      await queryClient.cancelQueries({
        queryKey: $QUERY_KEYS.notifications.unreadCount,
      });
      const previousAll = queryClient.getQueryData(
        $QUERY_KEYS.notifications.all,
      );
      const previousUnreadCount = queryClient.getQueryData(
        $QUERY_KEYS.notifications.unreadCount,
      );

      queryClient.setQueryData($QUERY_KEYS.notifications.all, (oldData) => {
        if (!oldData) return oldData;

        return {
          ...oldData,
          pages: oldData.pages.map((page) => ({
            ...page,
            data: {
              ...page.data,
              notifications: page.data.notifications.map((n) =>
                n._id === notificationId ? { ...n, isRead: true } : n,
              ),
            },
          })),
        };
      });

      queryClient.setQueryData($QUERY_KEYS.notifications.unreadCount, (old) => {
        if (!old) return old;

        return {
          ...old,
          unreadCount: Math.max(0, old.unreadCount - 1),
        };
      });
      return { previousAll, previousUnreadCount };
    },

    onSettled: () => {
      queryClient.invalidateQueries({
        queryKey: $QUERY_KEYS.notifications.unreadCount,
      });
      queryClient.invalidateQueries({
        queryKey: $QUERY_KEYS.notifications.all,
      });
    },

    onError: (error, variables, context) => {
      queryClient.setQueryData(
        $QUERY_KEYS.notifications.all,
        context.previousAll,
      );

      queryClient.setQueryData(
        $QUERY_KEYS.notifications.unreadCount,
        context.previousUnreadCount,
      );

      $Utilities.Alerts.displayError(error);
    },
  });

  const isMarkingNotificationAsRead = useIsMutating({
    mutationKey: ["mark-notification-as-read", notificationData._id],
  });

  // Mark notification as read
  function markNotificationAsRead(event, notificationId) {
    event.stopPropagation();
    mutate(notificationId);
  }
  // Navigate to post
  function navigateToPostDetails(postId) {
    navigate(`/posts/${postId}`);
  }
  // Navigate to profile
  function navigateToProfile(event, userId) {
    event.stopPropagation();
    navigate(`/profile/${userId}`);
  }
  return (
    <Tooltip content={"Notification ID: " + notificationData?._id || ""}>
      <div
        onClick={() => {
          navigateToPostDetails(
            notificationData?.entityId || notificationData?.entity?._id,
          );
        }}
        className="bg-blue-100 p-5  rounded-2xl shadow-md cursor-pointer border-1 border-blue-300 hover:bg-blue-200 hover:shadow-lg transition duration-300 ease-in-out"
      >
        <div className="flex justify-between">
          <div className="flex gap-4 flex-1">
            <div
              onClick={(event) =>
                navigateToProfile(event, notificationData?.actor?._id)
              }
              className="w-10 h-10 rounded-full overflow-hidden cursor-pointer border-1 border-blue-300 flex items-center justify-center"
            >
              <img
                src={notificationData?.actor?.photo || avatar}
                alt={notificationData?.actor?.name || "User"}
              />
            </div>
            <div className="flex-1">
              <p className="flex flex-col md:flex-row md:items-center gap-2">
                <span
                  onClick={(event) =>
                    navigateToProfile(event, notificationData?.actor?._id)
                  }
                  className="font-bold capitalize cursor-pointer hover:underline hover:underline-offset-4 hover:text-blue-500"
                >
                  {notificationData?.actor?.name}
                </span>

                <span className="text-sm text-gray-500">
                  {notificationData?.type.includes("comment")
                    ? "commented on your post"
                    : notificationData?.type.includes("share")
                      ? "shared your post"
                      : "liked your post"}
                </span>
              </p>
              <p className="my-2 text-sm w-20 md:w-40 lg:w-60 xl:w-80 truncate">
                {notificationData?.entity?.body || "See post"}
              </p>
              <div className="flex items-center gap-2 w-full">
                <button
                  disabled={isMarkingNotificationAsRead}
                  onClick={(event) =>
                    markNotificationAsRead(event, notificationData?._id)
                  }
                  className={`${notificationData?.isRead ? "text-green-600 bg-transparent font-bold" : "text-blue-500 bg-white cursor-pointer"}  text-xs rounded-xl py-2 px-3 flex items-center gap-1 ${
                    isMarkingNotificationAsRead ? "cursor-not-allowed" : ""
                  }`}
                >
                  <span>
                    <i className="fa-solid fa-check"></i>
                  </span>
                  <span>
                    {notificationData?.isRead ? "Read" : "Mark as read"}
                  </span>
                </button>
                <button className="text-red-500 rounded-full size-4 p-4 flex items-center justify-center bg-white cursor-pointer">
                  {notificationData?.type.includes("comment") ? (
                    <i className="fa-regular fa-comment text-indigo-500"></i>
                  ) : notificationData?.type.includes("share") ? (
                    <i className="fa-solid fa-share text-black"></i>
                  ) : (
                    <i className="fa-regular fa-heart"></i>
                  )}
                </button>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <p className="text-neutral-500 text-sm">
              {$Utilities.Dates.displayRelativeTime(
                notificationData?.createdAt,
              )}
            </p>
            <p className="rounded-full w-2 h-2 bg-blue-500"></p>
          </div>
        </div>
      </div>
    </Tooltip>
  );
}
