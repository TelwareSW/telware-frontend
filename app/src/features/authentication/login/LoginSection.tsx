import styled from "styled-components";

import LoginForm from "./LoginForm/LoginForm";

import StyledLink from "@components/StyledLink";
import OauthOptions from "../oauth/OauthOptions";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;

  position: relative;
`;

const P = styled.p`
  position: absolute;
  bottom: -4rem;

  text-align: center;

  margin: 0 auto;
  color: var(--color-text-secondary);

  left: 50%;
  transform: translateX(-50%);
`;

function LoginSection() {
  return (
    <Container>
      <LoginForm />
      <OauthOptions />
      <P>
        Don't have an account?{" "}
        <span>
          <StyledLink data-test="signup-link" to="/signup">
            Sign up
          </StyledLink>
        </span>
      </P>
    </Container>
  );
}

export default LoginSection;
