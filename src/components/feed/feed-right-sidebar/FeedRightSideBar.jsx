import { Divider, Input } from "@heroui/react";
import { useQuery } from "@tanstack/react-query";
import { $Services } from "../../../services/services-repository";
import SuggestionsCard from "./SuggestionsCard";
import { Link } from "react-router";
import { useForm } from "react-hook-form";
import { $QUERY_KEYS } from "../../../query-keys/queryKeys";
import { useState } from "react";

export default function FeedRightSideBar() {
  const [isOpenSuggestions, setIsOpenSuggestions] = useState(true);
  const [search, setSearch] = useState("");

  const { register, reset } = useForm({
    mode: "onChange",
    reValidateMode: "onChange",
    defaultValues: {
      search: "",
    },
  });

  // Get suggested friends
  const suggestedFriendsQuery = useQuery({
    queryFn: () =>
      $Services.USER_REPOSITORY.getFollowSuggestions({ limit: 10 }),
      queryKey: ["suggested-friends", search],
  });

  // Get search suggested friends
  const searchSuggestedFriends = useQuery({
    queryFn: () => $Services.USER_REPOSITORY.searchSuggestions({ q: search }),
    queryKey: $QUERY_KEYS.searchSuggestions,
  });

  // Handle search
  const handleSearch = (e) => {
    setSearch(e.target.value);
    reset({ search: e.target.value });
    searchSuggestedFriends.refetch();
  };

  // Get suggestions
  const suggestions =
    search.length > 0
      ? searchSuggestedFriends?.data?.data?.users
      : suggestedFriendsQuery?.data?.data?.suggestions;
    
  return (
    <div className="bg-white rounded-xl shadow-md p-3 sticky top-25">
      <div
        onClick={() => setIsOpenSuggestions(!isOpenSuggestions)}
        className="flex justify-between items-center"
      >
        <p className="flex items-center gap-2 text-sm font-bold">
          <span className="text-blue-500">
            <i className="fa-solid fa-users"></i>
          </span>
          <span>Suggested Friends</span>
        </p>
        <p className="bg-gray-200 rounded-full size-5 p-2 text-xs font-bold flex justify-center items-center">
          {suggestedFriendsQuery?.isLoading ||
          searchSuggestedFriends?.isLoading ? (
            <i className="fa-solid fa-spinner animate-spin"></i>
          ) : (
            suggestions?.length
          )}
        </p>
      </div>
      <Input
        {...register("search")}
        onClear={() => setSearch("")}
        onChange={handleSearch}
        type="text"
        startContent={<i className="fa-solid fa-magnifying-glass"></i>}
        placeholder="Search friends..."
        className={`my-3 border-1 border-neutral-200 rounded-xl outline-none hidden xl:flex ${isOpenSuggestions ? "flex" : "hidden"}`}
      />
      <div>
        {suggestions?.length > 0 ? (
          <>
            <div
              className={` mt-5 overflow-y-auto max-h-80 md-max-h-100 xl:max-h-100 pr-1.5 ${isOpenSuggestions ? "flex flex-col gap-3" : "hidden"}`}
            >
              {suggestions?.map((suggestion) => (
                <SuggestionsCard
                  key={suggestion._id}
                  suggestions={suggestion}
                />
              ))}
            </div>
          </>
        ) : (
          <p className="text-xs text-neutral-500 text-center mt-5">
            {suggestedFriendsQuery?.isLoading ||
            searchSuggestedFriends?.isLoading ? (
              <span>
                <i className="fa-solid fa-spinner animate-spin"></i>{" "}
                <span>Loading Suggestions...</span>
              </span>
            ) : (
              "No suggestions found"
            )}
          </p>
        )}
      </div>
      {suggestions?.length > 0 && (
        <Link
          to="/suggestions"
          className={`text-xs text-blue-500 font-bold cursor-pointer items-center justify-center bg-white border border-neutral-200 rounded-full py-2 mt-5 xl:flex ${isOpenSuggestions ? "flex" : "hidden"}`}
        >
          Show more
        </Link>
      )}
    </div>
  );
}
