import toast from "react-hot-toast";

/**
 * @param {Error} error
 * @param {string} [message]
 */

export function displayError(error, message = "Invalid data!") {
  toast.error(error.response?.data?.message || error.message || message);
}

/**
 * @param {string} [message]
 */
export function displaySuccess(message = "Success!") {
  toast.success(message);
}

export const Alerts = { displayError, displaySuccess };
