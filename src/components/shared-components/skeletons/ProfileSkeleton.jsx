import { Avatar } from "@heroui/react";

export default function ProfileSkeleton() {
  return (
    <div className="mx-auto max-w-6xl rounded-4xl shadow-md relative overflow-hidden animate-pulse">
      {/* COVER */}
      <div className="bg-gray-300 h-36 sm:h-44 lg:h-56 rounded-t-4xl border border-neutral-200 relative" />

      <div className="bg-white h-150 md:h-100 lg:h-80" />

      {/* PROFILE CARD */}
      <div className="bg-white w-[94%] sm:w-[92%] lg:w-[85%] p-5 sm:p-7 absolute left-1/2 top-[10%] lg:top-[20%] -translate-x-1/2 rounded-4xl shadow-sm">
        {/* HEADER */}
        <div className="flex flex-col gap-6 lg:flex-row lg:justify-between lg:items-center">
          {/* USER INFO */}
          <div className="flex flex-col sm:flex-row items-center sm:items-start gap-5 text-center sm:text-left">
            {/* AVATAR */}
            <Avatar
              src=""
              alt="avatar"
              className="size-20 sm:size-24 lg:size-28"
            />

            {/* NAME */}
            <div className="flex flex-col gap-2 w-full">
              <div className="h-6 bg-gray-300 rounded w-32 sm:w-40 lg:w-48"></div>
              <div className="h-4 bg-gray-200 rounded w-24 sm:w-32"></div>
              <div className="h-5 bg-blue-200 rounded w-36 mt-2"></div>
            </div>
          </div>

          {/* STATS */}
          <div className="grid grid-cols-3 gap-2 sm:gap-4">
            {[1, 2, 3].map((item) => (
              <div
                key={item}
                className="flex flex-col items-center gap-2 sm:gap-3 p-3 sm:p-5 border-2 border-gray-200 rounded-2xl"
              >
                <div className="h-3 w-12 bg-gray-200 rounded"></div>
                <div className="h-5 w-8 bg-gray-300 rounded"></div>
              </div>
            ))}
          </div>
        </div>

        {/* ABOUT SECTION */}
        <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-5">
          <div className="md:col-span-2 bg-gray-100 border border-gray-200 rounded-2xl p-4 flex flex-col gap-2">
            <div className="h-4 bg-gray-300 w-20 rounded"></div>
            <div className="h-3 bg-gray-200 w-40 rounded"></div>
            <div className="h-3 bg-gray-200 w-32 rounded"></div>
          </div>

          <div className="flex flex-col gap-4">
            <div className="bg-gray-100 border border-gray-200 rounded-2xl p-3 h-16"></div>
            <div className="bg-gray-100 border border-gray-200 rounded-2xl p-3 h-16"></div>
          </div>
        </div>
      </div>
    </div>
  );
}
