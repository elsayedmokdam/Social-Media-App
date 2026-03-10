import { useQuery } from "@tanstack/react-query";
import { $QUERY_KEYS } from "../query-keys/queryKeys";
import { $Services } from "../services/services-repository";

export function useMyProfile() {
  // Get my profile
  const myProfileQuery = useQuery({
    queryKey: $QUERY_KEYS.profile.myProfile,
    queryFn: () => $Services.USER_REPOSITORY.getMyProfile(),
  });

  return myProfileQuery;
}
