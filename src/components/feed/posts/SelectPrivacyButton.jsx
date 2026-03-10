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

export default function SelectPrivacyButton({ privacy = "Public" }) {
  const [show, setShow] = useState(false);
  const [selectValue, setSelectValue] = useState(() => {
    return privacy.includes("only")
      ? "Only Me"
      : $Utilities.generalHelpers.capitalizeFirstLetter(privacy);
  });
  function toggleShow() {
    setShow(!show);
  }

  function handleSelectedValue(value) {
    setSelectValue(value);
    setShow(false);
  }
  return (
    <div className="relative text-xs">
      <p
        onClick={toggleShow}
        className="flex items-center gap-2 p-1  hover:bg-neutral-100 rounded-xl cursor-pointer"
      >
        <span className="text-neutral-400">
          {privacyList.find((item) => item.label === selectValue)?.icon || (
            <i className="fa-solid fa-globe text-neutral-400 text-xs"></i>
          )}
        </span>
        <span className="text-neutral-500 text-xs">{selectValue}</span>
        <span>
          {show ? (
            <i className="fa-solid fa-chevron-up text-neutral-500 text-xs"></i>
          ) : (
            <i className="fa-solid fa-chevron-down text-neutral-500 text-xs"></i>
          )}
        </span>
      </p>
      {show && (
        <ul className="list-none bg-white border  border-neutral-200  rounded-xl overflow-hidden shadow-md min-w-35 absolute top-7">
          {privacyList.map((item) => (
            <li
              key={item.key}
              onClick={() => handleSelectedValue(item.label)}
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
