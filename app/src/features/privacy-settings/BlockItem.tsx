import Heading from "@components/Heading";
import Avatar from "@components/Avatar";
import styled from "styled-components";
import { StyledList, StyledListProps } from "./AddToBlockMenuList";
import { getIcon } from "@data/icons";
import { useState } from "react";
import { useBlock } from "./hooks/useBlock";
import { useAppDispatch, useAppSelector } from "@hooks/useGlobalState";
import { setMemberIsBlocked } from "@state/messages/chats";

const StyledSideBarRow = styled.div`
  width: 100%;
  height: 4rem;
  position: relative;
  display: flex;
  flex-direction: row;
  justify-content: start;
  align-items: center;
  padding-left: 5%;
  padding-right: 5%;

  &:hover {
    background: var(--color-background-compact-menu-hover);
    cursor: pointer;
  }

  border-radius: var(--border-radius-modal);
`;

const RowInfo = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: start;
  align-items: center;

  gap: 0.5rem;
`;

const InnerDiv = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: start;
  align-items: start;
`;

const StyledP = styled.p`
  font-size: 0.75rem;
  color: var(--color-text-secondary);
`;

const menuStyles: StyledListProps = {
  $bottom: -6,
  $height: 0,
};

const HoverMask = styled.div`
  width: 100%;
  height: 100%;
  border-radius: var(--border-radius-default);
  display: flex;
  align-items: center;
  padding-left: 10px;
  &:hover {
    background: var(--color-background-compact-menu-hover);
    cursor: pointer;
  }
`;

interface BlockedUserInterface {
  id: string;
}

function BlockItem({ id }: BlockedUserInterface) {
  const [isBlockButtonEnabled, setIsBlockButtonEnabled] = useState(false);
  const { removeFromBlockList } = useBlock();

  const members = useAppSelector((state) => state.chats.members);
  const userId = useAppSelector((state) => state.user.userInfo.id);
  const { screenFirstName, screenLastName, username } =
    members.find((member) => member._id === id) || {};

  const name = screenFirstName + " " + screenLastName || "";

  const dispatch = useAppDispatch();

  function handleRemoveFromBlock(id: string) {
    removeFromBlockList({ id: id.toString() });
    setIsBlockButtonEnabled(false);
    dispatch(setMemberIsBlocked({ memberId: id, isBlocked: false, userId }));
  }

  return (
    <StyledSideBarRow
      onClick={() => setIsBlockButtonEnabled(!isBlockButtonEnabled)}
      data-testid={`open-block-option-${id}`}
    >
      <RowInfo>
        <Avatar name={name[0]} />
        <InnerDiv>
          <Heading as="h5">{name}</Heading>
          <StyledP>{`@${username}`}</StyledP>
        </InnerDiv>
      </RowInfo>

      {isBlockButtonEnabled && (
        <StyledList
          {...menuStyles}
          onClick={() => handleRemoveFromBlock(id)}
          data-testid={`remove-from-blocklist-${id}`}
        >
          <HoverMask>
            <RowInfo>
              {getIcon("Unlock")}
              <Heading as="h5">Unblock</Heading>
            </RowInfo>
          </HoverMask>
        </StyledList>
      )}
    </StyledSideBarRow>
  );
}

export default BlockItem;
export type { BlockedUserInterface as BlockedUserProps };
