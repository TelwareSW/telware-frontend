import styled from "styled-components";
import { useUnfilterGroup } from "../hooks/useUnfilterGroup";
import { useFilterGroup } from "../hooks/useFilterGroup";
import Avatar from "@components/Avatar";
import Heading from "@components/Heading";
import Button from "@components/Button";

interface GroupCardProps {
  id: string;
  name: string;
  photo: string;
  filtered: boolean;
  numberOfMembers: number;
}

const Card = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.6rem;
  padding: 1.2rem;
  border-radius: 0.8rem;
  background-color: var(--admin-sidebar-bg);
  height: 15rem;
  width: 15rem;
  align-items: center;
`;
const P = styled.p<{ $filtered?: boolean }>`
  color: ${({ $filtered }) =>
    $filtered === undefined
      ? "var(--color-text)"
      : $filtered === false
        ? "var(--color-error)"
        : "var(--admin-card-active)"};
`;
const GroupInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.8rem;
  align-items: center;
  justify-content: center;
  text-align: center;
`;

function GroupCard(props: GroupCardProps) {
  const { id, name, photo, filtered, numberOfMembers } = props;
  const { filterGroup } = useFilterGroup();
  const { unfilterGroup } = useUnfilterGroup();
  const handleFilterGroup = () => {
    if (filtered) unfilterGroup(id);
    else filterGroup(id);
  };
  const displayedName = name.length > 9 ? `${name.slice(0, 9)}...` : name;

  return (
    <Card>
      <GroupInfo>
        <Avatar image={photo} name={name} />
        <>
          <Heading as="h4">{displayedName}</Heading>
          <P $filtered={filtered}>{filtered ? "Filtered" : "Unfiltered"}</P>
          <P>{numberOfMembers} members</P>
        </>
      </GroupInfo>
      {
        <Button
          $type={filtered ? "danger" : "normal"}
          onClick={handleFilterGroup}
          $width="8rem"
        >
          {filtered ? "Unfilter" : "Filter"}
        </Button>
      }
    </Card>
  );
}

export default GroupCard;
