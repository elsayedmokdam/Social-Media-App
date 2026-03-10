import { createBrowserRouter, Navigate } from "react-router";

import RootLayout from "../layouts/RootLayout";
import Signin from "../pages/auth/signin/Signin";
import Signup from "../pages/auth/signup/Signup";
import FeedPage from "../pages/feed/FeedPage";
import NotificationsPage from "../pages/notifications/NotificationsPage";
import ProtectedRoute from "./ProtectedRoute";
import PostDetailsPage from "../pages/post-details/PostDetailsPage";
import MyProfilePage from "../pages/profile/my-profile/MyProfilePage";
import UserProfilePage from "../pages/profile/user-profile/UserProfilePage";
import ChangePasswordPage from "../pages/auth/change-passowrd/ChangePasswordPage";
import SuggestionsPage from "../pages/suggestions/SuggestionsPage";
import GuestRoute from "./GuestRoute";

export const routes = createBrowserRouter([
  {
    path: "/signin",
    element: (
      <GuestRoute>
        <Signin />
      </GuestRoute>
    ),
  },
  {
    path: "/signup",
    element: (
      <GuestRoute>
        <Signup />
      </GuestRoute>
    ),
  },
  {
    path: "/change-password",
    element: (
      <ProtectedRoute>
        <ChangePasswordPage />
      </ProtectedRoute>
    ),
  },
  {
    path: "/suggestions",
    element: (
      <ProtectedRoute>
        <SuggestionsPage />
      </ProtectedRoute>
    ),
  },

  {
    path: "/",
    element: (
      <ProtectedRoute>
        <RootLayout />
      </ProtectedRoute>
    ),
    children: [
      // { index: true, element: <Navigate to="/feed" replace /> },
      {
        path: "posts/:postId",
        element: <PostDetailsPage />,
      },
      {
        path: "notifications",
        element: <NotificationsPage />,
      },
      {
        path: "profile",
        element: <MyProfilePage />,
      },
      {
        path: "profile/:userId",
        element: <UserProfilePage />,
      },
      {
        path: "settings",
        element: <ChangePasswordPage />,
      },
      {
        index: true,
        path: "/feed",
        element: <FeedPage />,
        // children: [
        //   {
        //     path: "",
        //     element: <h1>Get Home Feed</h1>,
        //   },
        //   {
        //     path: "community",
        //     element: <h1>Get Community Feed</h1>,
        //   },
        //   {
        //     path: "saved",
        //     element: <h1>Get Saved Posts</h1>,
        //   },
        //   {
        //     path: "my-posts",
        //     element: <h1>Get my Posts Feed</h1>,
        //   },
        // ],
      },
    ],
  },
]);
