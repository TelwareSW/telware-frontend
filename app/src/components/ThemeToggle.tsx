import { Theme, toggleTheme } from "../state/theme/theme";
import { useAppDispatch, useAppSelector } from "../hooks";
import styled, { css } from "styled-components";
interface SliderProps {
  theme: Theme;
}

const Switch = styled.label`
  position: relative;
  display: inline-block;
  width: 35px;
  height: 16px;
  margin-left: 4rem;
`;

const Input = styled.input`
  opacity: 0;
  width: 0;
  height: 0;
`;

const Slider = styled.span<SliderProps>`
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  transition: 0.4s;
  border-radius: 10px;
  padding: 4px;
  background-color: var(--color-background-own-2);

  ${(props) =>
    props.theme === Theme.LIGHT &&
    css`
      background-color: var(--pattern-color);
    `};
  &:before {
    position: absolute;
    content: "";
    height: 18px;
    width: 18px;
    left: 0px;
    bottom: -1.5px;
    transition: 0.4s;
    border-radius: 50%;
    background-color: var(--color-background);
    border: 2px solid var(--pattern-color);
    ${(props) =>
      props.theme !== Theme.LIGHT &&
      css`
        border: 2px solid var(--color-background-own-2);
      `};
  }

  ${Input}:checked + &:before {
    transform: translateX(18px);
  }
`;
function ThemeToggle() {
  const dispatch = useAppDispatch();
  const currentTheme = useAppSelector((state) => state.theme.value);
  const handleToggle = () => {
    dispatch(toggleTheme());
  };

  return (
    <Switch>
      <Input
        type="checkbox"
        checked={currentTheme === Theme.DARK}
        onChange={handleToggle}
      />
      <Slider theme={currentTheme} />
    </Switch>
  );
}

export default ThemeToggle;
