import { POSTS_REPOSITORY } from "./posts/posts_repository";
import { AUTH_REPOSITORY } from "./user-auth/auth/auth_repository";
import { USER_REPOSITORY } from "./user-auth/user/user_repository";
import { COMMENTS_REPOSITORY } from "./comments-replies/comments/comments_repository";
import { REPLIES_REPOSITORY } from "./comments-replies/replies/replies_repository";
import { NOTIFICATIONS_REPOSITORY } from "./notifications/notifications_repository";

export const $Services = {
  POSTS_REPOSITORY,
  AUTH_REPOSITORY,
  USER_REPOSITORY,
  COMMENTS_REPOSITORY,
  REPLIES_REPOSITORY,
  NOTIFICATIONS_REPOSITORY,
};
