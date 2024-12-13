import { useQuery } from "@tanstack/react-query";

import { getAllUsers } from "../services/getAllUsers";

type UserType = {
  _id: string;
  username: string;
  screenFirstName: string;
  screenLastName: string;
  email: string;
  photo: string;
  status: string;
  bio: string;
};

function useAllUsers() {
  const { data: users, isPending } = useQuery<UserType[]>({
    queryKey: ["users"],
    queryFn: getAllUsers,
  });

  return { users, isPending };
}

export { useAllUsers };
export type { UserType };
