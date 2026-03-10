import CustomAvatar from "../../../shared-components/avatars/CustomAvatar";
import { useState } from "react";
import EmojiPicker from "emoji-picker-react";
import { $Utilities } from "../../../../utilities/utilities-repository";
import { Controller, useForm } from "react-hook-form";
import { $Services } from "../../../../services/services-repository";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export default function CreateComment({ postId, activeTab }) {
  const queryClient = useQueryClient();
  let activeQuery;

  const [showPicker, setShowPicker] = useState(false);
  const [text, setText] = useState("");
  const [showImage, setShowImage] = useState(null);
  const { register, handleSubmit, reset, setValue, getValues } = useForm({
    defaultValues: {
      content: "",
      imageFile: null,
    },
  });

  // Create a comment

  const commentMutation = useMutation({
    mutationFn: (data) => {
      return $Services.COMMENTS_REPOSITORY.createComment(postId, data);
    },
    onSuccess: () => {
      reset();
      setShowImage(null);
      setShowPicker(false);
      setText("");
      $Utilities.Alerts.displaySuccess("Comment created successfully");
      queryClient.invalidateQueries({
        queryKey: ["comments", postId],
      });
      queryClient.invalidateQueries({
        queryKey: [activeQuery],
      });
    },
    onError: (error) => {
      $Utilities.Alerts.displayError(error.message);
    },
  });

  function onSubmit(data) {
    commentMutation.mutate(data);
  }
  //   toggle emoji picker
  function toggleShowPicker() {
    setShowPicker(!showPicker);
  }

  //   handle emoji select
  function handleEmojiSelect(e) {
    const emoji = e.emoji;
    const content = getValues("content");
    setValue("content", content + emoji);
  }

  //   delete image
  function deleteImage() {
    setShowImage(null);
  }
  //   handle show image
  const handleShowImage = (e) => {
    const blob = $Utilities.generalHelpers.getImageBlob(e.target.files[0]);
    setValue("imageFile", e.target.files[0]);
    setShowImage(blob);
  };

  switch (activeTab) {
    case "feed":
      activeQuery = "feed";
      break;
    case "myPosts":
      activeQuery = "myPosts";
      break;
    case "community":
      activeQuery = "community";
      break;
    case "bookmarks":
      activeQuery = "savedPosts";
      break;
  }
  return (
    <form className="mt-5" onSubmit={handleSubmit((data) => onSubmit(data))}>
      <div className="flex items-center gap-3">
        <div className="self-start">
          <CustomAvatar size="w-10 h-10" />
        </div>
        <div className="w-full bg-white px-7 pt-5 pb-3 rounded-3xl">
          {
            <textarea
              {...register("content", {
                onChange: (e) => {
                  setText(e.target.value);
                },
              })}
              rows="4"
              cols="50"
              className="w-full border-0 focus:outline-none placeholder:text-neutral-400 placeholder:text-sm"
              placeholder="Write a comment..."
            />
          }
          <div className="flex items-center  justify-between mt-3">
            <div className="flex items-center gap-3">
              <input
                type="file"
                hidden
                id="upload-comment-image"
                {...register("imageFile", {
                  onChange: handleShowImage,
                })}
              />
              <label
                htmlFor="upload-comment-image"
                className="text-neutral-400 text-xl cursor-pointer"
              >
                <i className="fa-regular fa-image"></i>
              </label>
              <div className="flex items-center gap-2 cursor-pointer relative">
                {showPicker && (
                  <div className="absolute top-10 z-50">
                    <EmojiPicker onEmojiClick={handleEmojiSelect} />
                  </div>
                )}
                <label
                  htmlFor="video"
                  className="flex items-center gap-2"
                  onClick={toggleShowPicker}
                >
                  <i className="fa-regular fa-face-smile text-orange-500 cursor-pointer text-xl "></i>
                </label>
              </div>
            </div>
            <button
              type="submit"
              className={`text-xl ${text ? "text-blue-500 cursor-pointer" : "text-neutral-400  cursor-not-allowed"} `}
              disabled={!text || commentMutation.isPending}
            >
              {commentMutation.isPending ? (
                <i className="fa-solid fa-spinner animate-spin"></i>
              ) : (
                <i className="fa-regular fa-paper-plane"></i>
              )}
            </button>
          </div>
        </div>
      </div>
      {
        /* Image */
        showImage && (
          <div className="flex items-center gap-3 mt-5 bg-neutral-300 p-2 w-full h-70 rounded-2xl overflow-hidden relative">
            <img src={showImage} alt="avatar" className="rounded-2xl" />
            <span
              onClick={deleteImage}
              className="text-white/60 cursor-pointer text-xl absolute top-3 right-4 bg-black/60   size-8 flex items-center justify-center rounded-full"
            >
              <i className="fa-solid fa-xmark "></i>
            </span>
          </div>
        )
      }
    </form>
  );
}
