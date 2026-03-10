import { Link } from "react-router";
import CustomAvatar from "../avatars/CustomAvatar";
import PostPrivacy from "../../feed/posts/PostPrivacy";
import { $Utilities } from "../../../utilities/utilities-repository";

export default function UserMetaInfo({ postCreator }) {
  const formatDate = $Utilities.Dates.displayRelativeTime;
  console.log(postCreator);
  return (
    <div className="flex items-center gap-3 ">
      <Link to={`/profile/${postCreator?._id}`}>
        <CustomAvatar
          avatarData={{
            name: postCreator?.name,
            image: postCreator?.photo,
            username: postCreator?.username,
          }}
        />
      </Link>
      <div className=" flex flex-col">
        <Link to={`/profile/${postCreator?._id}`} className="font-bold text-sm">
          {postCreator?.name}
        </Link>
        <div className="flex items-center gap-2">
          {/* <span className=" block size-1 rounded-full bg-neutral-400"></span> */}
          <span className="text-neutral-400 text-sm">
            {formatDate(postCreator?.createdAt)}
          </span>
          {/* <span className=" block size-1 rounded-full bg-neutral-400"></span> */}
          {/* Select Privacy */}
          <PostPrivacy privacy={postCreator?.privacy} />
        </div>
      </div>
    </div>
  );
}
