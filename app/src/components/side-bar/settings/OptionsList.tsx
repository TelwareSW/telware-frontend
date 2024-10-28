import styled from "styled-components";
import SideBarRow, { SideBarRowProps } from "./side-bar-row/SideBarRow";
import Heading from "@components/Heading";
import { useAppSelector } from "hooks/useGlobalState";

const StyledOptionsList = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;

  border-bottom: 1px solid var(--color-item-hover);
  padding: 1rem 0;
`;

const PlaceHeader = styled.div`
  padding-left: 5%;
  padding-right: 5%;
  padding-bottom: 0.5rem;
`;

function OptionsList({ rows }: { rows: SideBarRowProps[] }) {
  const { title } = useAppSelector((state) => state.sideBarData);

  return (
    <>
      {rows.length > 0 && (
        <StyledOptionsList>
          <PlaceHeader>
            <Heading as="h6">{title}</Heading>
          </PlaceHeader>
          {rows.map((item, index) => (
            <SideBarRow {...item} key={index} />
          ))}
        </StyledOptionsList>
      )}
    </>
  );
}

export default OptionsList;
