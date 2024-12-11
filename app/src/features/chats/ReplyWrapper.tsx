import { useDispatch } from "react-redux";
import styled from "styled-components";

import Icon from "@components/Icon";
import { getIcon } from "@data/icons";

import { clearActiveMessage } from "@state/messages/activeMessage";
import { useAppSelector } from "@hooks/useGlobalState";
import MessageBox from "./MessageBox";
import { useContext } from "react";
import { ChatInputContext } from "./ChatBox";

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

export default function ReplyWrapper() {
  const dispatch = useDispatch();

  const { setInput } = useContext(ChatInputContext);
  const activeMessage = useAppSelector((state) => state.activeMessage);

  function handleHideWrapper() {
    dispatch(clearActiveMessage());
    if (activeMessage.state === "edit") setInput("");
  }

  return (
    <Container data-testid="reply-wrapper">
      <Icon>{getIcon(activeMessage.state === "edit" ? "Edit" : "Reply")}</Icon>
      <MessageBox />
      <Icon onClick={handleHideWrapper} test-id="close-icon">
        {getIcon("Close")}
      </Icon>
    </Container>
  );
}
