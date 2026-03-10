import FeedLeftSideBar from "../../components/feed/feed-left-sidebar/FeedLeftSideBar";
import CreatePost from "../../components/feed/create-post/CreatePost";
import Posts from "../../components/feed/posts/Posts";
import FeedRightSideBar from "../../components/feed/feed-right-sidebar/FeedRightSideBar";
import { useState } from "react";

export default function FeedPage() {
  const [activeTab, setActiveTab] = useState("feed");

  return (
    <>
    <title>Social App | Feed</title>
      <div className="feed-page container grid grid-cols-12 gap-4 py-8">
        {/* Left Sidebar */}
        <div className="col-span-12 xl:col-span-3">
          <FeedLeftSideBar activeTab={activeTab} setActiveTab={setActiveTab} />
        </div>

        {/* Center Feed */}
        <div className="col-span-12 xl:col-span-6 space-y-4">
          {/* Create Post */}
          <CreatePost activeTab={activeTab} />

          {/* Right Sidebar (Mobile Only) */}
          <div className=" block xl:hidden">
            <FeedRightSideBar />
          </div>

          {/* Posts */}
          <Posts activeTab={activeTab} />
        </div>

        {/* Right Sidebar (Desktop Only) */}
        <div className="hidden xl:block xl:col-span-3">
          <FeedRightSideBar />
        </div>
      </div>
    </>
  );
}
