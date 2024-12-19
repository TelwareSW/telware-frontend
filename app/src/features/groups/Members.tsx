import UsersList from "@components/UsersList";
import { useGroupInfo } from "./hooks/useGroupInfo";
import AddMembersButton from "./AddMembersButton";
import SearchInput from "@components/side-bar/groups/SearchInput";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { updateSideBarView } from "@state/side-bar/sideBar";
import { sideBarPages } from "types/sideBar";

function Members() {
  const { isPending, groupMembers } = useGroupInfo();
  const [searchQuery, setSearchQuery] = useState("");
  const dispatch = useDispatch();

  if (isPending) return;

  const filteredMembers = groupMembers?.filter((member) =>
    `${member.screenFirstName} ${member.screenLastName}`
      .toLowerCase()
      .includes(searchQuery.toLowerCase())
  );

  function handleClick() {
    dispatch(
      updateSideBarView({
        redirect: sideBarPages.ADD_MORE_MEMBERS,
        data: { type: "right" },
      })
    );
  }

  return (
    <>
      <SearchInput searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
      <UsersList view="display" users={filteredMembers} />
      <AddMembersButton
        data-testid="add-members-button"
        onClick={handleClick}
      />
    </>
  );
}
export default Members;
