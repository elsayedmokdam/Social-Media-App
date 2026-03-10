import { $API } from "../../../api/axios";

export const deleteProfileCover = async () => {
  const ROUTE = `users/cover`;

  const response = await $API.privateApi.delete(`${ROUTE}`);
  return response;
};
