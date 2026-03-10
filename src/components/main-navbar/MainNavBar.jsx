import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  DropdownItem,
  DropdownTrigger,
  Dropdown,
  DropdownMenu,
  Avatar,
} from "@heroui/react";
import { Link, NavLink } from "react-router";
import avatarFallback from "../../assets/images/avatar-generations_rpge.jpg";
import { useQuery } from "@tanstack/react-query";
import { $Services } from "../../services/services-repository";
import { $QUERY_KEYS } from "../../query-keys/queryKeys";
import { $Contexts } from "../../context/context-repository";
import { useMyProfile } from "../../hooks/useMyProfile";

export default function MainNavBar() {
  const { logout } = $Contexts.useAuth();
  const myProfileQuery = useMyProfile();

  const {
    data: unreadNotificationsData,
    isLoading: unreadNotificationsLoading,
  } = useQuery({
    queryKey: $QUERY_KEYS.notifications.unreadCount,
    queryFn: () => $Services.NOTIFICATIONS_REPOSITORY.getUnreadCount(),
  });

  const linksList = [
    {
      name: "Feed",
      to: "/feed",
      icon: <i className="fa-regular fa-house text-sm lg:text-base"></i>,
    },
    {
      name: "Profile",
      to: `/profile`,
      icon: <i className="fa-regular fa-user text-sm lg:text-base"></i>,
    },
    {
      name: "Notifications",
      to: "/notifications",
      icon: <i className="fa-regular fa-bell text-sm lg:text-base"></i>,
    },
  ];

  return (
    <Navbar isBordered variant="floating" className="bg-white py-2 shadow-sm">
      {/* Brand */}
      <NavbarBrand>
        <p className="font-bold text-sm lg:text-lg">
          <span className="bg-linear-to-r from-indigo-600 via-indigo-500 to-blue-400 bg-clip-text text-transparent">
            Social
          </span>
          <span className="bg-linear-to-r from-indigo-700 via-indigo-600 to-blue-500 bg-clip-text text-transparent">
            App
          </span>
        </p>
      </NavbarBrand>

      {/* Center nav items */}
      <NavbarContent justify="center" className="flex gap-3 lg:gap-5">
        <div className="bg-gray-100 rounded-full border border-neutral-200 px-3 lg:px-5 py-2 flex gap-3 lg:gap-5 items-center">

          {linksList.map((link) => (
            <NavbarItem key={link.name} className="font-semibold">
              <NavLink
                to={link.to}
                className={({ isActive }) =>
                  `flex items-center gap-1 lg:gap-2 text-[10px] lg:text-xs relative ${
                    isActive
                      ? "text-primary"
                      : "text-neutral-700 hover:text-primary"
                  }`
                }
              >
                <div className="relative">
                  {link.icon}
                  {link.name === "Notifications" && (
                    <span className="absolute -top-2 right-2 bg-red-500 text-white rounded-full px-1 h-4 min-w-4 text-[10px] flex items-center justify-center">
                      {unreadNotificationsData?.data?.unreadCount > 99
                        ? "99+"
                        : unreadNotificationsData?.data?.unreadCount || 0}
                    </span>
                  )}
                </div>
                <span className="hidden sm:flex">{link.name}</span>
              </NavLink>
            </NavbarItem>
          ))}

        </div>
      </NavbarContent>

      {/* Profile dropdown */}
      <NavbarContent justify="end" className="px-0 lg:px-4">
        <Dropdown placement="bottom-end">
          <DropdownTrigger>
            <button className="flex items-center gap-1 lg:gap-2 cursor-pointer hover:bg-gray-100 rounded-full px-2 py-1 transition text-xs lg:text-sm">
              <Avatar
                isBordered
                className="transition-transform"
                color=""
                name={myProfileQuery?.data?.data?.user?.name || "User"}
                size="sm"
                src={
                  myProfileQuery?.data?.data?.user?.photo &&
                  !myProfileQuery?.data?.data?.user?.photo.includes("undefined")
                    ? myProfileQuery?.data?.data?.user?.photo
                    : avatarFallback
                }
              />
              <span className="hidden md:block font-medium">
                {myProfileQuery?.data?.data?.user?.name}
              </span>
              <i className="fa-solid fa-bars text-xs lg:text-sm"></i>
            </button>
          </DropdownTrigger>

          <DropdownMenu aria-label="Profile Actions" variant="flat">
            <DropdownItem key="profile" as={Link} to="/profile">
              Profile
            </DropdownItem>
            <DropdownItem key="settings" as={Link} to="/settings">
              Settings
            </DropdownItem>
            <DropdownItem key="logout" color="danger" onPress={logout}>
              Log Out
            </DropdownItem>
          </DropdownMenu>
        </Dropdown>
      </NavbarContent>
    </Navbar>
  );
}
