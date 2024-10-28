import { useEffect } from "react";
import styled from "styled-components";

import google from "/oauth/google.png";
import githubLight from "/oauth/githubLight.png";
import githubDark from "/oauth/githubDark.png";
import facebook from "/oauth/facebook.png";

import LoginWith from "./LoginWith";

import { useAppSelector } from "../../../hooks";
import { Theme } from "../../../state/theme/theme";

import { useOauthGoogle } from "../oauth/hooks/useOauthGoogle";
import { useOauthFacebook } from "../oauth/hooks/useOauthFacebook";
import { useOauthGithub } from "../oauth/hooks/useOauthGithub";

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

  const { loginWithGithub } = useOauthGithub();
  const { loginWithGoogle } = useOauthGoogle();
  const { loginWithFacebook } = useOauthFacebook();

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const code = urlParams.get("code");

    if (code) {
      if (window.location.href.includes("google")) {
        loginWithGoogle(code);
      } else if (window.location.href.includes("facebook")) {
        loginWithFacebook(code);
      } else {
        loginWithGithub(code);
      }
    }
  }, []);

  function handleGithubLogin() {
    const clientID = import.meta.env.VITE_GITHUB_CLIENT_ID;
    const redirectURI = "http://localhost:5174/login";
    window.location.href = `https://github.com/login/oauth/authorize?client_id=${clientID}&redirect_uri=${redirectURI}`;
  }

  function handleGoogleLogin() {
    const clientID = import.meta.env.VITE_GOOGLE_CLIENT_ID;
    const redirectURI = "http://localhost:5174/login";
    const scope = "profile email";
    window.location.href = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${clientID}&redirect_uri=${redirectURI}&response_type=code&scope=${scope}`;
  }

  return (
    <OtherMethods>
      <p>Or</p>

      <Icons data-test="oauth-options">
        <LoginWith onClick={handleGoogleLogin} src={google} alt="google" />
        <LoginWith src={facebook} alt="facebook" />
        <LoginWith onClick={handleGithubLogin} src={gitHub} alt="github" />
      </Icons>
    </OtherMethods>
  );
}

export default OauthOptions;
