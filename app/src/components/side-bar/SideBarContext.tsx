import { createContext, useContext } from "react";

type SidebarType = "left" | "right";

export const SidebarContext = createContext<SidebarType | undefined>(undefined);

export const useSidebarType = () => {
  const context = useContext(SidebarContext);
  if (!context) {
    throw new Error("useSidebarType must be used within a SidebarProvider");
  }
  return context;
};
