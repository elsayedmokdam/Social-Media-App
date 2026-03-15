import { Link } from "react-router";
import UserProfileBody from "../../../components/user-profile/user-profile-body/UserProfileBody";
import UserProfileHeader from "../../../components/user-profile/user-profile-header/UserProfileHeader";

export default function UserProfilePage(x) {
  console.log(x);
  return (
    <>
      <div className="w-[90%] lg:w-[80%] mx-auto">
        <Link
          to="/feed"
          className=" bg-white text-gray-600 text-sm font-semibold p-2 rounded-lg shadow-md ms-4 flex items-center gap-2 w-fit"
        >
          <span>
            <i className="fa fa-arrow-left fa-sm"></i>
          </span>
          <span>Back</span>
        </Link>
        <div className="my-4">
          <UserProfileHeader />
        </div>
        <div className="mb-4">
          <UserProfileBody />
        </div>
      </div>
    </>
  );
}
