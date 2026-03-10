import CustomAvatar from "../../../shared-components/avatars/CustomAvatar";
export default function CommentHeader({ headerData }) {
  return (
    <div className="flex items-start gap-3 mb-2">
      <CustomAvatar
        avatarData={{
          name: headerData?.commentCreator?.name,
          image: headerData?.commentCreator?.photo,
          username: headerData?.commentCreator?.username,
        }}
      />
      <div className="bg-white p-3 rounded-xl mb-3  min-w-0">
        <div className="text-sm mb-2  ">
          <p className="font-semibold">{headerData?.commentCreator?.name}</p>
          {headerData?.commentCreator?.username && (
            <p className="text-neutral-400 ">
              @{headerData?.commentCreator?.username}
            </p>
          )}
        </div>
        <p className="text-sm text-neutral-500  wrap-break-word">
          {headerData?.comment?.content}
        </p>
      </div>
    </div>
  );
}
