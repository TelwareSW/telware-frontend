import Heading from "@components/Heading";
import { getIcon } from "@data/icons";
import { useAppSelector } from "@hooks/useGlobalState";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 1rem;
  height: 100dvh;
`;
const Sign = styled.p`
  font-size: 15rem;
  text-align: center;
`;
const ErrorMessage = styled.p`
  color: var(--color-error);
  font-size: 1.5rem;
`;
const Arrow = styled.button`
  background-color: var(--accent-color);
  color: var(--color-text);
  padding: 0.5rem 1rem;
  border-radius: 0.5rem;
  font-size: 3rem !important;
  cursor: pointer;
  border: none;
  & > svg {
    margin-right: 0.5rem;
    color: var(--color-primary);
    font-size: 2rem;
  }
`;
function Unauthorized() {
  const navigate = useNavigate();
  const isAdmin = useAppSelector((state) => state.user.userInfo.isAdmin);
  return (
    <Container>
      <Sign>🚫️</Sign>
      <Heading as="h1">403 - Unauthorized</Heading>
      <ErrorMessage>You do not have access to this page.</ErrorMessage>
      <Arrow
        onClick={() => navigate(isAdmin ? "/admin" : "/", { replace: true })}
      >
        {getIcon("BackArrow")} Back To Home
      </Arrow>
    </Container>
  );
}

export default Unauthorized;
