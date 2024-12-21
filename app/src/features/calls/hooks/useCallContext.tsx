import { useContext } from "react";
import { CallContext } from "../context/CallContext";
import { CallContextType } from "types/calls";

export const useCallContext = (): CallContextType => {
  const context = useContext(CallContext);
  if (!context) {
    throw new Error("useCallContext must be used within a CallProvider");
  }
  return context;
};
