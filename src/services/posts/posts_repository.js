import { createPost } from "./create_post";
import { deletePost } from "./delete_post";
import { getAllPosts } from "./get_all_posts";
import { getHomeFeed } from "./get_home_feed";
import { getPostLikes } from "./get_post_likes";
import { getSinglePost } from "./get_single_post";
import { likeAndUnlikePost } from "./like_unlike_post";
import { sharePost } from "./share_post";
import { updatePost } from "./update_post";
import { bookmarkAndUnbookmarkPost } from "./bookmark_unbookmark_post";
import { getPostsBySelectedTab } from "./get_posts_by_selected_tab";

export const POSTS_REPOSITORY = {
  createPost,
  deletePost,
  getAllPosts,
  getHomeFeed,
  getPostLikes,
  getSinglePost,
  likeAndUnlikePost,
  sharePost,
  updatePost,
  bookmarkAndUnbookmarkPost,
  getPostsBySelectedTab,
};
