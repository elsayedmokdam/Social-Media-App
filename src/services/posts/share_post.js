import { $API } from "../../api/axios";


/**
 * @param {string} postId - The postId is required
 * @param {string} [content] - The content is optional
 */
export const sharePost = async (postId, content) => {
  const ROUTE = `posts/${postId}/share`;

  const response = await $API.privateApi.post(
    `${ROUTE}`,
    content ? { body: content }: {},
    {
      headers: {
        "Content-Type": "application/json",
      },
    },
  );

  return response;
};
