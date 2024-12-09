import styled from "styled-components";

import LoginSection from "@features/authentication/login/LoginSection";
import Heading from "@components/Heading";
import { DESKTOP_VIEW, MOBILE_VIEW } from "@constants";

const LoginLayout = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;

  height: 100dvh;

  background-color: var(--color-background);

  @media ${MOBILE_VIEW} {
    font-size: smaller;
  }
`;

const Main = styled.main`
  width: 85%;

  @media ${DESKTOP_VIEW} {
    width: 60%;
  }
`;

function Login() {
  return (
    <LoginLayout>
      <Main>
        <Heading data-test="login-header">Welcome back!</Heading>
        <LoginSection />
      </Main>
    </LoginLayout>
  );
}

export default Login;
