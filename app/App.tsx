import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import appReducer, { createInitialState } from "./store";
import { Ionicons } from "@expo/vector-icons";
import MapTab from "./tabs/map";
import MeTab from "./tabs/me";
import AppContext from "./appContext";
import usePersistedMe from "./hooks/usePersistedMe";
import { View } from "react-native";

const Tab = createBottomTabNavigator();

const MapIcon = ({ focused, color, size }) => {
  return <Ionicons name="ios-map" size={size} color={color} />;
};

const MeIcon = ({ focused, color, size }) => {
  return <Ionicons name="ios-person" size={size} color={color} />;
};

export default function App() {
  const [appState, dispatchAppAction] = React.useReducer(
    appReducer,
    createInitialState()
  );

  const isFetchingPersistedMe = usePersistedMe(appState.me, dispatchAppAction);

  if (isFetchingPersistedMe) {
    return <View style={{ flex: 1 }} />;
  }

  return (
    <AppContext.Provider
      value={{ state: appState, dispatch: dispatchAppAction }}
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
