import Icon from "@components/Icon";
import { getIcon } from "@data/icons";
import styled from "styled-components";

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

type Props = {
  state: "Edit" | "Reply";
  message: string;
};

export default function ReplyWrapper({ state = "Edit", message }: Props) {
  return (
    <Container>
      <Icon>{getIcon(state)}</Icon>
      <MessageBox>
        <State>{`${state}ing`}</State>
        <Message>{message}</Message>
      </MessageBox>
      <Icon>{getIcon("Close")}</Icon>
    </Container>
  );
}
