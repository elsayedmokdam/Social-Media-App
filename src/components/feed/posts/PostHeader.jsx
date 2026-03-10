import EditPost from "./EditPost";
import CustomAvatar from "../../shared-components/avatars/CustomAvatar";
import { $Utilities } from "../../../utilities/utilities-repository";
import { Link } from "react-router";
import PostPrivacy from "./PostPrivacy";
import { Tooltip } from "@heroui/react";

export default function PostHeader({ postCreator = {} }) {
  const formatDate = $Utilities.Dates.displayRelativeTime;

  const { _id, name, createdAt, privacy, postId, isBookmarked } = postCreator;

  return (
    <div className="flex items-center justify-between relative">
      {/* User Info */}
      <div className="flex gap-3">
        <CustomAvatar avatarData={postCreator} />

        <div className="flex flex-col gap-1">
          <Link
            to={`/profile/${_id}`}
            className="font-bold text-sm hover:underline"
          >
            {name}
          </Link>

          <div className="flex items-center gap-2">
            <span className="text-neutral-400 text-sm">
              {formatDate(createdAt)}
            </span>

            <PostPrivacy privacy={privacy} />
          </div>
        </div>
      </div>

      {/* Actions */}
      <EditPost postId={postId} userId={_id} isBookmarked={isBookmarked} />

      {/* Bookmark icon */}
      {isBookmarked && (
        <Tooltip content="Saved">
          <div className="text-blue-500 absolute top-0 right-0 translate-x-1/2 -translate-y-1/2">
            <i className="fa-solid fa-bookmark fa-lg"></i>
          </div>
        </Tooltip>
      )}
    </div>
  );
}
