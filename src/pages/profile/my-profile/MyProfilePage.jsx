import ProfileBody from "../../../components/shared-components/profile-body/ProfileBody";
import ProfileHeader from "../../../components/shared-components/profile-header/ProfileHeader";

export default function MyProfilePage() {
  return (
    <>
      <div className="w-[90%] lg:w-[80%] mx-auto">
        <div className="mb-4">
          <ProfileHeader />
        </div>
        <div className="mb-4">
          <ProfileBody />
        </div>
      </div>
    </>
  );
}
