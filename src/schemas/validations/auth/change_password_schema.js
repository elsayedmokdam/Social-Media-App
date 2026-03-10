import * as zod from "zod";

export const changePasswordSchemaValidation = zod
  .object({
    password: zod.string().nonempty("Current password is required"),
    newPassword: zod
      .string()
      .nonempty("New Password is required")
      .min(6, "Password must be at least 6 characters")
      .max(20, "Password must be less than 20 characters")
      .regex(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@.#$!%*?&])[A-Za-z\d@.#$!%*?&]{8,15}$/,
        "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character",
      ),

    reNewPassword: zod.string().nonempty("Confirm password is required"),
  })
  .refine((data) => data.newPassword === data.reNewPassword, {
    error: "Confirm password does not match new password",
    path: ["reNewPassword"],
  });