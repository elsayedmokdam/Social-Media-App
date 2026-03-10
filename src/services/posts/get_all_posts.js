import { $API } from "../../api/axios";

export const getAllPosts = async () => {
  const ROUTE = "posts";

  const response = await $API.privateApi.get(`${ROUTE}`);
  return response;
};
