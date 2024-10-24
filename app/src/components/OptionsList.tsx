import styled from "styled-components";
import SideBarRow from "./sideBarRow";
import Heading from "./Heading";
import { useAppSelector } from "../hooks";

const StyledOptionsList = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;

  border-bottom: 1rem solid var(--color-item-hover);
  
  padding-top: 2rem;
  padding-bottom: 2rem;
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
