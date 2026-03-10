import { $API } from "../../../api/axios";

/**
 * @param {File} imageFile - The imageFile is required
 */
export const uploadProfilePhoto = async (imageFile) => {
  const ROUTE = `users/upload-photo`;
  const formData = new FormData();
  formData.append("photo", imageFile);

  const response = await $API.privateApi.put(`${ROUTE}`, formData);
  return response;
};
