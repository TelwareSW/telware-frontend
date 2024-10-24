import styled, { css } from "styled-components";
import { Theme } from "../state/theme/theme";
import { useAppSelector } from "../hooks";

interface MainTheme {
  theme: Theme;
}
const StyledMain = styled.main<MainTheme>`
  position: relative;
  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-size: 510px auto;
    ${(props) =>
      props.theme === Theme.LIGHT &&
      css`
        left: 0;
        background-image: url("/assets/bg-light.png");
        background-size: 1200px auto;
      `};
    background-position: center;
    opacity: 0.2;
  }
  &::after {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-image: url("/assets/bg-dark.png");
    background-size: 1000px auto;
    ${(props) =>
      props.theme === Theme.LIGHT &&
      css`
        background-image: url("/assets/bg-light-grdient-color.png");
        background-size: 110% 110%;
        transform: rotate(180deg);
      `};
    z-index: -1;
    background-position: center;
  }
`;

interface MainProps {
  children?: React.ReactNode;
}
function Main({ children }: MainProps) {
  const currentTheme = useAppSelector((state) => state.theme.value);

  return <StyledMain theme={currentTheme}>{children}</StyledMain>;
}

export default Main;
