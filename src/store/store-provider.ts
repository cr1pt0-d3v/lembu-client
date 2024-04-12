import { createContext } from "react";
import { MainStore } from "./main-store";

export const StoreContext = createContext<MainStore>({} as MainStore);
export const StoreProvider = StoreContext.Provider;