import { useInfiniteQuery } from "@tanstack/react-query";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useLocation } from "react-router";
import { $QUERY_KEYS } from "../../query-keys/queryKeys";
import { $Services } from "../../services/services-repository";
import { Button, Input, Tooltip } from "@heroui/react";
import SuggestionsCard from "../../components/feed/feed-right-sidebar/SuggestionsCard";

export default function SuggestionsPage() {
  const {state} = useLocation();
  console.log("state", state);

  const [search, setSearch] = useState(state?.search || "");

  const { register } = useForm({
    defaultValues: { search: search },
  });

  // Get suggested friends
  const suggestedFriendsQuery = useInfiniteQuery({
    queryFn: ({ pageParam: page = 1 }) =>
      $Services.USER_REPOSITORY.getFollowSuggestions({ page }),
    queryKey: $QUERY_KEYS.suggestionFriends,
    getNextPageParam: (lastPage) => {
      const nextPage = lastPage?.meta?.pagination?.nextPage ?? undefined;
      return nextPage;
    },
    enabled: search.length === 0,
  });

  // Get search suggested friends
  const searchSuggestedFriends = useInfiniteQuery({
    queryFn: ({ pageParam: page = 1 }) =>
      $Services.USER_REPOSITORY.searchSuggestions({ q: search, page }),
    queryKey: [$QUERY_KEYS.searchSuggestions, search],
    enabled: search.length > 0,
    getNextPageParam: (lastPage) => {
      const nextPage = lastPage?.meta?.pagination?.nextPage ?? undefined;
      return nextPage;
    },
  });

  // Handle search
  const suggestions =
    search.length > 0
      ? searchSuggestedFriends?.data?.pages?.flatMap(
          (page) => page?.data?.suggestions,
        )
      : suggestedFriendsQuery?.data?.pages?.flatMap(
          (page) => page?.data?.suggestions,
        );

  // Get next page
  function getNextPage() {
    if (search.length > 0) {
      return searchSuggestedFriends.fetchNextPage();
    }
    return suggestedFriendsQuery.fetchNextPage();
  }

  const activeQuery = search.length > 0 ? searchSuggestedFriends : suggestedFriendsQuery;

  return (
    <div
      className={`bg-gray-100 min-h-screen py-5 ${suggestedFriendsQuery.isLoading ? "blur-xs" : ""} ${searchSuggestedFriends.isLoading ? "animate-pulse" : ""}`}
    >
      <div className="container ">
        <Link
          to="/"
          className="flex items-center gap-2 text-xs font-semibold text-gray-600 p-3 rounded-xl shadow-md w-fit mt-5"
        >
          <i className="fa-solid fa-arrow-left"></i>
          Back to Feed
        </Link>

        <div className="rounded-3xl p-10 mt-5 bg-white">
          {/* Header */}
          <div className="flex justify-between items-center">
            <p className="flex items-center gap-2 text-sm font-bold">
              <span className="text-blue-500">
                <i className="fa-solid fa-users"></i>
              </span>
              All Suggested Friends
            </p>

            <Tooltip
              content={`${suggestions?.length} suggestions`}
              placement="top"
            >
              <p className="bg-gray-200 rounded-full size-7 p-5 text-xs font-bold flex items-center justify-center">
                {suggestedFriendsQuery.isLoading ||
                searchSuggestedFriends.isLoading ? (
                  <i className="fa-solid fa-spinner animate-spin"></i>
                ) : suggestions?.length > 999 ? (
                  "999+"
                ) : (
                  suggestions?.length
                )}
              </p>
            </Tooltip>
          </div>

          {/* Search */}
          <Input
            {...register("search")}
            onChange={(e) => setSearch(e.target.value)}
            onClear={() => setSearch("")}
            type="text"
            size="md"
            autoComplete="off"
            startContent={<i className="fa-solid fa-magnifying-glass"></i>}
            placeholder="Search for friends..."
            className="my-5 border border-neutral-200 rounded-xl "
          />

          {/* Suggestions */}
          <div>
            {/* If has suggestions */}
            {suggestions?.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
                {suggestions.map((suggestion) => (
                  <SuggestionsCard
                    key={suggestion._id}
                    suggestions={suggestion}
                  />
                ))}

                {/* Load more if has next page */}
                {activeQuery?.hasNextPage ? (
                  <div className="col-span-1 md:col-span-2 lg:col-span-3 text-center">
                    <Button
                      onPress={getNextPage}
                      variant="ghost"
                      color="primary"
                    >
                      <span>Load More</span>

                      {activeQuery?.isFetchingNextPage && (
                        <i className="fa-solid fa-spinner animate-spin ms-3"></i>
                      )}
                    </Button>
                  </div>
                  // If no more suggestions
                ) : (
                  <div className="col-span-1 md:col-span-2 lg:col-span-3 text-center">
                    <p className="text-xs text-neutral-500 font-semibold mt-10">
                      No more suggestions
                    </p>
                  </div>
                )}
              </div>
              // If no suggestions
            ) : (
              <div className="text-xs text-neutral-500 font-semibold text-center mt-10">
                {/* If loading */}
                {activeQuery?.isLoading ? (
                  <div className="flex items-center justify-center gap-2">
                    <span>Loading Suggestions</span>
                    <i className="fa-solid fa-spinner animate-spin"></i>
                  </div>
                ) : (
                  "No suggestions found"
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
