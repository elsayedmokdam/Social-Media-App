import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
} from "@heroui/react";
import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { $Services } from "../../services/services-repository";
import { $Utilities } from "../../utilities/utilities-repository";



export default function SharePostModal({
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

    const postShareMutation = useMutation({
      mutationFn: ({postId, content}) =>
        $Services.POSTS_REPOSITORY.sharePost(postId, content),
      onSuccess: () => {
        $Utilities.Alerts.displaySuccess("Post shared successfully");
        isOpen && onOpenChange(false);
      }
      ,
      onError: (error) => {
        $Utilities.Alerts.displayError(error);
        isOpen && onOpenChange(false);
      },
    });


  function sharePost(data) {
    console.log("data", data.postDescription);
    console.log("postId", postId);
    postShareMutation.mutate({ postId, content: data.postDescription });
  }

  return (
    <>
      <Modal isOpen={isOpen} placement="top-center" onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1 text-gray-500 text-sm">
                <h5 className="text-medium text-gray-800">Share Post</h5>
              </ModalHeader>
              <form
                onSubmit={handleSubmit(sharePost)}
                className="flex flex-col gap-5"
              >
                <ModalBody>
                  <textarea
                    {...register("postDescription")}
                    placeholder="Say something about this post..."
                    className="w-full p-3 border border-neutral-200 outline-1 outline-neutral-200 rounded-md resize-none"
                    maxLength={500}
                    rows={3}
                  ></textarea>
                </ModalBody>
                <ModalFooter>
                  <button type="button" onClick={onClose} className="text-white bg-rose-600 px-4 py-2 rounded-md cursor-pointer">Cancel</button>
                  <button
                    disabled={postShareMutation.isPending}
                    className={`${postShareMutation.isPending ? "cursor-not-allowed bg-blue-600" : "cursor-pointer bg-blue-500"} text-white px-4 py-2 rounded-md`}
                    type="submit"
                  >
                    {postShareMutation.isPending ? (
                      <i className="fa-solid fa-spinner animate-spin"></i>
                    ) : (
                      "Share"
                    )}
                  </button>
                </ModalFooter>
              </form>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
