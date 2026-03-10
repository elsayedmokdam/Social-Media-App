import { $API } from "../../../api/axios";

/**
 * @param {{email:string, password:string}} payload - The payload is required
 */
export const signin = async (payload) => {
  const ROUTE = `users/signin`;

  const response = await $API.publicApi.post(`${ROUTE}`, payload);
  return response;
};
