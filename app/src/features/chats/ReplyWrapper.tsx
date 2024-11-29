import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";

import Icon from "@components/Icon";
import { getIcon } from "@data/icons";

import { clearActiveMessage } from "@state/messages/activeMessage";
import { RootState } from "@state/store";

const Container = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;

  height: 45px;
  opacity: 1;

  & svg {
    color: var(--accent-color);
  }
`;

const MessageBox = styled.div`
  line-height: 1rem;

  background-color: var(--color-background-compact-menu);

  position: relative;
  flex: 1 1;

  border-left: var(--accent-color) 3px solid;
  border-radius: 5px;

  padding: 7px 0.5rem;

  &:hover {
    background-color: var(--color-background-compact-menu-hover);
  }

  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;

    width: 1px;
    height: 100%;

    background-color: var(--accent-color);
  }
`;

const State = styled.div`
  color: var(--accent-color);
  text-transform: capitalize;
`;

const Message = styled.div`
  font-size: smaller;
  color: var(--color-text);
  opacity: 0.9;
`;

export default function ReplyWrapper() {
  const dispatch = useDispatch();
  const activeMessage = useSelector((state: RootState) => state.activeMessage);

  function handleHideWrapper() {
    dispatch(clearActiveMessage());
  }

  return (
    <Container>
      <Icon>{getIcon(activeMessage.state === "edit" ? "Edit" : "Reply")}</Icon>
      <MessageBox>
        <State>{`${activeMessage.state}ing`}</State>
        <Message>{activeMessage.content}</Message>
      </MessageBox>
      <Icon onClick={handleHideWrapper}>{getIcon("Close")}</Icon>
    </Container>
  );
}
