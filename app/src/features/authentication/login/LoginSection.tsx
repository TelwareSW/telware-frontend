import styled from "styled-components";

import LoginForm from "./LoginForm";
import OauthOptions from "../OauthOptions";

import StyledLink from "@components/StyledLink";

const Container = styled.div`
  max-width: 120rem;
  margin: 0 auto;

  display: flex;
  flex-direction: column;
  gap: 2rem;

  position: relative;
`;

const P = styled.p`
  position: absolute;
  bottom: -4rem;

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
          <StyledLink data-test='signup-link' to="/signup">Sign up</StyledLink>
        </span>
      </P>
    </Container>
  );
}

export default LoginSection;
