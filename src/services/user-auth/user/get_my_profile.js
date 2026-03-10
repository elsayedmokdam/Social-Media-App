import { $API } from "../../../api/axios";

export const getMyProfile = async () => {
  const ROUTE = "users/profile-data";

  const response = await $API.privateApi.get(`${ROUTE}`);
  return response;
};
