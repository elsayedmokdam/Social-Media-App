import { $API } from "../../../api/axios";

/**
 *@param {{password:string, newPassword:string}} payload - The payload is required
 */

export const changePassword = async (payload) => {
  const ROUTE = "users/change-password";

  const response = await $API.privateApi.patch(`${ROUTE}`, payload, {
    headers: {
      "Content-Type": "application/json",
    },
  });
  return response;
};
