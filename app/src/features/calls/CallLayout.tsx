import styled from "styled-components";

const ModalContainer = styled.div`
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  display: flex;
  justify-content: center;
  align-items: center;
`;
const ModalBackdrop = styled.div`
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: -1;
  background-color: rgba(0, 0, 0, 0.25);
`;
const ModalDialog = styled.div`
  position: relative;
  display: inline-flex;
  flex-direction: column;
  width: 100%;
  max-width: 35rem;
  min-width: 17.5rem;
  margin: 2rem auto;
  background-color: var(--color-background);
  box-shadow: 0 0.25rem 0.5rem 0.125rem var(--color-default-shadow);
  border-radius: var(--border-radius-modal);
  transform: translate3d(0, -1rem, 0);
  transition:
    transform 0.2s ease,
    opacity 0.2s ease;
`;
export default function CallLayout() {
  return (
    <ModalContainer>
      <ModalBackdrop></ModalBackdrop>
      <ModalDialog>CALLL</ModalDialog>
    </ModalContainer>
  );
}
