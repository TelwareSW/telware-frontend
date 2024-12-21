import styled from "styled-components";

const Container = styled.div`
  z-index: 1;

  position: absolute;
  bottom: 0;
  z-index: 1;
  left: 50%;
  width: 100%;
  transform: translateX(-50%);
  margin: auto;
`;

const P = styled.p`
  color: var(--color-text-secondary);
  padding: 1rem;
  text-align: center;
  width: 100%;
  background-color: var(--color-background);
`;

function DisabledChatInput() {
  return (
    <Container>
      <P>Only admins can send messages</P>
    </Container>
  );
}
export default DisabledChatInput;
