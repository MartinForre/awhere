import { createContext, Dispatch, useContext } from "react";
import { AppState, AppAction, createInitialState } from "./store";
import ApiClient from "./api/apiClient";

export interface IAppContext {
  state: AppState;
  dispatch: Dispatch<AppAction>;
  apiClient: ApiClient;
}

const AppContext = createContext<IAppContext>({
  state: createInitialState(),
  dispatch: action => {},
  apiClient: {} as ApiClient
});

export default AppContext;

export const useAppContext = () => useContext(AppContext);
