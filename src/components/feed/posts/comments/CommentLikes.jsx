import {
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
} from "@heroui/react";
import ThumbsUp from "../../../shared-components/buttons/ThumbsUp";
import { Link } from "react-router";
import CustomAvatar from "../../../shared-components/avatars/CustomAvatar";
import { useQueries } from "@tanstack/react-query";
import { $Services } from "../../../../services/services-repository";
import { useState } from "react";
export default function CommentLikes({ commentLikes }) {
  const [isOpen, setIsOpen] = useState(false);
  const usersQueries = useQueries({
    queries: commentLikes.map((like) => ({
      queryKey: ["user", like],
      queryFn: () => $Services.USER_REPOSITORY.getUserProfile(like),
      enabled: isOpen,
      staleTime: 1000 * 60 * 5,
    })),
  });
  return (
    <Dropdown isOpen={isOpen} onOpenChange={setIsOpen}>
      <DropdownTrigger>
        <div className="flex items-center gap-2 cursor-pointer">
          <ThumbsUp />
          <p className="text-md font-semibold text-neutral-400 ">
            {commentLikes?.length}
          </p>
        </div>
      </DropdownTrigger>
      {usersQueries.some((q) => q.isLoading) ? (
        <DropdownMenu aria-label="Static Actions">
          <DropdownItem>Loading...</DropdownItem>
        </DropdownMenu>
      ) : (
        <DropdownMenu
          aria-label="Dynamic Actions"
          items={usersQueries?.map((q) => q.data)}
        >
          {(data) => (
            <DropdownItem
              key={data?.data?.user?._id}
              textValue={data?.data?.user?.name}
            >
              <Link
                to={`/profile/${data?.data?.user?._id}`}
                className="text-sm font-semibold text-neutral-400 flex items-center gap-2"
              >
                <CustomAvatar
                  avatarData={{
                    name: data?.data?.user?.name,
                    image: data?.data?.user?.photo,
                    username: data?.data?.user?.username,
                  }}
                  size="w-8 h-8"
                />

                <span>{data?.data?.user?.name}</span>
              </Link>
            </DropdownItem>
          )}
        </DropdownMenu>
      )}
    </Dropdown>
  );
}
