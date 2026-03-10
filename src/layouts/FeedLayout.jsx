import React from "react";
import { Outlet } from "react-router";

export default function FeedLayout() {
  return (
    <>
      <div>FeedLayout</div>
      <Outlet />
    </>
  );
}
