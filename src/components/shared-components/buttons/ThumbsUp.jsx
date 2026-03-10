import React from "react";

export default function ThumbsUp({ className }) {
  return (
    <span
      className={
        className ||
        "bg-blue-500 w-5 h-5 text-xs text-white p-1 rounded-full flex items-center"
      }
    >
      <i className="fa-regular fa-thumbs-up"></i>
    </span>
  );
}
