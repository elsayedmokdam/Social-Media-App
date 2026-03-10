import { $Services } from "../services-repository";

export const getPostsBySelectedTab = (selectedTab) => {
  switch (selectedTab) {
    case "feed":
      return $Services.POSTS_REPOSITORY.getHomeFeed({ only: "following" });
    case "myPosts":
      return $Services.POSTS_REPOSITORY.getHomeFeed({ only: "me" });
    case "community":
      return $Services.POSTS_REPOSITORY.getHomeFeed({ only: "all" });
    case "bookmarks":
      return $Services.USER_REPOSITORY.getBookmarks();
    default:
      return $Services.POSTS_REPOSITORY.getHomeFeed({ only: "following" });
  }
};
