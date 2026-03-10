import { getNotifications } from "./get_notifications";
import { getUnreadCount } from "./get_unread_count";
import { markNotificationAsRead } from "./mark_notification_as_read";
import { markAllAsRead } from "./mark_all_as_read";

export const NOTIFICATIONS_REPOSITORY = {
  getNotifications,
  getUnreadCount,
  markNotificationAsRead,
  markAllAsRead,
};
