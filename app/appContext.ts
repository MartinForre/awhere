import { createContext, Dispatch, useContext } from "react";
import { AppState, AppAction, createInitialState } from "./store";

export interface IAppContext {
  state: AppState;
  dispatch: Dispatch<AppAction>;
}

const AppContext = createContext<IAppContext>({
  state: createInitialState(),
  dispatch: action => {}
});

export default AppContext;

export const useAppContext = () => useContext(AppContext);
