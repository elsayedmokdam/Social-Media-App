import { useState } from "react";
import { $Utilities } from "../../../utilities/utilities-repository";
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

export default function SelectPrivacyForCreatePost({
  value,
  onChange,
  privacy = "Public",
}) {
  const [show, setShow] = useState(false);

  const selectedItem =
    privacyList.find((item) => item.key === value) || privacyList[0];

  function toggleShow() {
    setShow(!show);
  }

  function handleSelectedValue(item) {
    onChange(item.key);
    setShow(false);
  }
  return (
    <div className="relative text-xs">
      <p
        onClick={toggleShow}
        className="flex items-center gap-2 py-2 hover:bg-neutral-100 rounded-md cursor-pointer"
      >
        <span className="text-neutral-400">{selectedItem.icon}</span>
        <span className="text-neutral-500 text-xs">{selectedItem.label}</span>
        <span>
          <i
            className={`fa-solid ${
              show ? "fa-chevron-up" : "fa-chevron-down"
            } text-neutral-500 text-xs`}
          />
        </span>
      </p>
      {show && (
        <ul className="list-none bg-white border  border-neutral-200  rounded-xl overflow-hidden shadow-md min-w-35 absolute top-12 ">
          {privacyList.map((item) => (
            <li
              key={item.key}
              onClick={() => handleSelectedValue(item)}
              className="flex items-center gap-2 p-3 rounded-lg text-neutral-600 text-xs hover:bg-neutral-100 cursor-pointer"
            >
              <span>{item.icon}</span>
              <span>{item.label}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
