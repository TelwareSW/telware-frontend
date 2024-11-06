import Heading from "@components/Heading";
import styled from "styled-components";
import BlockItem, { BlockedUserProps } from "./BlockItem";
import { useAppSelector } from "@hooks/useGlobalState";
import { useBlock } from "./hooks/useBlock";

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

function BlockList() {
  const { props } = useAppSelector((state) => state.sideBarData);

  const blockList: BlockedUserProps[] = useBlock();

  return (
    <StyledOptionsList>
      <PlaceHeader>
        {props && "subtitle" in props && typeof props.subtitle === "string" && (
          <Heading as="h6">{props?.subtitle}</Heading>
        )}
      </PlaceHeader>
      {blockList?.map((item) => <BlockItem {...item} key={item.id} />)}
    </StyledOptionsList>
  );
}

export default BlockList;
