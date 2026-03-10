import { Input } from "@heroui/react";
import { useForm } from "react-hook-form";
import { changePasswordSchemaValidation } from "../../../schemas/validations/auth/change_password_schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { $Utilities } from "../../../utilities/utilities-repository";
import { $Services } from "../../../services/services-repository";

  export default function ChangePasswordPage() {
  const {
    register,
    formState: { errors, isValid },
    control,
    handleSubmit,
    reset,
    watch,
  } = useForm({
    defaultValues: {
      password: "",
      newPassword: "",
      reNewPassword: "",
    },
    mode: "all",
    resolver: zodResolver(changePasswordSchemaValidation),
  });

  const changePasswordMutation = useMutation({
    mutationFn: (payload) => $Services.AUTH_REPOSITORY.changePassword({password: payload.password, newPassword: payload.newPassword}),
    onSuccess: () => {
      $Utilities.Alerts.displaySuccess("Password changed successfully");
      reset();
    },
    onError: (error) => {
      $Utilities.Alerts.displayError(error);
    },
  })

  function changePassword(payload) {
    changePasswordMutation.mutate(payload);
    // console.log(payload);
  }

  return (
    <div className="bg-white w-[90%] lg:w-[40%] mx-auto p-7 rounded-2xl">
      <div className="flex items-center gap-4">
        <span className="text-xl text-blue-500 size-10 flex items-center justify-center bg-blue-100 rounded-full">
          <i className="fa-solid fa-key"></i>
        </span>
        <div>
          <h1 className="text-xl font-semibold text-gray-700">
            Change Password
          </h1>
          <p className="text-xs text-gray-500 font-">
            Keep your account secure by using a strong password.
          </p>
        </div>
      </div>
      {/* Form */}
      <form onSubmit={handleSubmit(changePassword)} className="mt-10">
        {/* Current Password */}
        <Input
          {...register("password")}
          isInvalid={!!errors.password}
          errorMessage={errors.password?.message}
          type="password"
          placeholder="Enter Current Password"
          label="Current Password"
          labelPlacement="outside"
          classNames={{
            label: "text-gray-500 text-sm font-semibold",
            input: "text-gray-700 text-xs",
            inputWrapper:
              " mt-2 border border-gray-200 rounded-xl focus-within:border-blue-500",
          }}
        />
        {/* New Password */}
        <Input
          {...register("newPassword")}
          isInvalid={!!errors.newPassword}
          errorMessage={errors.newPassword?.message}
          type="password"
          placeholder="Enter New Password"
          label="New Password"
          labelPlacement="outside"
          classNames={{
            label: "text-gray-500 text-sm font-semibold",
            input: "text-gray-700 text-xs",
            inputWrapper:
              " mt-2 border border-gray-200 rounded-xl focus-within:border-blue-500",
          }}
        />
        {/* Confirm Password */}
        <Input
          {...register("reNewPassword")}
          isInvalid={!!errors.reNewPassword}
          errorMessage={errors.reNewPassword?.message}
          type="password"
          placeholder="Enter Confirm Password"
          label="Confirm Password"
          labelPlacement="outside"
          classNames={{
            label: "text-gray-500 text-sm font-semibold",
            input: "text-gray-700 text-xs",
            inputWrapper:
              " mt-2 border border-gray-200 rounded-xl focus-within:border-blue-500",
          }}
        />
        {/* Button */}
        <button
          type="submit"
          disabled={!isValid}
          className={`w-full bg-blue-500 hover:bg-blue-600 text-white py-3 mt-5 rounded-xl font-semibold ${!isValid ? "opacity-50 cursor-not-allowed" : "cursor-pointer"}`}
        >
          Change Password
        </button>
      </form>
    </div>
  );
}
