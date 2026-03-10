import React from "react";
import SmallSpinner from "../spinners/SmallSpinner";

export default function ShowMoreButton({ children, ...props }) {
  return (
    <button
      disabled={props.isFetchingNextPage}
      onClick={props.handleNextPage}
      className={`flex items-center gap-3 w-fit mx-auto text-neutral-700 bg-white border  border-neutral-200 text-sm rounded-3xl hover:bg-neutral-200 py-1 px-5 font-semibold  ${
        props.isFetchingNextPage ? "cursor-not-allowed" : "cursor-pointer"
      }`}
    >
      {props.isFetchingNextPage && <SmallSpinner />}
      <span>{children}</span>
    </button>
  );
}
