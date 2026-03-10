import { $API } from "../../../api/axios";

/**
 * @param {string} postId - The postId is required
 * @param {string} commentId - The commentId is required
 * @param {{
 *  page?:number,
 *  limit?:number
 * }} queryParams - The queryParams is optional
 */

export const getCommentReplies = async (postId, commentId, queryParams) => {
  const ROUTE = `posts/${postId}/comments/${commentId}/replies`;
  const finalParams = {
    page: 1,
    limit: 10,
    ...queryParams,
  };
  const response = await $API.privateApi.get(`${ROUTE}`, {
    params: {
      ...finalParams,
    },
  });
  return response;
};
