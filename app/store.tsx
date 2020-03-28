export type Infected = "yes" | "no" | "maybe" | null;
export type Recovered = "yes" | "no" | "maybe" | null;
export type AtRisk = "yes" | "no" | "maybe" | null;

export type MyState = {
  infected: Infected;
  recovered: Recovered;
  atRisk: AtRisk;
  hasBeenTouched?: boolean;
};

export type AppState = {
  me: MyState;
};

export type AppAction =
  | { type: "set is infected"; infected: Infected }
  | { type: "set has recovered"; recovered: Recovered }
  | { type: "set at risk"; atRisk: AtRisk }
  | { type: "reset me"; me: MyState }
  | { type: "dev reset" };

export const createInitialState = (): AppState => ({
  me: {
    infected: null,
    recovered: null,
    atRisk: null
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

    case "dev reset":
      return createInitialState();
  }
};

export default appReducer;
