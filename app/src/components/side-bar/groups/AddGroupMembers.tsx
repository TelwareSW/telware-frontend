import UsersList from "@components/UsersList";

export default function AddGroupMembers({
  type,
}: {
  type: "group" | "channel";
}) {
  console.log(type);
  return <UsersList type={type} />;
}
