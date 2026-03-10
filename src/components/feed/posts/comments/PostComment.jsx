import { $Utilities } from "../../../../utilities/utilities-repository";
import Avatar from "../../../../assets/images/avatar-generations_rpge.jpg";
import ThumbsUp from "../../../shared-components/buttons/ThumbsUp";
import CommentHeader from "./CommentHeader";
import CommentActions from "./CommentActions";
export default function PostComment({ comment }) {
  return (
    <>
      {/* comment header & content*/}
      <CommentHeader
        headerData={{
          commentCreator: {
            ...comment?.commentCreator,
          },
          comment: {
            content: comment?.content,
            createdAt: comment?.createdAt,
          },
        }}
      />
      {/* comment Actions */}
      <div className="container flex items-center justify-between gap-3 mb-5">
        <CommentActions
          commentActionsData={{
            likes: comment?.likes,
            createdAt: comment?.createdAt,
          }}
        />
      </div>
    </>
  );
}
