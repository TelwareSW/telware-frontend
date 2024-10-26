import styled from "styled-components";
import SideBarRow, { SideBarRowProps } from "./SideBarRow";
import Heading from "../../Heading";
import { useAppSelector } from "../../../hooks";

const StyledOptionsList = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;

  border-bottom: 1rem solid var(--color-item-hover);

  padding-top: 2rem;
  padding-bottom: 2rem;
`;

const PlaceHeader  = styled.div`
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
