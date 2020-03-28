import React from "react";
import * as TaskManager from "expo-task-manager";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import appReducer, { createInitialState } from "./store";
import { Ionicons } from "@expo/vector-icons";
import MapTab from "./tabs/map";
import MeTab from "./tabs/me";
import AppContext from "./appContext";
import usePersistedMe from "./hooks/usePersistedMe";
import { View } from "react-native";
import ApiClient from "./api/apiClient";
import Resources from "./api/resources";
import * as Location from "expo-location";
import useLocationPinger from "./hooks/useLocationPinger";

const Tab = createBottomTabNavigator();

const MapIcon = ({ color, size }) => {
  return <Ionicons name="ios-map" size={size} color={color} />;
};

const MeIcon = ({ color, size }) => {
  return <Ionicons name="ios-person" size={size} color={color} />;
};

// const LOCATION_UPDATE = "LOCATION_UPDATE";
// TaskManager.defineTask(LOCATION_UPDATE, ({ data, error }) => {
//   if (error) {
//     // check `error.message` for more details.
//     return;
//   }

//   const locations = (data as any).locations as Location.LocationData[];
//   console.log("Received new locations", locations);
// });

// Location.startLocationUpdatesAsync(LOCATION_UPDATE, {
//   accuracy: Location.Accuracy.Balanced
// });

export default function App() {
  const [appState, dispatchAppAction] = React.useReducer(
    appReducer,
    createInitialState()
  );

  const isFetchingPersistedMe = usePersistedMe(appState.me, dispatchAppAction);

  const apiClient = new ApiClient(new Resources());

  useLocationPinger(appState, apiClient);

  if (isFetchingPersistedMe) {
    return <View style={{ flex: 1 }} />;
  }

  return (
    <AppContext.Provider
      value={{ apiClient, state: appState, dispatch: dispatchAppAction }}
    >
      <NavigationContainer>
        <Tab.Navigator
          initialRouteName={appState.me.hasBeenTouched ? "map" : "me"}
          tabBarOptions={{
            activeTintColor: "#9A00FF"
          }}
        >
          <Tab.Screen
            name="Map"
            component={MapTab}
            options={{ tabBarIcon: MapIcon }}
          />
          <Tab.Screen
            name="Me"
            component={MeTab}
            options={{ tabBarIcon: MeIcon }}
          />
        </Tab.Navigator>
      </NavigationContainer>
    </AppContext.Provider>
  );
}
