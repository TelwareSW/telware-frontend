import User from "./User";
import { UserType } from "@features/groups/hooks/useAllUsers";

function UsersList({
  view,
  users,
}: {
  view: "update" | "display";
  users: UserType[];
}) {
  return users?.map((user) => <User key={user._id} user={user} view={view} />);
}

export default UsersList;
