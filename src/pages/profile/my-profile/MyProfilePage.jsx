import { useInfiniteQuery } from "@tanstack/react-query";
import ProfileBody from "../../../components/shared-components/profile-body/ProfileBody";
import ProfileHeader from "../../../components/shared-components/profile-header/ProfileHeader";
import { $QUERY_KEYS } from "../../../query-keys/queryKeys";
import { $Services } from "../../../services/services-repository";
import { useState } from "react";

export default function MyProfilePage() {
  const [activeTab, setActiveTab] = useState("myPosts");

  // Get user posts
  const myPostsQuery = useInfiniteQuery({
    queryKey: $QUERY_KEYS.posts.myPosts,
    queryFn: ({ pageParam: page = 1 }) =>
      $Services.POSTS_REPOSITORY.getHomeFeed({ only: "me", page }),
    getNextPageParam: (lastPage) => lastPage?.meta?.pagination?.nextPage,
  });

  // Get saved posts
  const myBookmarksQuery = useInfiniteQuery({
    queryKey: $QUERY_KEYS.posts.bookmarks,
    queryFn: ({ pageParam: page = 1 }) =>
      $Services.USER_REPOSITORY.getBookmarks({ page }),
    getNextPageParam: (lastPage) => lastPage?.meta?.pagination?.nextPage,
    // enabled: activeTab === "saved",
  });
  return (
    <>
      <div className="w-[90%] lg:w-[80%] mx-auto">
        <div className="mb-4">
          <ProfileHeader
            myPostsQuery={myPostsQuery}
            myBookmarksQuery={myBookmarksQuery}
          />
        </div>
        <div className="mb-4">
          <ProfileBody
            myPostsQuery={myPostsQuery}
            myBookmarksQuery={myBookmarksQuery}
            setActiveTab={setActiveTab}
            activeTab={activeTab}
          />
        </div>
      </div>
    </>
  );
}
