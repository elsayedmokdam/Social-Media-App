import { Link, useLocation } from "react-router";
import bgImage from "../../../assets/images/signup-bg-DGRfriy9.png";
import image from "../../../assets/images/avatar-generations_rpge.jpg";
import { Form, Input } from "@heroui/react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import AppButton from "../../../components/shared-components/appbutton/AppButton";
import { signinSchemaValidation } from "../../../schemas/validations/auth/signin_schema";
import { useMutation } from "@tanstack/react-query";
import { $Services } from "../../../services/services-repository";
import { $Utilities } from "../../../utilities/utilities-repository";
import { $Contexts } from "../../../context/context-repository";
export default function Signin() {
  const { setSocialAppToken } = $Contexts.useAuth();

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
    mode: "all",
    resolver: zodResolver(signinSchemaValidation),
  });
  function onSubmit(payload) {
    mutate(payload);
  }
  const { mutate, isPending } = useMutation({
    mutationFn: (payload) => $Services.AUTH_REPOSITORY.signin(payload),
    onSuccess: ({ data }) => {
      // navigate(from, { replace: true }); --- IGNORE since the cpt will rerender and the user will be redirected from the GuestRoute---
      $Utilities.Alerts.displaySuccess("Login successfully!");
      setSocialAppToken(data.token || null);
      // setUserProfile(data.user || null); --- IGNORE since the profile will be fetched in the AuthContextProvider after setting the token---
    },
    onError: (error) => {
      $Utilities.Alerts.displayError(error);
    },
  });

  return (
    <>
      <div
        className={`min-h-screen grid grid-cols-1 lg:grid-cols-2 transition-opacity duration-3000 ease-in-out`}
      >
        <section
          className="bg-cover bg-center relative before:absolute before:inset-0 before:bg-blue-600/75 dark:before:bg-gray-900/75 transition-colors duration-400 ease-in-out p-8"
          style={{ backgroundImage: `url(${bgImage})` }}
        >
          <div className="relative z-10 ">
            <div>
              <h1 className="text-white flex items-center gap-2">
                <span className="text-lg font-bold size-12 flex justify-center items-center bg-white/40 border border-white/30 rounded-xl">
                  S
                </span>
                <span className="text-3xl font-bold">SocialHub</span>
              </h1>
              <h2 className="text-white text-5xl my-4 font-bold">
                Welcome Back <br />
                <span className="bg-linear-to-r from-cyan-300 to-cyan-100 bg-clip-text text-transparent">
                  to SocialHub App
                </span>
              </h2>
              <p className="text-white mt-4 text-lg">
                Signin to connect people all over the world
              </p>
            </div>

            <div className="mt-8">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                <div className="flex flex-col gap-4">
                  <div className="flex items-center gap-3 rounded-xl bg-white/20 text-white border border-white/30 px-4 py-2 hover:scale-105 transition-transform duration-300 backdrop-blur-lg">
                    <div className="size-10 flex justify-center items-center rounded-xl bg-teal-400/20 text-green-300">
                      <i className="fa-solid fa-message"></i>
                    </div>
                    <div>
                      <h3>Real-time Chat</h3>
                      <p>Instant messaging</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 rounded-xl bg-white/20 text-white border border-white/30 px-4 py-2 hover:scale-105 transition-transform duration-300 backdrop-blur-lg">
                    <div className="size-10 flex justify-center items-center rounded-xl bg-blue-400/20 text-blue-200">
                      <i className="fa-solid fa-image"></i>
                    </div>
                    <div>
                      <h3>Share Media</h3>
                      <p>Photos & videos</p>
                    </div>
                  </div>
                </div>

                <div className="flex flex-col gap-4">
                  <div className="flex items-center gap-3 rounded-xl bg-white/20 text-white border border-white/30 px-4 py-2 hover:scale-105 transition-transform duration-300 backdrop-blur-lg">
                    <div className="size-10 flex justify-center items-center rounded-xl bg-pink-400/20 text-pink-200">
                      <i className="fa-solid fa-bell"></i>
                    </div>
                    <div>
                      <h3>Smart Alerts</h3>
                      <p>Stay updated</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 rounded-xl bg-white/20 text-white border border-white/30 px-4 py-2 hover:scale-105 transition-transform duration-300 backdrop-blur-lg">
                    <div className="size-10 flex justify-center items-center rounded-xl bg-teal-400/20 text-green-300">
                      <i className="fa-solid fa-users"></i>
                    </div>
                    <div>
                      <h3>Communities</h3>
                      <p>Find your tribe</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex gap-5 md:gap-8 items-center my-8">
              <div className="flex flex-col gap-1 text-white">
                <div className="flex gap-2 items-center">
                  <i className="fa-solid fa-users"></i>
                  <h3 className="text-2xl font-bold">2M+</h3>
                </div>
                <h3 className="text-lg text-center">Active Users</h3>
              </div>

              <div className="flex flex-col gap-1 text-white">
                <div className="flex gap-2 items-center">
                  <h3 className="text-2xl font-bold">10M+</h3>
                </div>
                <h3 className="text-lg text-center">Posts Shared</h3>
              </div>

              <div className="flex flex-col gap-1 text-white">
                <div className="flex gap-2 items-center">
                  <i className="fa-solid fa-message"></i>
                  <h3 className="text-2xl font-bold">50M+</h3>
                </div>
                <h3 className="text-lg text-center">Message Sent</h3>
              </div>
            </div>

            <div className="mt-8 rounded-xl bg-white/20 text-white border border-white/30 p-5 hover:bg-white/30 transition-background duration-300 backdrop-blur-lg">
              <div className="flex items-center gap-2 mb-2">
                <span className="text-amber-200">
                  <i className="fa-solid fa-star"></i>
                </span>
                <span className="text-amber-200">
                  <i className="fa-solid fa-star"></i>
                </span>
                <span className="text-amber-200">
                  <i className="fa-solid fa-star"></i>
                </span>
                <span className="text-amber-200">
                  <i className="fa-solid fa-star"></i>
                </span>
                <span className="text-amber-200">
                  <i className="fa-solid fa-star"></i>
                </span>
              </div>
              <p className="text-md italic">
                "SocialHub has completely changed how I connect with friends and
                discover new communities. The experience is seamless!"
              </p>
              <div className="flex items-center gap-3 mt-4">
                <div className="size-15 rounded-full border-2 border-white/50">
                  <img
                    src={image}
                    className="w-full rounded-full "
                    alt="El-Sayed Mokdam"
                  />
                </div>

                <div className="flex flex-col">
                  <h2 className="text-md font-semibold text-white">
                    El-Sayed Mokdam
                  </h2>
                  <p className="text-sm text-white/70">Product Designer</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="bg-gray-100 dark:bg-gray-800 p-8 text-white transition-colors duration-400 ease-in-out">
          <div className="max-w-lg  mx-auto mt-10 bg-white p-4 md:p-8 rounded-2xl shadow-lg border border-gray-200 dark:bg-gray-700 dark:border-gray-600 dark:shadow-white/10 transition-colors duration-400 ease-in-out">
            <div className="text-center text-gray-800 dark:text-white transition-colors duration-400 ease-in-out">
              <h1 className="text-2xl font-bold mb-2">Login</h1>
              <p>
                Don't have an account?
                <Link
                  to="/signup"
                  className="text-blue-500 ms-1 hover:underline"
                >
                  Sign up
                </Link>
              </p>
            </div>

            <div className="mt-5 flex gap-2 items-center">
              <div className="flex-1 border border-gray-300 dark:border-gray-600 text-center py-2 rounded-xl text-gray-800 dark:text-white hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors duration-400 ease-in-out">
                <span className="text-red-500 dark:text-white transition-colors duration-300 ease-in-out">
                  <i className="fa-brands fa-google"></i>
                </span>
                <span className="ms-2">Google</span>
              </div>

              <p className="text-gray-500 dark:text-gray-400">or</p>
              <div className="flex-1 text-center py-2 rounded-xl text-white bg-blue-500 dark:bg-gray-600 hover:bg-blue-600 dark:hover:bg-blue-700 transition-colors duration-400 ease-in-out">
                <span>
                  <i className="fa-brands fa-facebook-f"></i>
                </span>
                <span className="ms-2">Facebook</span>
              </div>
            </div>

            <p className="my-5 text-gray-500 dark:text-gray-400 transition-colors duration-300 text-center text-sm relative before:absolute before:left-0 before:top-1/2 before:w-[25%] md:before:w-[30%] before:h-px before:bg-linear-to-r before:from-transparent before:via-gray-300 before:to-transparent dark:before:bg-gray-600 before:rounded-4xl before:-translate-y-1/2 after:absolute after:right-0 after:top-1/2 after:w-[25%] md:after:w-[30%] after:h-px after:bg-linear-to-l after:from-transparent after:via-gray-300 after:to-transparent dark:after:bg-gray-600 after:-translate-y-1/2">
              or continue with email
            </p>

            <Form onSubmit={handleSubmit(onSubmit)}>
              {/* Email */}
              <Input
                {...register("email")}
                isInvalid={!!errors.email}
                errorMessage={errors.email?.message}
                label="Email Addrees"
                labelPlacement="outside"
                autoComplete="new-email"
                placeholder="name@example.com"
                type="email"
                startContent={
                  <i className="fa-solid fa-envelope text-default-400"></i>
                }
                classNames={{
                  inputWrapper: `${errors.email ? "border-red-500" : "border-gray-300 dark:border-gray-600 transition-colors duration-400 ease-in-out"} py-7 border-2 rounded-xl`,
                  input:
                    "caret-black dark:caret-white transition-colors duration-400 ease-in-out",
                  label:
                    "text-gray-800 dark:text-white pb-2 transition-colors duration-400 ease-in-out",
                }}
              />

              {/* Password */}
              <Input
                {...register("password")}
                isInvalid={!!errors.password}
                errorMessage={errors.password?.message}
                label="Password"
                labelPlacement="outside"
                autoComplete="off"
                placeholder="Create a strong password"
                type="password"
                startContent={
                  <i className="fa-solid fa-lock text-default-400"></i>
                }
                classNames={{
                  inputWrapper: `${errors.password ? "border-red-500" : "border-gray-300 dark:border-gray-600 transition-colors duration-400 ease-in-out"} py-7 border-2 rounded-xl`,
                  input:
                    "caret-black dark:caret-white transition-colors duration-400 ease-in-out",
                  label:
                    "text-gray-800 dark:text-white pb-2 transition-colors duration-400 ease-in-out",
                }}
              />

              <div className="flex flex-col w-full gap-2">
                <AppButton
                  className={`font-bold bg-blue-600 text-white dark:bg-gray-500 transition-colors duration-400 ease-in-out`}
                  type="submit"
                  isLoading={isPending}
                >
                  Sign in{" "}
                  <span>
                    <i className="fa-solid fa-arrow-right"></i>
                  </span>
                </AppButton>

                <AppButton
                  className="font-bold bg-gray-300 dark:bg-gray-600"
                  type="reset"
                  variant="flat"
                >
                  Reset
                </AppButton>
              </div>
            </Form>
          </div>
        </section>
      </div>
    </>
  );
}
