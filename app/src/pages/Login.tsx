import styled from "styled-components";

import Heading from "../components/Heading";
import LoginSection from "../features/authentication/login/LoginSection";

const LoginLayout = styled.div`
  display: grid;
  grid-template-columns: 26rem 1fr;

  height: 100dvh;

  background-color: var(--color-background);
`;

const SideBar = styled.div`
  grid-row: 1 / -1;

  background-color: var(--accent-color);
`;

const Main = styled.main`
  margin: auto 8rem;
`;

function Login() {
  return (
    <LoginLayout>
      <SideBar />
      <Main>
        <Heading>Welcome back!</Heading>
        <LoginSection />
      </Main>
    </LoginLayout>
  );
}

export default Login;
