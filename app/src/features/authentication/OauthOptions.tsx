import styled from "styled-components";

import google from "/oauth/google.png";
import gitHubLight from "/oauth/gitHubLight.png";
import gitHubDark from "/oauth/gitHubDark.png";
import facebook from "/oauth/facebook.png";

import { useAppSelector } from "../../hooks";
import { Theme } from "../../state/theme/theme";
import { useEffect } from "react";
import { useOauthGitHub } from "./oauth/hooks/useOauthGitHub";
import { useOauthGoogle } from "./oauth/hooks/useOauthGoogle";

const Icon = styled.div`
  display: flex;

  width: 2.5rem;
  height: 2.5rem;

  border: 2px solid var(--color-borders-input);
  border-radius: 50%;

  align-items: center;
  justify-content: center;

  cursor: pointer;

  &:hover {
    background-color: var(--color-interactive-element-hover);
  }
`;

const Img = styled.img`
  width: 1.25rem;
  height: 1.25rem;
`;

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
  const gitHub = theme === Theme.DARK ? gitHubDark : gitHubLight;
  const { mutateGitHub } = useOauthGitHub();
  const { mutateGoogle } = useOauthGoogle();

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const code = urlParams.get("code");

    if (code) {
      console.log("OAuth Code:", code);
      if (window.location.href.includes("google")) {
        mutateGoogle(code);
      } else {
        mutateGitHub(code);
      }
    }
  }, []);

  function loginWithGitHub() {
    const clientID = "Ov23lizLh4CkrbN0D190";
    const redirectURI = "http://localhost:5174/login";
    window.location.href = `https://github.com/login/oauth/authorize?client_id=${clientID}&redirect_uri=${redirectURI}`;
  }

  function loginWithGoogle() {
    const clientID =
      "975054339874-g0ott1ue6qllst7dd0f00h0k2gbonen7.apps.googleusercontent.com";
    const redirectURI = "http://localhost:5174/login";
    const scope = "profile email";
    window.location.href = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${clientID}&redirect_uri=${redirectURI}&response_type=code&scope=${scope}`;
  }

  function loginWithFacbook() {
    const clientID = "1059738629134040";
    const redirectURI = "http://localhost:5174/login";
    const scope = "profile email";
    window.location.href = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${clientID}&redirect_uri=${redirectURI}&response_type=code&scope=${scope}`;
  }

  return (
    <OtherMethods>
      <p>Or</p>

      <Icons data-test="oauth-options">
        <Icon onClick={loginWithGoogle}>
          <Img data-test="google-img" src={google} alt="google" />
        </Icon>
        <Icon>
          <Img
            onClick={loginWithFacbook}
            data-test="facebook-img"
            src={facebook}
            alt="facebook"
          />
        </Icon>
        <Icon onClick={loginWithGitHub}>
          <Img data-test="github-img" src={gitHub} alt="github" />
        </Icon>
      </Icons>
    </OtherMethods>
  );
}

export default OauthOptions;
