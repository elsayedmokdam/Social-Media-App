import { Avatar } from "@heroui/react";
import { $HOOKS_REPOSITORY } from "../../../hooks/hooks_repository";
import ImageInFullScreen from "../../shared-components/images/ImageInFullScreen";
import { useParams } from "react-router";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { $Services } from "../../../services/services-repository";
import { $QUERY_KEYS } from "../../../query-keys/queryKeys";
export default function UserProfileHeader() {
  const queryClient = useQueryClient();
  const { openViewerImage, setOpenViewerImage } =
    $HOOKS_REPOSITORY.useImageInFullScreen();
  const { userId } = useParams();
  const { userProfile } = $HOOKS_REPOSITORY.useAuth();

  const userProfileQuery = useQuery({
    queryKey: $QUERY_KEYS.profile.userProfile(userId),
    queryFn: () => $Services.USER_REPOSITORY.getUserProfile(userId),
  });
  const isFollowed = userProfileQuery?.data?.data?.user?.followers?.some(
    (user) => user._id === userProfile._id,
  );

  const followUserMutation = useMutation({
    mutationFn: (userId) =>
      $Services.USER_REPOSITORY.followUnfollowUser(userId),
    // onSuccess: () => userProfileQuery.refetch(),
    onSuccess: () =>
      queryClient.invalidateQueries({
        queryKey: $QUERY_KEYS.profile.userProfile(userId),
      }),
  });

  function followUnfollowHandler() {
    followUserMutation.mutate(userId);
  }

  if (userProfileQuery.isPending)
    return (
      <div className="bg-white text-center text-sm p-4 rounded-2xl shadow-md">
        Loading Profile ...
      </div>
    );

  return (
    <>
    <title>{userProfileQuery?.data?.data?.user?.name}</title>
      {openViewerImage && (
        <ImageInFullScreen
          openViewerImage={openViewerImage}
          setOpenViewerImage={setOpenViewerImage}
        />
      )}
      <div className=" rounded-4xl shadow-md relative overflow-hidden ">
        {/* COVER */}
        <div
          className={`h-60 sm:h-44 lg:h-56 rounded-t-4xl border border-neutral-200 relative group overflow-hidden
    ${
      userProfileQuery?.data?.data?.user?.cover
        ? "bg-cover bg-center"
        : "bg-linear-to-r from-gray-800 to-gray-400"
    }
  `}
          style={
            userProfileQuery?.data?.data?.user?.cover
              ? {
                  backgroundImage: `url(${
                    userProfileQuery?.data?.data?.user?.cover
                  })`,
                }
              : undefined
          }
        >
          {userProfileQuery?.data?.data?.user?.cover && (
            <span
              title="View Cover"
              onClick={() =>
                setOpenViewerImage(userProfileQuery?.data?.data?.user?.cover)
              }
              className="absolute top-5 end-10 cursor-pointer text-white text-xs bg-black/60 px-3 py-2 rounded-sm flex items-center gap-2 opacity-100 lg:opacity-0 lg:group-hover:opacity-100 transition"
            >
              <i className="fa-solid fa-eye"></i>
            </span>
          )}
        </div>

        <div className="bg-white h-60" />

        {/* PROFILE CARD */}
        <div
          className="
        bg-white w-[94%] sm:w-[92%] lg:w-[85%] p-5 sm:p-7 lg:p-10 absolute left-1/2 top-[20%] lg:top-[25%] -translate-x-1/2 rounded-4xl shadow-sm"
        >
          {/* HEADER */}
          <div className="flex flex-col gap-6 lg:flex-row lg:justify-between lg:items-center">
            {/* USER INFO */}
            <div className="flex flex-col sm:flex-row items-center sm:items-start gap-5 text-center sm:text-left">
              {/* AVATAR */}
              <div
                className={`border-2 border-gray-200 rounded-full p-1 relative group cursor-pointer hover:border-blue-500 transition duration-300`}
              >
                <Avatar
                  src={userProfileQuery?.data?.data?.user?.photo}
                  alt="avatar"
                  className="size-20 sm:size-24 lg:size-28"
                />

                {/* icons */}
                {userProfileQuery?.data?.data?.user?.photo && (
                  <span
                    onClick={() =>
                      setOpenViewerImage(
                        userProfileQuery?.data?.data?.user?.photo,
                      )
                    }
                    className={`absolute bottom-0 left-0 size-9 rounded-full bg-white text-blue-500 flex items-center justify-center border border-gray-200 opacity-100 lg:opacity-0 lg:group-hover:opacity-100 transition 
                    
                  `}
                  >
                    <i className="fa-solid fa-expand"></i>
                  </span>
                )}
              </div>

              {/* NAME */}
              <div className="flex flex-col gap-2">
                <h1 className="text-lg sm:text-xl lg:text-2xl xl:text-3xl font-bold">
                  {userProfileQuery?.data?.data?.user?.name}
                </h1>
                <h3 className="text-sm text-gray-400 font-medium">
                  {userProfileQuery?.data?.data?.user?.username && "@"}
                  {userProfileQuery?.data?.data?.user?.username}
                </h3>
                <p className="text-xs font-bold w-fit mx-auto sm:mx-0 text-blue-800 bg-blue-100 px-3 py-2 border border-blue-300 rounded-full flex items-center gap-2">
                  <i className="fa-regular fa-user"></i>
                  Route Posts member
                </p>
              </div>
            </div>

            {/* STATS */}
            <button
              disabled={followUserMutation.isPending}
              onClick={followUnfollowHandler}
              className={`${isFollowed ? "bg-rose-100 border border-rose-300 text-rose-600" : "bg-blue-600 text-white"} ${followUserMutation.isPending ? "cursor-not-allowed" : "cursor-pointer"} w-full lg:w-fit flex items-center gap-2 justify-center font-semibold text-xs py-2 px-4 rounded-md`}
            >
              {isFollowed ? (
                <i className="fa-solid fa-user-check"></i>
              ) : (
                <i className="fa-solid fa-user-plus"></i>
              )}
              {isFollowed ? "Unfollow" : "Follow"}
              {followUserMutation.isPending && (
                <i className="fa-solid fa-spinner animate-spin"></i>
              )}
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
