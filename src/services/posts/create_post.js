import { $API } from "../../api/axios";

/**
 * @param {{
 *  content: string,
 *  imageFile?: File
 *  privacy?: "public" | "following" | "only_me"
 * } | {
 *  content?: string,
 *  imageFile: File
 *  privacy?: "public" | "following" | "only_me"
 *  }
 * } payload - The payload is required
 */
export const createPost = async (payload) => {
  const ROUTE = `posts`;
  const formData = new FormData();
  payload.content && formData.append("body", payload.content);
  payload.imageFile && formData.append("image", payload.imageFile);
  !payload.privacy
    ? formData.append("privacy", "public")
    : formData.append("privacy", payload.privacy);

  const response = await $API.privateApi.post(`${ROUTE}`, formData);
  return response;
};
