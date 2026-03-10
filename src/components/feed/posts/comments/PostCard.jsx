import { Avatar, Card, CardBody, CardHeader, Image } from "@heroui/react";
import { Link, useParams } from "react-router";
import { $Utilities } from "../../../../utilities/utilities-repository";
import ImageInFullScreen from "../../../shared-components/images/ImageInFullScreen";
import { $HOOKS_REPOSITORY } from "../../../../hooks/hooks_repository";
import { useState } from "react";

export default function PostCard({ userPosts, isMyPost }) {
  console.log("userPosts", userPosts);
  const { userId } = useParams();
  const { openViewerImage, setOpenViewerImage } =
    $HOOKS_REPOSITORY.useImageInFullScreen();

  const [showFullText, setShowFullText] = useState(false);
  const textLimit = 150;

  const hasLongText = userPosts?.body?.length > textLimit;
  const displayedText = showFullText
    ? userPosts?.body
    : userPosts?.body?.slice(0, textLimit);

  return (
    <>
      {openViewerImage && (
        <ImageInFullScreen
          openViewerImage={openViewerImage}
          setOpenViewerImage={setOpenViewerImage}
        />
      )}
      <Card className="w-full p-4">
        <CardHeader className="flex gap-3">
          <Avatar
            isBordered
            radius="full"
            size="md"
            src={userPosts?.user?.photo}
          />
          <div className="flex flex-col">
            {userId === userPosts?.user?._id || isMyPost ? (
              <p className="text-md font-semibold text-default-600">
                {userPosts?.user?.name}
              </p>
            ) : (
              <Link
                to={`/profile/${userPosts?.user?._id}`}
                className="text-md font-semibold text-default-600 hover:underline cursor-pointer"
              >
                {userPosts?.user?.name}
              </Link>
            )}
            <p className="text-small text-default-500 ">
              {userPosts?.user?.username && "@"}
              {userPosts?.user?.username}
            </p>
          </div>
        </CardHeader>

        <CardBody className="mt-4 h-full overflow-y-hidden">
          {userPosts?.body && (
            <p className="text-md mb-3">
              {displayedText}
              {hasLongText && !showFullText && "..."}
            </p>
          )}

          {hasLongText && (
            <button
              className="text-blue-500 text-sm font-semibold mb-3 cursor-pointer"
              onClick={() => setShowFullText(!showFullText)}
            >
              {showFullText ? "Show Less" : "Show More"}
            </button>
          )}

          {userPosts?.image && (
            <div className=" h-48 md:h-150 mb-3 rounded-2xl">
              <img
                src={userPosts?.image}
                className="rounded-2xl cursor-pointer"
                alt="post image"
                onClick={() => setOpenViewerImage(userPosts?.image)}
              />
            </div>
          )}
        </CardBody>
        <div className="flex flex-col gap-4 md:flex-row justify-between text-xs text-gray-500 mt-4">
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2">
              <span className="text-blue-500">
                <i className="fa-regular fa-thumbs-up"></i>
              </span>
              <span>
                {userPosts?.likesCount}{" "}
                {userPosts?.likesCount > 1 ? "likes" : "like"}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-blue-500">
                <i className="fa-solid fa-retweet"></i>
              </span>
              <span>
                {userPosts?.sharesCount}{" "}
                {userPosts?.sharesCount > 1 ? "shares" : "share"}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-blue-500">
                <i className="fa-regular fa-comment"></i>
              </span>
              <span>
                {userPosts?.commentsCount}{" "}
                {userPosts?.commentsCount > 1 ? "comments" : "comment"}
              </span>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <span>
              <i className="fa-regular fa-clock"></i>
            </span>
            <span>
              {userPosts?.createdAt &&
                $Utilities.Dates.displayPostAndCommentDate(userPosts.createdAt)}
            </span>
          </div>
        </div>
      </Card>
    </>
  );
}
