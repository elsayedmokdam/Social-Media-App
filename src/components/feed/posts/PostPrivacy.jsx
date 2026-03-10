import { Tooltip } from "@heroui/react";

const privacyList = [
  {
    key: "public",
    label: "Public",
    icon: <i className="fa-solid fa-globe "></i>,
  },
  {
    key: "following",
    label: "Following",
    icon: <i className="fa-solid fa-user-group"></i>,
  },
  {
    key: "only_me",
    label: "Only Me",
    icon: <i className="fa-solid fa-lock "></i>,
  },
];

export default function PostPrivacy({privacy= "Public"}) {
    const selectedPrivacy = privacyList.find((item) => item.key === privacy) || privacyList[0];
  return (
    <Tooltip content={selectedPrivacy.label}>
    <span
      className="flex items-center gap-2  rounded-lg text-neutral-400 text-xs hover:bg-neutral-100 cursor-pointer"
    >
      <span>{selectedPrivacy.icon}</span>
      <span className="hidden">{selectedPrivacy.label}</span>
    </span>
    </Tooltip>
  );
}
