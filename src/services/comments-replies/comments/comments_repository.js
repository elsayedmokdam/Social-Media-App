import { createComment } from "./create_comment";
import { deleteComment } from "./delete_comment";
import { getPostComments } from "./get_post_comments";
import { likeAndUnlikeComment } from "./like_unlike_comment";
import { updateComment } from "./update_comment";

export const COMMENTS_REPOSITORY = {
  getPostComments,
  createComment,
  deleteComment,
  updateComment,
  likeAndUnlikeComment,
};
