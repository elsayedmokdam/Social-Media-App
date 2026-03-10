import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router";
import { $QUERY_KEYS } from "../../query-keys/queryKeys";
import { $Services } from "../../services/services-repository";
import { Input } from "@heroui/react";
import SuggestionsCard from "../../components/feed/feed-right-sidebar/SuggestionsCard";

export default function SuggestionsPage() {
  const [search, setSearch] = useState("");

  const { register } = useForm({
    defaultValues: { search: "" },
  });

  // Get suggested friends
  const suggestedFriendsQuery = useQuery({
    queryFn: () => $Services.USER_REPOSITORY.getFollowSuggestions(),
    queryKey: $QUERY_KEYS.suggestionFriends,
  });

  // Get search suggested friends
  const searchSuggestedFriends = useQuery({
    queryFn: () => $Services.USER_REPOSITORY.searchSuggestions({ q: search }),
    queryKey: [$QUERY_KEYS.searchSuggestions, search],
    enabled: search.length > 0,
  });

  // Handle search
  const suggestions =
    search.length > 0
      ? searchSuggestedFriends?.data?.data?.users
      : suggestedFriendsQuery?.data?.data?.suggestions;


  return (
    <div
      className={`bg-gray-100 min-h-screen py-5 ${suggestedFriendsQuery.isLoading? "blur-xs" : ""} ${searchSuggestedFriends.isLoading ? "animate-pulse" : ""}`}
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

            <p className="bg-gray-200 rounded-full size-7 text-xs font-bold flex items-center justify-center">
              {suggestedFriendsQuery.isLoading ||
              searchSuggestedFriends.isLoading ? (
                <i className="fa-solid fa-spinner animate-spin"></i>
              ) : (
                suggestions?.length
              )}
            </p>
          </div>

          {/* Search */}
          <Input
            {...register("search")}
            onChange={(e) => setSearch(e.target.value)}
            type="text"
            startContent={<i className="fa-solid fa-magnifying-glass"></i>}
            placeholder="Search friends..."
            className="my-5 border border-neutral-200 rounded-xl"
          />

          {/* Suggestions */}
          <div>
            {suggestions?.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
                {suggestions.map((suggestion) => (
                  <SuggestionsCard
                    key={suggestion._id}
                    suggestions={suggestion}
                  />
                ))}
              </div>
            ) : (
              <p className="text-xs text-neutral-500 text-center mt-10">
                {suggestedFriendsQuery.isLoading ||
                searchSuggestedFriends.isLoading ? (
                  <>
                    <i className="fa-solid fa-spinner animate-spin"></i>
                    <span className="ml-2">Loading Suggestions...</span>
                  </>
                ) : (
                  "No suggestions found"
                )}
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
