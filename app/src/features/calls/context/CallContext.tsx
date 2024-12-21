import { createContext } from "react";
import { CallContextType } from "types/calls";

export const CallContext = createContext<CallContextType | undefined>(
  undefined
);
