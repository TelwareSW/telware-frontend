import { createContext, useState, ReactNode, useContext } from "react";

interface RightSideBarContextType {
  isRightSideBarOpen: boolean;
  setIsRightSideBarOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const RightSideBarContext = createContext<RightSideBarContextType | undefined>(
  undefined
);

interface RightSideBarProviderProps {
  children: ReactNode;
}

function RightSideBarProvider({ children }: RightSideBarProviderProps) {
  const [isRightSideBarOpen, setIsRightSideBarOpen] = useState<boolean>(false);

  return (
    <RightSideBarContext.Provider
      value={{ isRightSideBarOpen, setIsRightSideBarOpen }}
    >
      {children}
    </RightSideBarContext.Provider>
  );
}

function useRightSideBarContext() {
  const context = useContext(RightSideBarContext);
  if (!context) {
    throw new Error(
      "useRightSideBarContext must be used within a RightSideBarProvider"
    );
  }
  return context;
}

export { useRightSideBarContext };
export default RightSideBarProvider;
