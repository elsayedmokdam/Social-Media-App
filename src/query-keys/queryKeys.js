export const $QUERY_KEYS = {
  notifications: {
    all: ["notifications"],
    unread: ["notifications", "unread"],
    unreadCount: ["notifications", "unreadCount"],
  },
  posts: {
    all: ["posts"],
    myPosts: ["posts", "myPosts"],
    bookmarks: ["posts", "bookmarks"],
    community: ["posts", "community"],
    userPosts: (userId) => ["posts", "userPosts", userId],
    postDetails: (postId) => ["posts", "postDetails", postId],
  },
  profile: {
    myProfile : ["profile", "myProfile"],
    userProfile: (userId) => ["profile", "userProfile", userId],
  },
  suggestionFriends: ["suggested-friends"],
  searchSuggestions: ["search-suggested-friends"],
};
