import { useDisclosure } from "@heroui/react";
import { useState } from "react";
import EditPrivacyModal from "../../modals/EditPrivacyModal";
import { $HOOKS_REPOSITORY } from "../../../hooks/hooks_repository";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { $Services } from "../../../services/services-repository";
import { $Utilities } from "../../../utilities/utilities-repository";
import { $QUERY_KEYS } from "../../../query-keys/queryKeys";

const actions = [
  {
    key: "save",
    label: "Save",
    icon: <i className="fa-regular fa-bookmark"></i>,
  },
  {
    key: "editPost",
    label: "Edit Post",
    icon: <i className="fa-regular fa-pen-to-square"></i>,
  },
  {
    key: "editPrivacy",
    label: "Edit Privacy",
    icon: <i className="fa-solid fa-lock"></i>,
  },
  {
    key: "delete",
    label: "Delete",
    icon: <i className="fa-regular fa-trash-can"></i>,
  },
];

export default function EditPost({ postId, userId, isBookmarked }) {
  const [show, setShow] = useState(false);
  const [selectValue, setSelectValue] = useState("Public");
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const myProfileQuery = $HOOKS_REPOSITORY.useMyProfile();
  const queryClient = useQueryClient();
  function toggleShow() {
    setShow(!show);
  }

  function handleSelectedValue(value) {
    setSelectValue(value);
    setShow(false);
    if (value === "Edit Privacy") onOpen();
    if (value === "Save") bookmarkPostMutation.mutate(postId);
    if (value === "Delete") deletePostMutation.mutate(postId);
  }

  const bookmarkPostMutation = useMutation({
    mutationKey: $QUERY_KEYS.posts.bookmark(postId),
    mutationFn: (postId) =>
      $Services.POSTS_REPOSITORY.bookmarkAndUnbookmarkPost(postId),
    onSuccess: (data) => {
      console.log(data);
      $Utilities.Alerts.displaySuccess(
        `${data.data.bookmarked ? "Bookmarked" : "Unbookmarked"} successfully`,
      );
      queryClient.invalidateQueries({
        queryKey: $QUERY_KEYS.posts.bookmark(postId),
      });
      queryClient.invalidateQueries({
        queryKey: $QUERY_KEYS.posts.all,
      });
    },

    onError: (error) => {
      $Utilities.Alerts.displayError(error);
    },
  });

  const deletePostMutation = useMutation({
    mutationKey: $QUERY_KEYS.posts.delete(postId),
    mutationFn: (postId) => $Services.POSTS_REPOSITORY.deletePost(postId),
    onSuccess: () => {
      $Utilities.Alerts.displaySuccess("Post deleted successfully");
      queryClient.invalidateQueries({
        queryKey: $QUERY_KEYS.posts.delete(postId),
      });
      queryClient.invalidateQueries({
        queryKey: $QUERY_KEYS.posts.all,
      });
    },
    onError: (error) => {
      $Utilities.Alerts.displayError(error);
    },
  });

  return (
    <div className="relative">
      <p onClick={toggleShow} className="cursor-pointer">
        <span>
          <i className="fa-solid fa-ellipsis"></i>
        </span>
      </p>
      {show && (
        <ul className="list-none bg-white border  border-neutral-200  rounded-xl overflow-hidden shadow-md min-w-35 absolute top-5 end-0">
          {actions.map((item) => (
            <li
              key={item.key}
              onClick={() => handleSelectedValue(item.label)}
              className={`flex items-center gap-2 px-3 py-2.5 rounded-lg ${item.key === "delete" ? "text-red-500" : "text-neutral-600"} text-xs hover:bg-neutral-100 cursor-pointer ${!(myProfileQuery?.data?.data?.user?._id === userId) && (item.key === "delete" || item.key === "editPrivacy" || item.key === "editPost") ? "hidden" : ""} `}
            >
              <span>{item.icon}</span>
              <span>
                {isBookmarked && item.key === "save" ? "Un Save" : item.label}
              </span>
            </li>
          ))}
        </ul>
      )}
      <EditPrivacyModal
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        postId={postId}
      />
    </div>
  );
}
