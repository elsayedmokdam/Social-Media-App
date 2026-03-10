import { useQuery } from "@tanstack/react-query";
import { $Services } from "../services/services-repository";

export function usePosts(activeTab) {
  return useQuery({
    queryKey: ["posts", activeTab],
    queryFn: () => $Services.POSTS_REPOSITORY.getPostsBySelectedTab(activeTab),
  });
}
