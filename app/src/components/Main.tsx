import styled, { css } from "styled-components";
import { Theme } from "../state/theme/theme";
import { useAppSelector } from "../hooks";

const StyledMain = styled.main<{ $theme: Theme }>`
  position: relative;
  overflow: hidden;
  background: linear-gradient(90deg, #49175d, #1c1042, #202656, #262b64);
  ${({ $theme }) =>
    $theme === Theme.LIGHT &&
    css`
      background: linear-gradient(
        90deg,
        #f8f67d,
        #b9c266,
        #6aa458,
        #4f884a,
        #2e5423
      );
    `};

  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;

    -webkit-mask-image: linear-gradient(to bottom, transparent, white);
    mask-image: linear-gradient(to bottom, transparent, white);
    background: linear-gradient(90deg, #3e1f3f, #562a48, #947358);
    ${({ $theme }) =>
      $theme === Theme.LIGHT &&
      css`
        background: linear-gradient(
          90deg,
          #53876c,
          #537e48,
          #528a59,
          #99a073,
          #d8dab8
        );
      `};
  }

  &::after {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-image: url("/assets/bg-dark.png");
    background-position: center;
    background-size: cover;
    ${({ $theme }) =>
      $theme === Theme.LIGHT &&
      css`
        opacity: 0.4;
        z-index: 9;
        background-image: url("/assets/bg-light.png");
      `};
  }
`;

function Main({ children }: { children?: React.ReactNode }) {
  const currentTheme = useAppSelector((state) => state.theme.value);

  return <StyledMain $theme={currentTheme}>{children}</StyledMain>;
}

export default Main;
