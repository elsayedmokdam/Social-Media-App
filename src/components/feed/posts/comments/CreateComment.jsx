import CustomAvatar from "../../../shared-components/avatars/CustomAvatar";
import { useState } from "react";
import EmojiPicker from "emoji-picker-react";
import { $Utilities } from "../../../../utilities/utilities-repository";
import { useForm } from "react-hook-form";
import { $Services } from "../../../../services/services-repository";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { $QUERY_KEYS } from "../../../../query-keys/queryKeys";
import { useAuth } from "../../../../hooks/useAuth";

export default function CreateComment({ postId, activeTab }) {
  const { userProfile } = useAuth();
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
      // Invalidate query key for all comments of the post
      queryClient.invalidateQueries({
        queryKey: $QUERY_KEYS.comments.all(postId),
      });
      // Invalidate query key for data of the post
      queryClient.invalidateQueries({
        queryKey: $QUERY_KEYS.posts.postDetails(postId),
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
    <form className="mt-6" onSubmit={handleSubmit((data) => onSubmit(data))}>
      <div className="flex gap-3">
        {/* Avatar */}
        <div className="self-start">
          <CustomAvatar
            avatarData={{
              name: userProfile?.name,
              image: userProfile?.photo,
              username: userProfile?.username,
            }}
            size="w-10 h-10"
          />
        </div>

        {/* Comment box */}
        <div className="flex-1 bg-white border border-neutral-200 rounded-2xl p-4 shadow-sm">
          {/* Textarea */}
          <textarea
            {...register("content", {
              onChange: (e) => setText(e.target.value),
            })}
            rows="3"
            maxLength={300}
            placeholder="Write a comment..."
            className="w-full resize-none text-sm border-0 outline-none placeholder:text-neutral-400"
          />

          {/* Actions */}
          <div className="flex items-center justify-between mt-3">
            {/* Left icons */}
            <div className="flex items-center gap-4">
              {/* Upload image */}
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
                className="text-neutral-400 hover:text-blue-500 transition cursor-pointer text-lg"
              >
                <i className="fa-regular fa-image"></i>
              </label>

              {/* Emoji */}
              <div className="relative">
                {showPicker && (
                  <div className="absolute top-10 z-50">
                    <EmojiPicker onEmojiClick={handleEmojiSelect} />
                  </div>
                )}

                <button
                  type="button"
                  onClick={toggleShowPicker}
                  className="text-orange-500 hover:scale-110 transition text-lg"
                >
                  <i className="fa-regular fa-face-smile"></i>
                </button>
              </div>
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={commentMutation.isPending || (!text && !showImage)}
              className={`flex items-center justify-center size-8 rounded-full transition ${commentMutation.isPending || (!text && !showImage) ? "opacity-50 cursor-not-allowed" : "cursor-pointer"}
          ${
            text || showImage
              ? "bg-blue-500 text-white hover:bg-blue-600"
              : "bg-neutral-200 text-neutral-400 cursor-not-allowed"
          }`}
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

      {/* Image Preview */}
      {showImage && (
        <div className="mt-4 ml-13 bg-white rounded-2xl border border-neutral-200">
          <div className=" relative max-w-sm mt-4 ml-13 bg-white rounded-2xl border border-neutral-200">
            <img
              src={showImage}
              alt="preview"
              className="rounded-xl border border-neutral-200"
            />

            <button
              type="button"
              onClick={deleteImage}
              className="absolute top-2 right-2 bg-black/60 hover:bg-black/80 text-white size-7 rounded-full flex items-center justify-center cursor-pointer"
            >
              <i className="fa-solid fa-xmark text-sm"></i>
            </button>
          </div>
        </div>
      )}
    </form>
  );
}
