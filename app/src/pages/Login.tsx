import styled from "styled-components";

import Heading from "../components/Heading";
import LoginSection from "../features/authentication/login/LoginSection";
import SettingsSideBar from "../components/sideBar/settings/SettingsSideBar";
import ChangeSettings from "@components/privacySettings/changeSettings";
import RadioInput from "@components/inputs/RadioInput";

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
      <SettingsSideBar />
      <Main>
        <Heading>Welcome back!</Heading>
        <LoginSection />
      </Main>
    </LoginLayout>
  );
}

export default Login;
