import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
} from "@heroui/react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { $Services } from "../../services/services-repository";
import { $Utilities } from "../../utilities/utilities-repository";
import { $QUERY_KEYS } from "../../query-keys/queryKeys";

const PrivacyList = [
  {
    key: "public",
    label: "Public",
    description: "Everyone can see your post",
    icon: <i className="fa-solid fa-globe "></i>,
  },
  {
    key: "following",
    label: "Following",
    description: "Only people you follow can see your post",
    icon: <i className="fa-solid fa-user-group"></i>,
  },
  {
    key: "only_me",
    label: "Only Me",
    description: "Only you can see your post",
    icon: <i className="fa-solid fa-lock "></i>,
  },
];

export default function EditPrivacyModal({
  isOpen,
  onOpen,
  onOpenChange,
  postId,
}) {
  const { handleSubmit, register } = useForm({
    defaultValues: {
      privacy: "public",
    },
  });
  const queryClient = useQueryClient();

  const privacyMutation = useMutation({
    mutationFn: ({ postId, privacy }) =>
      $Services.POSTS_REPOSITORY.updatePost(postId, { privacy }),
    onSuccess: () => {
      $Utilities.Alerts.displaySuccess("Post privacy updated");
      isOpen && onOpenChange(false);
      queryClient.invalidateQueries({
        queryKey: $QUERY_KEYS.posts.all,
      })
    },
    onError: (error) => {
      $Utilities.Alerts.displayError(error);
      isOpen && onOpenChange(false);
    },
  });
  function handlePrivacy(data) {
    console.log("data", data);
    console.log("postId", postId);
    privacyMutation.mutate({ postId, privacy: data.privacy });
  }
  return (
    <>
      <Modal isOpen={isOpen} placement="top-center" onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1 text-gray-500 text-sm">
                Who can see your post ?
              </ModalHeader>
              <form
                onSubmit={handleSubmit(handlePrivacy)}
                className="flex flex-col gap-5"
              >
                <ModalBody>
                  {PrivacyList.map((privacy) => (
                    <label key={privacy.key} className="flex justify-between items-center gap-2 cursor-pointer">
                      <div className="flex items-center gap-2">
                        <span className="text-xl text-gray-500">
                          {privacy.icon}
                        </span>
                        <div>
                          <p className="font-semibold text-sm mb-0">
                            {privacy.label}
                          </p>
                          <p className="text-xs text-gray-500 mb-0">
                            {privacy.description}
                          </p>
                        </div>
                      </div>
                      <input
                        className="size-5"
                        type="radio"
                        {...register("privacy")}
                        value={privacy.key}
                      />
                    </label>
                  ))}
                </ModalBody>
                <ModalFooter>
                  <Button color="danger" variant="flat" onPress={onClose}>
                    Cancel
                  </Button>
                  <Button type="submit" color="primary" onPress={onClose}>
                    Save
                  </Button>
                </ModalFooter>
              </form>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
