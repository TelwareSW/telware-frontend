import styled from "styled-components";
import { useEffect, useState } from "react";
import { useGroups } from "../hooks/useGroups";
import { Group } from "types/admin";
import Filter from "./Filter";
import GroupCard from "./GroupCard";

const groupFilters = ["all", "filtered", "unfiltered"];
const Container = styled.div`
  gap: 3.2rem;
  display: flex;
  margin: 0 auto;
  flex-direction: column;
`;
const StyledGroupsList = styled.ul`
  display: grid;
  gap: 1.6rem 0.6rem;
  grid-template-columns: repeat(auto-fill, minmax(15rem, 1fr));
  padding: 1.6rem;
`;
function GroupsList() {
  const { groups: groupsData } = useGroups();
  const groups = groupsData?.data.groupsAndChannels;
  const [renderedGroups, setRenderedGroups] = useState<Group[]>(groups);
  const [currentFilter, setCurrentFilter] = useState("all");

  useEffect(() => {
    const filteredGroups: Group[] =
      currentFilter === "all"
        ? groups
        : currentFilter === "filtered"
          ? groups?.filter((group: Group) => group.isFilterd)
          : groups?.filter((group: Group) => !group.isFilterd);
    setRenderedGroups(filteredGroups);
  }, [groups, currentFilter]);
  return (
    <Container>
      <Filter
        filters={groupFilters}
        onFilterChange={(filter: string) => setCurrentFilter(filter)}
      />
      <StyledGroupsList>
        {renderedGroups?.map((group: Group) => (
          <GroupCard
            key={group.id}
            id={group.id}
            name={group.name}
            photo={group.picture}
            filtered={group.isFilterd}
            numberOfMembers={group.numberOfMembers}
          />
        ))}
      </StyledGroupsList>
    </Container>
  );
}

export default GroupsList;
