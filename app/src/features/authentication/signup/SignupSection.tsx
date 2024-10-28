import { Link } from "react-router-dom";
import styled from "styled-components";
import SignupForm from "./SignupForm";

const Container = styled.div`
  max-width: 120rem;
  margin: auto;
  display: flex;
  flex-direction: column;
  gap: 2rem;
  position: relative;
  flex: 1;
  overflow-y: hidden;
  display: flex;
  flex-direction: column;
`;

const P = styled.p`
  position: absolute;
  bottom: 2rem;
  margin: 0 auto;
  color: var(--color-text-secondary);
  left: 50%;
  transform: translateX(-50%);
`;

const StyledLink = styled(Link)`
  color: var(--accent-color);
  position: relative;
  text-decoration: none;

  &::before {
    content: "";
    position: absolute;
    width: 100%;
    height: 1px;
    border-radius: 4px;
    background-color: var(--accent-color);
    bottom: 0;
    left: 0;
    transform-origin: right;
    transform: scaleX(0);
    transition: transform 0.3s ease-in-out;
  }

  &:hover::before {
    transform-origin: left;
    transform: scaleX(1);
  }
`;

function SignupSection() {
  return (
    <Container>
      <SignupForm />
      <P>
        Already have an account? <StyledLink to="/login">Login</StyledLink>
      </P>
    </Container>
  );
}

export default SignupSection;
