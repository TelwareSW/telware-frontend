import styled from "styled-components";

import useAuthCheck from "@features/authentication/login/hooks/useAuthCheck";
import LoginSection from "@features/authentication/login/LoginSection";
import Heading from "@components/Heading";

const LoginLayout = styled.div`
  display: grid;
  grid-template-columns: 26rem 1fr;

  height: 100dvh;

  background-color: var(--color-background);
`;

const Main = styled.main`
  margin: auto 8rem;
`;

const SideBar = styled.div`
  grid-row: 1 / -1;

  background-color: var(--accent-color);
`;

function Login() {
  useAuthCheck("/login");

  return (
    <LoginLayout>
      <SideBar />
      <Main>
        <Heading data-test="login-header">Welcome back!</Heading>
        <LoginSection />
      </Main>
    </LoginLayout>
  );
}

export default Login;
