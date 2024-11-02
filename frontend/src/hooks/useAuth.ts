import { useQuery } from "@tanstack/react-query";
import { getUser } from "../lib/api.auth";

export const AUTH = "auth";


//Get and store the user for protected routes
const useAuth = (opts = {}) => {


  const { data: user, ...rest } = useQuery({
    queryKey: [AUTH],
    queryFn: getUser,
    staleTime: Infinity,
    ...opts,
  });

  return {
    user,
    ...rest,
  };
};

export default useAuth;
