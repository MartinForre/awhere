import { Region } from "react-native-maps";

export type Infected = "yes" | "no" | "maybe" | null;
export type Recovered = "yes" | "no" | "maybe" | null;
export type AtRisk = "yes" | "no" | "maybe" | null;

export type MyState = {
  infected: Infected;
  recovered: Recovered;
  atRisk: AtRisk;
  hasBeenTouched?: boolean;
};

export type MapState = {
  region: Region | null;
};

export type AppState = {
  me: MyState;
  map: MapState;
};

export type AppAction =
  | { type: "set is infected"; infected: Infected }
  | { type: "set has recovered"; recovered: Recovered }
  | { type: "set at risk"; atRisk: AtRisk }
  | { type: "reset me"; me: MyState }
  | { type: "dev reset" }
  | { type: "set region"; region: Region };

export const createInitialState = (): AppState => ({
  me: {
    infected: null,
    recovered: null,
    atRisk: null
  },
  map: {
    region: null
  }
});

const appReducer = (state: AppState, action: AppAction): AppState => {
  switch (action.type) {
    case "set has recovered":
      return {
        ...state,
        me: { ...state.me, recovered: action.recovered, hasBeenTouched: true }
      };

    case "set is infected":
      return {
        ...state,
        me: { ...state.me, infected: action.infected, hasBeenTouched: true }
      };

    case "set at risk":
      return {
        ...state,
        me: { ...state.me, atRisk: action.atRisk, hasBeenTouched: true }
      };

    case "reset me":
      return { ...state, me: { ...action.me } };

    case "set region":
      return { ...state, map: { region: action.region } };

    case "dev reset":
      return createInitialState();
  }
};

export default appReducer;