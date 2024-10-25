import styled from "styled-components";
import { useAppSelector } from "../../../hooks";
import SideBarRow, { SideBarRowProps } from "./SideBarRow";
import Heading from "../../Heading";

const StyledOptionsList = styled.ul`
  display: flex;
  padding: 1rem 1rem 0 1rem !important;
  list-style: none;
  flex-direction: column;
  justify-content: center;
  border-bottom: 1rem solid var(--color-item-hover);
`;

function OptionsList({ rows }: { rows: SideBarRowProps[] }) {
  const { title } = useAppSelector((state) => state.sideBarData);

  return (
    <>
      {rows.length > 0 && (
        <StyledOptionsList>
          <Heading as="h6">{title}</Heading>
          {rows.map((item, index) => (
            <SideBarRow {...item} key={index} />
          ))}
        </StyledOptionsList>
      )}
    </>
  );
}

export default OptionsList;
