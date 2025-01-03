import Heading from "@components/Heading";
import styled from "styled-components";
import BlockItem from "./BlockItem";
import { useAppSelector } from "@hooks/useGlobalState";
import { useBlock } from "./hooks/useBlock";
import CircleIcon from "@components/CircleIcon";
import { useState } from "react";
import AddToBlockMenuList from "./AddToBlockMenuList";
import { useSidebarType } from "@components/side-bar/SideBarContext";

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

export interface BlockListInterface {
  id: string;
  username: string;
  email: string;
  _id: string;
}

function BlockList() {
  const type = useSidebarType();

  const { props } = useAppSelector((state) =>
    type === "left"
      ? state.sideBarData.leftSideBar
      : state.sideBarData.rightSideBar
  );
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

      {blockList?.map((item: BlockListInterface) => {
        return <BlockItem id={item.id} key={item.id} />;
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
