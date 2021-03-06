import { Region, MapTypes } from "react-native-maps";
import * as Location from "expo-location";
import RiskRegistration from "./models/riskRegistration";

export type Infected = "yes" | "no" | "maybe" | null;
export type Recovered = "yes" | "no" | "maybe" | null;
export type AtRisk = "yes" | "no" | "maybe" | null;

export type MyState = {
  infected: Infected;
  recovered: Recovered;
  atRisk: AtRisk;
  hasBeenTouched?: boolean;
  isNotificationsOn: boolean;
  mapType: MapTypes;
};

export type MapState = {
  region: Region | null;
  location: Location.LocationData | null;
  registrations: RiskRegistration[];
};

export type AppState = {
  me: MyState;
  map: MapState;
};

export type AppAction =
  | { type: "set is infected"; infected: Infected }
  | { type: "set has recovered"; recovered: Recovered }
  | { type: "set at risk"; atRisk: AtRisk }
  | { type: "toggle notifications" }
  | { type: "set map type"; mapType: MapTypes }
  | { type: "reset me"; me: MyState }
  | { type: "set region"; region: Region }
  | { type: "set location"; location: Location.LocationData }
  | { type: "set registrations"; registrations: RiskRegistration[] }
  | { type: "dev reset" };

export const createInitialState = (): AppState => ({
  me: {
    infected: null,
    recovered: null,
    atRisk: null,
    isNotificationsOn: false,
    mapType: "hybrid"
  },
  map: {
    region: null,
    location: null,
    registrations: []
  }
});

const appReducer = (state: AppState, action: AppAction): AppState => {
  switch (action.type) {
    case "set has recovered":
      return {
        ...state,
        me: {
          ...state.me,
          recovered:
            action.recovered === state.me.recovered ? null : action.recovered,
          hasBeenTouched: true
        }
      };

    case "set is infected":
      return {
        ...state,
        me: {
          ...state.me,
          infected:
            action.infected === state.me.infected ? null : action.infected,
          hasBeenTouched: true
        }
      };

    case "set at risk":
      return {
        ...state,
        me: {
          ...state.me,
          atRisk: action.atRisk === state.me.atRisk ? null : action.atRisk,
          hasBeenTouched: true
        }
      };

    case "set map type":
      return {
        ...state,
        me: { ...state.me, mapType: action.mapType }
      };

    case "toggle notifications":
      return {
        ...state,
        me: { ...state.me, isNotificationsOn: !state.me.isNotificationsOn }
      };

    case "reset me":
      return { ...state, me: { ...action.me } };

    case "set region":
      return { ...state, map: { ...state.map, region: action.region } };

    case "set location":
      return { ...state, map: { ...state.map, location: action.location } };

    case "set registrations":
      return {
        ...state,
        map: { ...state.map, registrations: action.registrations }
      };

    case "dev reset":
      return createInitialState();
  }
};

export default appReducer;
