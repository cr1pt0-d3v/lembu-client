import { useContext } from "react";
import { MainStore } from "./main-store";
import { StoreContext } from "./store-provider";

export const useStore = ():MainStore => useContext(StoreContext);