import { $API } from "../../../api/axios";

export const getBookmarks = async (queryParams) => {
  const ROUTE = "users/bookmarks";

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
