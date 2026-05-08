import { useQuery } from "@tanstack/react-query";
import { getProfile, queryKeys } from "../lib/api/queries";

export function useAuthUser() {
  return useQuery({
    queryKey: queryKeys.profile,
    queryFn: getProfile,
    enabled: Boolean(localStorage.getItem("token")),
  });
}
