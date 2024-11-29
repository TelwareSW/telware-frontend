import Heading from "@components/Heading";
import styled from "styled-components";
import BlockItem from "./BlockItem";
import { useAppSelector } from "@hooks/useGlobalState";
import { useBlock } from "./hooks/useBlock";
import CircleIcon from "@components/CircleIcon";
import { useState } from "react";
import AddToBlockMenuList from "./AddToBlockMenuList";

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

  const { blockList } = useBlock();

  const [isMenuOpened, setIsMenuOpened] = useState(false);

  return (
    <StyledOptionsList>
      {isMenuOpened && <AddToBlockMenuList setIsMenuOpened={setIsMenuOpened} />}

      <PlaceHeader>
        {props && "subtitle" in props && typeof props.subtitle === "string" && (
          <Heading as="h6">{props?.subtitle}</Heading>
        )}
      </PlaceHeader>

      {blockList?.map((item) => {
        return <BlockItem {...item} key={item.id} />;
      })}

      <CircleIcon
        $icon="Add"
        $right={1}
        $bottom={1}
        $size={3.3}
        $color="white"
        $bgColor="var(--accent-color)"
        onClick={() => setIsMenuOpened(!isMenuOpened)}
        data-testid="block-user-menu-icon"
      />
    </StyledOptionsList>
  );
}

export default BlockList;
