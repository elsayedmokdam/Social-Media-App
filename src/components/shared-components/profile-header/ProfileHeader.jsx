import { Avatar, useDisclosure } from "@heroui/react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { $Services } from "../../../services/services-repository";
import ProfileSkeleton from "../skeletons/ProfileSkeleton";
import { useRef, useState } from "react";
import { $Utilities } from "../../../utilities/utilities-repository";
import { $QUERY_KEYS } from "../../../query-keys/queryKeys";
import { useMyProfile } from "../../../hooks/useMyProfile";
import ProfileCoverModal from "../../modals/ProfileCoverModal";
import ImageInFullScreen from "../images/ImageInFullScreen";
import { $HOOKS_REPOSITORY } from "../../../hooks/hooks_repository";
import FollowersFollowingModal from "../../modals/FollowersFollowingModal";

export default function ProfileHeader({ myPostsQuery, myBookmarksQuery }) {
  const {
    isOpen: isOpenFollowers,
    onOpen: onOpenFollowers,
    onOpenChange: onOpenChangeFollowers,
  } = useDisclosure();
  const [followType, setFollowType] = useState(null);
  const cover = useRef();
  const photo = useRef();
  const queryClient = useQueryClient();
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [privacy, setPrivacy] = useState("public");
  const [imageFile, setImageFile] = useState(null);
  const { openViewerImage, setOpenViewerImage } =
    $HOOKS_REPOSITORY.useImageInFullScreen();

  // Get my profile
  const myProfileQuery = useMyProfile();
  const myPostsLength = myPostsQuery?.data?.pages[0]?.meta?.pagination?.total;
  const myBookmarksLength =
    myBookmarksQuery?.data?.pages[0]?.meta?.pagination?.total;
  const myFollowersIds = myProfileQuery?.data?.data?.user?.followers;
  const myFollowingIds = myProfileQuery?.data?.data?.user?.following;
  console.log("myFollowingIds", myFollowingIds);
  console.log("myFollowersIds", myFollowersIds);
  // Upload profile photo
  const changeMyProfilePhotoMutation = useMutation({
    mutationFn: (imageFile) =>
      $Services.USER_REPOSITORY.uploadProfilePhoto(imageFile),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: $QUERY_KEYS.profile.myProfile,
      });
      // photo.current.value = null;
      $Utilities.Alerts.displaySuccess("Photo uploaded successfully");
    },
    onError: () => {
      $Utilities.Alerts.displayError("Error uploading photo");
    },
  });

  const changeMyProfileCoverMutation = useMutation({
    mutationFn: (payload) =>
      $Services.USER_REPOSITORY.changeProfileCover(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: $QUERY_KEYS.profile.myProfile,
      });
      $Utilities.Alerts.displaySuccess("Photo uploaded successfully");
    },
    onError: () => {
      $Utilities.Alerts.displayError("Error uploading photo");
    },
  });

  function handleChangeMyProfilePhoto(e) {
    const file = e.target.files[0];
    console.log(file);
    if (!file) return;

    changeMyProfilePhotoMutation.mutate(file);
  }

  function handleChangeMyProfileCover(e) {
    const file = e.target.files[0];
    if (!file) return;
    setImageFile(file);
    onOpen();
  }

  const deleteMyProfileCoverMutation = useMutation({
    mutationFn: () => $Services.USER_REPOSITORY.deleteProfileCover(),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: $QUERY_KEYS.profile.myProfile,
      });
      $Utilities.Alerts.displaySuccess("Photo removed successfully");
    },
    onError: () => {
      $Utilities.Alerts.displayError("Error removed photo");
    },
  });

  function handleRemoveProfileCover() {
    deleteMyProfileCoverMutation.mutate();
  }

  function handleFollowersAndFollowingList(item) {
    const value = item.toLowerCase();

    if (value === "followers" || value === "following") {
      setFollowType({
        type: value,
        ids: value === "followers" ? myFollowersIds : myFollowingIds,
      });
      onOpenFollowers();
    }
  }
  if (myProfileQuery.isPending) return <ProfileSkeleton />;

  return (
    <>
      <title>{myProfileQuery?.data?.data?.user?.name}</title>
      {openViewerImage && (
        <ImageInFullScreen
          openViewerImage={openViewerImage}
          setOpenViewerImage={setOpenViewerImage}
        />
      )}
      <div className=" rounded-4xl shadow-md relative overflow-hidden ">
        {/* COVER */}
        <div
          className={`h-50 sm:h-44 lg:h-56 rounded-t-4xl border border-neutral-200 relative group overflow-hidden
    ${
      myProfileQuery?.data?.data?.user?.cover
        ? "bg-cover bg-center"
        : "bg-linear-to-r from-gray-800 to-gray-400"
    }
  `}
          style={
            myProfileQuery?.data?.data?.user?.cover
              ? {
                  backgroundImage: `url(${myProfileQuery?.data.data.user.cover})`,
                }
              : undefined
          }
        >
          <button
            disabled={changeMyProfilePhotoMutation.isPending}
            title="Add Cover"
            onClick={() => cover.current.click()}
            className={`absolute top-5 end-5 text-white text-xs bg-black/60 px-3 py-2 rounded-sm flex items-center gap-2 opacity-100 lg:opacity-0 lg:group-hover:opacity-100 transition ${
              changeMyProfilePhotoMutation.isPending
                ? "cursor-not-allowed"
                : "cursor-pointer"
            }`}
          >
            {changeMyProfileCoverMutation.isPending ? (
              <i className="fa-solid fa-spinner animate-spin"></i>
            ) : (
              <i className="fa-solid fa-camera"></i>
            )}
          </button>

          {myProfileQuery?.data?.data?.user?.cover && (
            <span
              title="View Cover"
              onClick={() =>
                setOpenViewerImage(myProfileQuery?.data?.data?.user?.cover)
              }
              className="absolute top-5 end-20 cursor-pointer text-white text-xs bg-black/60 px-3 py-2 rounded-sm flex items-center gap-2 opacity-100 lg:opacity-0 lg:group-hover:opacity-100 transition"
            >
              <i className="fa-solid fa-eye"></i>
            </span>
          )}

          {myProfileQuery?.data?.data?.user?.cover && (
            <span
              title="Remove Cover"
              onClick={() => handleRemoveProfileCover()}
              className="absolute top-5 end-36 cursor-pointer text-white text-xs bg-black/60 px-3 py-2 rounded-sm flex items-center gap-2 opacity-100 lg:opacity-0 lg:group-hover:opacity-100 transition"
            >
              {deleteMyProfileCoverMutation.isPending ? (
                <i className="fa-solid fa-spinner animate-spin"></i>
              ) : (
                <i className="fa-solid fa-trash"></i>
              )}
            </span>
          )}

          <input
            onChange={(e) => handleChangeMyProfileCover(e)}
            type="file"
            ref={cover}
            className="hidden"
          />
        </div>

        <div className="bg-white h-150 md:h-100 lg:h-80" />

        {/* PROFILE CARD */}
        <div
          className="
        bg-white w-[94%] sm:w-[92%] lg:w-[85%] p-5 sm:p-7 absolute left-1/2 top-[15%] lg:top-[20%] -translate-x-1/2 rounded-4xl shadow-sm"
        >
          {/* HEADER */}
          <div className="flex flex-col gap-6 lg:flex-row lg:justify-between lg:items-center">
            {/* USER INFO */}
            <div className="flex flex-col sm:flex-row items-center sm:items-start gap-5 text-center sm:text-left">
              {/* AVATAR */}
              <div
                className={`border-2 border-gray-200 rounded-full p-1 relative group cursor-pointer ${changeMyProfilePhotoMutation.isPending ? "animate-spin" : ""}`}
              >
                <Avatar
                  src={myProfileQuery?.data?.data?.user?.photo}
                  alt="avatar"
                  className="size-20 sm:size-24 lg:size-28"
                />

                {/* icons */}
                <span
                  onClick={() =>
                    setOpenViewerImage(myProfileQuery?.data?.data?.user?.photo)
                  }
                  className={`absolute bottom-0 left-0 size-9 rounded-full bg-white text-blue-500 flex items-center justify-center border border-gray-200 opacity-100 lg:opacity-0 lg:group-hover:opacity-100 transition ${
                    changeMyProfilePhotoMutation.isPending
                      ? "cursor-not-allowed hidden"
                      : "cursor-pointer"
                  }`}
                >
                  <i className="fa-solid fa-expand"></i>
                </span>

                <button
                  disabled={changeMyProfilePhotoMutation.isPending}
                  onClick={() => photo.current.click()}
                  className={`absolute bottom-0 right-0 size-9 rounded-full bg-white text-blue-500 flex items-center justify-center border border-gray-200 opacity-100 lg:opacity-0 lg:group-hover:opacity-100 transition ${
                    changeMyProfilePhotoMutation.isPending
                      ? "cursor-not-allowed hidden"
                      : "cursor-pointer"
                  }`}
                >
                  <i className="fa-solid fa-camera"></i>
                </button>

                <input
                  onChange={(e) => handleChangeMyProfilePhoto(e)}
                  type="file"
                  ref={photo}
                  className="hidden"
                />
              </div>

              {/* NAME */}
              <div className="flex flex-col gap-2">
                <h1 className="text-lg sm:text-xl lg:text-2xl xl:text-3xl font-bold">
                  {myProfileQuery?.data?.data?.user?.name}
                </h1>
                <h3 className="text-sm text-gray-400 font-medium">
                  @{myProfileQuery?.data?.data?.user?.username}
                </h3>
                <p className="text-xs font-bold w-fit mx-auto sm:mx-0 text-blue-800 bg-blue-100 px-3 py-2 border border-blue-300 rounded-full flex items-center gap-2">
                  <i className="fa-regular fa-user"></i>
                  Route Posts member
                </p>
              </div>
            </div>

            {/* STATS */}
            <div className="grid grid-cols-3 gap-2 sm:gap-4">
              {["Followers", "Following", "Bookmarks"].map((item) => (
                <div
                  onClick={() => handleFollowersAndFollowingList(item)}
                  key={item}
                  className={`flex flex-col items-center gap-2 sm:gap-3 p-3 sm:p-5 border-2 border-gray-200 rounded-2xl ${item === "Followers" || item === "Following" ? "cursor-pointer" : "cursor-default"}`}
                >
                  <h5 className="text-[10px] sm:text-xs uppercase text-gray-500 font-bold">
                    {item}
                  </h5>
                  <p className="text-lg sm:text-xl font-bold">
                    {item === "Followers"
                      ? myProfileQuery?.data?.data?.user?.followersCount
                      : item === "Following"
                        ? myProfileQuery?.data?.data?.user?.followingCount
                        : myProfileQuery?.data?.data?.user?.bookmarksCount}
                  </p>
                </div>
              ))}
            </div>
          </div>
          {/* <Button className="max-w-fit" onPress={onOpen}>
        Open Modal
      </Button> */}
          {/* ABOUT SECTION */}
          <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-5">
            <div className="md:col-span-2 bg-gray-100 border border-gray-200 rounded-2xl p-4 flex flex-col gap-2">
              <p className="text-sm font-bold">About</p>

              <p className="flex items-center gap-2 text-sm text-gray-500 font-semibold">
                <i className="fa-regular fa-envelope"></i>
                {myProfileQuery?.data?.data?.user?.email}
              </p>

              <p className="flex items-center gap-2 text-sm text-gray-500 font-semibold">
                <i className="fa-regular fa-user"></i>
                Active on route posts
              </p>
            </div>

            <div className="flex flex-col gap-4">
              <div className="bg-blue-50/30 border border-blue-200 rounded-2xl p-3">
                <p className="text-xs font-bold text-blue-800">MY POSTS</p>
                <p className="font-bold text-lg">{myPostsLength}</p>
              </div>

              <div className="bg-blue-50/30 border border-blue-200 rounded-2xl p-3">
                <p className="text-xs font-bold text-blue-800">SAVED POSTS</p>
                <p className="font-bold text-lg">{myBookmarksLength}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* PROFILE COVER MODAL */}
      <ProfileCoverModal
        onOpen={onOpen}
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        setPrivacy={setPrivacy}
        changeMyProfileCoverMutation={changeMyProfileCoverMutation}
        imageFile={imageFile}
      />

      {/* FOLLOWERS MODAL */}
      {followType && (
        <FollowersFollowingModal
          onOpen={onOpenFollowers}
          isOpen={isOpenFollowers}
          onOpenChange={onOpenChangeFollowers}
          followType={followType}
        />
      )}
    </>
  );
}
