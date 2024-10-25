import styled from "styled-components";

import Heading from "../components/Heading";
import LoginSection from "../features/authentication/login/LoginSection";
import SettingsSideBar from "../components/SettingsSideBarBody";

const LoginLayout = styled.div`
  display: grid;
  grid-template-columns: 26rem 1fr;

  height: 100dvh;

  background-color: var(--color-background);
`;

const Main = styled.main`
  margin: auto 8rem;
`;

function Login() {
  return (
    <LoginLayout>
      <SettingsSideBar header="Privacy and Security" />
      <Main>
        <Heading>Welcome back!</Heading>
        <LoginSection />
      </Main>
    </LoginLayout>
  );
}

export default Login;
