import { useAppDispatch, useAppSelector } from "../hooks";
import { Theme } from "../state/theme/theme";
import { toggleTheme } from "../state/theme/theme";


function TestComponent() {

    const theme = useAppSelector((state) => state.theme.value);
    const dispatch = useAppDispatch();
    
    const color = theme === Theme.DARK ? "darkBlue" : "lightBlue";
    
    return (
      <>
        <h1 style={{ color: color }}>Hello World</h1>
        <button onClick={() => dispatch(toggleTheme())}>Toggle Theme</button>
      </>
    );
}
export default TestComponent
