import { useEffect } from "react";
import { useDispatch } from "react-redux";
import styled from "styled-components";

import { setUserInfo } from "@state/user/user";

import { useUser } from "@features/authentication/login/hooks/useUser";

const StyledMain = styled.main`
  position: relative;
  overflow: hidden;
  background: var(--color-chat-wallpaper-1);
  padding-top: 1rem;
  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;

    -webkit-mask-image: linear-gradient(to bottom, transparent, black);
    mask-image: linear-gradient(to bottom, transparent, black);
    background: var(--color-chat-wallpaper-2);
  }

  &::after {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;

    background-position: center;
    background-size: cover;
    opacity: var(--bg-image-opacity);
    background-image: var(--chat-wallpaper-bg);
  }
`;

function Main({ children }: { children?: React.ReactNode }) {
  const { user, isPending } = useUser();
  const dispatch = useDispatch();

  useEffect(() => {
    if (user && !isPending) {
      dispatch(setUserInfo(user));
    }
  }, [dispatch, user, isPending]);
  return <StyledMain data-testid="main">{children}</StyledMain>;
}

export default Main;
