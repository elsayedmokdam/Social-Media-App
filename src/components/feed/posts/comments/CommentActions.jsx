import {
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
} from "@heroui/react";
import { $Utilities } from "../../../../utilities/utilities-repository";
import ThumbsUp from "../../../shared-components/buttons/ThumbsUp";
import { Link } from "react-router";
import CommentLikes from "./CommentLikes";

export default function CommentActions({ commentActionsData }) {
  return (
    <>
      <div className="flex items-center gap-6">
        <p className="text-sm font-semibold text-neutral-400">
          {$Utilities.Dates.displayPostAndCommentDate(
            commentActionsData?.createdAt,
          )}
        </p>
        <div className="flex items-center gap-4">
          <button className="text-sm font-semibold text-neutral-400 cursor-pointer hover:text-blue-500 ">
            Reply
          </button>
          {commentActionsData?.likes?.length > 0 && (
            <CommentLikes commentLikes={commentActionsData?.likes} />
          )}
        </div>
      </div>
      <div>
        <button className="text-neutral-400 hover:text-blue-500 cursor-pointer">
          <i className="fa-regular fa-thumbs-up"></i>
        </button>
      </div>
    </>
  );
}
