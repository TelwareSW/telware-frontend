import UsersList from "@components/UsersList";
import { useGroupInfo } from "./hooks/useGroupInfo";
import AddMembersButton from "./AddMembersButton";
import SearchInput from "@components/side-bar/groups/SearchInput";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { updateSideBarView } from "@state/side-bar/sideBar";
import { sideBarPages } from "types/sideBar";

function Admins() {
  const { isPending, admins } = useGroupInfo();
  const [searchQuery, setSearchQuery] = useState("");
  const dispatch = useDispatch();

  if (isPending) return;

  const filteredAdmins = admins?.filter((admin) =>
    `${admin.screenFirstName} ${admin.screenLastName}`
      .toLowerCase()
      .includes(searchQuery.toLowerCase())
  );

  function handleClick() {
    dispatch(
      updateSideBarView({
        redirect: sideBarPages.ADD_ADMINS,
        data: { type: "right" },
      })
    );
  }

  return (
    <>
      <SearchInput searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
      <UsersList view="display" users={filteredAdmins} />
      <AddMembersButton onClick={handleClick} />
    </>
  );
}
export default Admins;
