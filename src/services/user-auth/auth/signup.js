import { $API } from "../../../api/axios";

/**
 * @param {{name:string, username?:string, email:string, dateOfBirth:string, gender:string, password:string, rePassword:string}} payload - The payload is required
 */
export const signup = async (payload) => {
  const ROUTE = `users/signup`;

  const response = await $API.publicApi.post(`${ROUTE}`, payload);
  return response;
};
