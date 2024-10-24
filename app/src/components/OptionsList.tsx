import styled from "styled-components";
import SideBarRow from "./SideBarRow";
import Heading from "./Heading";
import { useAppSelector } from "../hooks";

const StyledOptionsList = styled.ul`
  display: flex;
  padding: 1rem 1rem 0 1rem !important;
  list-style: none;
  flex-direction: column;
  justify-content: center;
  border-bottom: 1rem solid var(--color-item-hover);
`;

function OptionsList() {
  const { rows, header } = useAppSelector((state) => state.sideBarData);

  return (
    <>
      {rows.length > 0 && (
        <StyledOptionsList>
          <Heading as="h6">{header}</Heading>
          {rows.map((item, index) => (
            <SideBarRow {...item} key={index} />
          ))}
        </StyledOptionsList>
      )}
    </>
  );
}

export default OptionsList;
