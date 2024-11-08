import styled from "styled-components";

import google from "/oauth/google.png";
import githubLight from "/oauth/githubLight.png";
import githubDark from "/oauth/githubDark.png";

import { apiGithubOauth, apiGoogleOauth } from "./services/apiOauth";
import LoginWith from "./LoginWith";

import { Theme } from "state/theme/theme";

import { useOauth } from "./hooks/useOauth";
import { useAppSelector } from "hooks/useGlobalState";

const Icons = styled.div`
  display: flex;
  gap: 1rem;

  margin: 0 auto;
`;

const OtherMethods = styled.div`
  display: flex;
  flex-direction: column;

  color: var(--color-text-secondary);
  align-items: center;

  gap: 0.2rem;
`;

function OauthOptions() {
  const theme = useAppSelector((state) => state.theme.value);
  const gitHub = theme === Theme.DARK ? githubDark : githubLight;

  useOauth();

  return (
    <OtherMethods>
      <p>Or</p>

      <Icons data-test="oauth-options">
        <LoginWith onClick={apiGoogleOauth} src={google} alt="google" />
        <LoginWith onClick={apiGithubOauth} src={gitHub} alt="github" />
      </Icons>
    </OtherMethods>
  );
}

export default OauthOptions;
