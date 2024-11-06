import styled from "styled-components";

import CircleIcon from "./CircleIcon";
import { getIcon } from "@data/icons";
import ExpandingTextArea from "./ExpandingTextArea";

const Container = styled.div`
  position: absolute;
  z-index: 1000;
  bottom: 1rem;
  left: 0;
  right: 0;

  margin: auto;

  width: 80%;
  max-width: 600px;

  display: flex;
`;

const InputContainer = styled.div`
  background-color: var(--color-background);

  padding: 0.3125rem 0.6rem;
  border-radius: 1rem;

  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);

  flex: 3 auto;

  display: flex;
  align-items: center;
  align-self: center;

  height: 100%;
`;

const InputWrapper = styled.div`
  display: flex;
  align-items: flex-end;
  gap: 1rem;

  position: relative;

  flex: 1;
`;

const AnotherContainer = styled.div`
  display: flex;
  align-items: flex-end;
  gap: 1rem;

  flex: 1;
`;

function ChatInput() {
  return (
    <Container>
      <AnotherContainer>
        <InputContainer>
          <InputWrapper>
            {getIcon("Emojie")}
            <ExpandingTextArea />
            {getIcon("Attatch")}
          </InputWrapper>
        </InputContainer>

        <CircleIcon
          data-testid="record-icon"
          $icon="Record"
          $size={3.3}
          $padding={0.5}
          $color="white"
          $bgColor="var(--accent-color)"
        />
      </AnotherContainer>
    </Container>
  );
}

export default ChatInput;
