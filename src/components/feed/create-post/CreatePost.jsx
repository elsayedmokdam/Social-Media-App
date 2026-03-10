import React, { useState } from "react";
import avatar from "../../../assets/images/avatar-generations_rpge.jpg";
import { Divider } from "@heroui/react";
import { $Utilities } from "../../../utilities/utilities-repository";
import EmojiPicker from "emoji-picker-react";
import { Controller, useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { $Services } from "../../../services/services-repository";
import SelectPrivacyForCreatePost from "./SelectPrivacy";
import UserMetaInfo from "../../shared-components/user/UserMetaInfo";
import CustomAvatar from "../../shared-components/avatars/CustomAvatar";
import { $HOOKS_REPOSITORY } from "../../../hooks/hooks_repository";
import { useAuth } from "../../../hooks/useAuth";
export default function CreatePost({ activeTab }) {
  const {userProfile} = useAuth();
  const queryClient = useQueryClient();
  const [text, setText] = useState("");
  const [showImage, setShowImage] = useState(null);
  const [showPicker, setShowPicker] = useState(false);
  const { register, handleSubmit, reset, control, setValue } = useForm({
    defaultValues: {
      content: "",
      imageFile: null,
      privacy: "public",
    },
  });

  const createPostMutation = useMutation({
    mutationFn: (payload) => $Services.POSTS_REPOSITORY.createPost(payload),
    onSuccess: () => {
      reset();
      setShowImage(null);
      setShowPicker(false);
      setText("");
      $Utilities.Alerts.displaySuccess("Post created successfully");
      queryClient.invalidateQueries({
        queryKey: ["posts", activeTab],
      });
    },
    onError: () => {
      $Utilities.Alerts.displayError("Error creating post");
    },
  });

  const handleShowImage = (e) => {
    const blob = $Utilities.generalHelpers.getImageBlob(e.target.files[0]);
    setShowImage(blob);
  };

  function deleteImage() {
    setShowImage(null);
    setValue("imageFile", null);
  }

  function onSubmit(data) {
    const payload = {
      ...data,
      imageFile: data?.imageFile?.[0] || null,
    };
    createPostMutation.mutate(payload);
  }

  return (
    <div className="bg-white rounded-2xl border border-neutral-200 p-5 shadow-sm">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {/* Header */}
        <div className="flex items-start gap-3">
          <CustomAvatar avatarData={userProfile} />

          <div className="flex flex-col">
            <h2 className="font-semibold text-sm">{userProfile?.name}</h2>

            <Controller
              control={control}
              name="privacy"
              render={({ field }) => (
                <SelectPrivacyForCreatePost
                  value={field.value}
                  onChange={field.onChange}
                />
              )}
            />
          </div>
        </div>

        {/* Textarea */}
        <textarea
          rows="5"
          maxLength={500}
          placeholder={`What's on your mind, ${userProfile?.name}? 😃`}
          className="w-full resize-none bg-neutral-100 rounded-xl p-4 text-sm focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-200 transition"
          {...register("content")}
          value={text}
          onChange={(e) => setText(e.target.value)}
        />

        {/* Image Preview */}
        {showImage && (
          <div className="relative w-full h-72 rounded-xl overflow-hidden border">
            <img
              src={showImage}
              alt="preview"
              className="w-full h-full object-cover"
            />

            <button
              type="button"
              onClick={deleteImage}
              className="absolute top-2 right-2 bg-black/70 hover:bg-black text-white size-8 rounded-full flex items-center justify-center"
            >
              <i className="fa-solid fa-xmark"></i>
            </button>
          </div>
        )}

        {/* Divider */}
        <Divider />

        {/* Actions */}
        <div className="flex items-center justify-between">
          {/* Left Actions */}
          <div className="flex items-center gap-6">
            {/* Upload */}
            <div>
              <input
                type="file"
                id="image-video"
                hidden
                {...register("imageFile", {
                  onChange: (e) => handleShowImage(e),
                })}
              />

              <label
                htmlFor="image-video"
                className="flex items-center gap-2 cursor-pointer text-neutral-600 hover:text-black"
              >
                <i className="fa-solid fa-image text-green-500 text-xl"></i>
                <span className="hidden md:block text-sm">Photo</span>
              </label>
            </div>

            {/* Emoji */}
            <div className="relative">
              {showPicker && (
                <div className="absolute top-10 z-50">
                  <EmojiPicker
                    onEmojiClick={(e) => setText((prev) => prev + e.emoji)}
                  />
                </div>
              )}

              <button
                type="button"
                onClick={() => setShowPicker(!showPicker)}
                className="flex items-center gap-2 text-neutral-600 hover:text-black"
              >
                <i className="fa-regular fa-face-smile text-orange-500 text-xl"></i>
                <span className="hidden md:block text-sm">Feeling</span>
              </button>
            </div>
          </div>

          {/* Right Actions */}
          <div className="flex items-center gap-3">
            {/* Character Counter */}
            <p className="text-xs text-neutral-500 ">{text.length}/500</p>

            {/* Post Button */}
            <button
              disabled={createPostMutation.isPending || text.length === 0}
              type="submit"
              className={`bg-blue-500 hover:bg-blue-600 disabled:bg-blue-300 text-white px-5 py-2 rounded-lg flex items-center gap-2 text-sm font-semibold transition ${createPostMutation.isPending || text.length === 0 ? "cursor-not-allowed" : ""}`}
            >
              {createPostMutation.isPending ? (
                <i className="fa-solid fa-spinner animate-spin"></i>
              ) : (
                <>
                  <span>Post</span>
                  <i className="fa-solid fa-paper-plane"></i>
                </>
              )}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
