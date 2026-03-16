import { Link } from "react-router";
import CustomAvatar from "../../../shared-components/avatars/CustomAvatar";

export default function CommentHeader({ headerData }) {
  return (
    <div className="flex items-start gap-3">
      {/* Avatar */}
      <CustomAvatar
        avatarData={{
          name: headerData?.commentCreator?.name,
          image: headerData?.commentCreator?.photo,
          username: headerData?.commentCreator?.username,
        }}
      />

      {/* Comment bubble */}
      <div className="bg-gray-100 px-4 py-3 rounded-2xl max-w-full">
        {/* User info */}
        <div className="flex flex-col md:flex-row justify-center md:items-center md:justify-start  gap-1 md:gap-2 mb-1">
          <Link
            to={`/profile/${headerData?.commentCreator?._id}`}
            className="font-semibold text-gray-800 hover:underline text-xs md:text-sm"
          >
            {headerData?.commentCreator?.name}
          </Link>

          {headerData?.commentCreator?.username && (
            <span className="text-xs text-neutral-400">
              @{headerData?.commentCreator?.username}
            </span>
          )}
        </div>

        {/* Comment text */}
        <p className="text-sm text-gray-700 leading-relaxed wrap-anywhere">
          {headerData?.comment?.content}
        </p>
      </div>
    </div>
  );
}
