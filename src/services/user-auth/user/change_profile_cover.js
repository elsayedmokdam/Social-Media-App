import { $API } from "../../../api/axios";

/**
 * @param {{imageFile:File, privacy?:"public" | "following" | "only_me"}} payload - The imageFile is required
 */
export const changeProfileCover = async (payload) => {
  const ROUTE = `users/upload-cover`;
  const formData = new FormData();
  payload.imageFile && formData.append("cover", payload.imageFile);
  payload.privacy && formData.append("privacy", payload.privacy);

  if (!payload.privacy) formData.append("privacy", "public");

  const response = await $API.privateApi.put(`${ROUTE}`, formData);
  return response;
};
