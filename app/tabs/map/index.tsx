import React from "react";
import { Platform, StyleSheet, Text, View, Dimensions } from "react-native";
import MapView, { Region, EventUserLocation } from "react-native-maps";
import Constants from "expo-constants";
import * as Location from "expo-location";
import * as Permissions from "expo-permissions";
import { useAppContext } from "../../appContext";

export default function App() {
  const { state, dispatch } = useAppContext();

  const getLocationAsync = async () => {
    if (Platform.OS === "android" && !Constants.isDevice) {
      console.log("No location");
      return;
    }

    const { status } = await Permissions.askAsync(Permissions.LOCATION);

    if (status !== "granted") {
      console.log("NOT GRANTED");
      return;
    }

    const currentLocation = await Location.getCurrentPositionAsync({});
    dispatch({ type: "set location", location: currentLocation });
  };

  React.useEffect(() => {
    getLocationAsync();
  }, []);

  const initialRegion = React.useMemo<Region>(
    () => ({
      latitude: state.map.location?.coords.latitude,
      latitudeDelta: 0.0421,
      longitude: state.map.location?.coords.longitude,
      longitudeDelta: 0.0922
    }),
    [state.map.location]
  );

  const handleUserLocationChange = React.useCallback((e: EventUserLocation) => {
    dispatch({
      type: "set location",
      location: { coords: e.nativeEvent.coordinate, timestamp: +new Date() }
    });
  }, []);

  const handleRegionChange = React.useCallback((region: Region) => {
    dispatch({ type: "set region", region });
  }, []);

  return (
    <View style={styles.container}>
      {state.map.location && (
        <MapView
          style={styles.mapStyle}
          mapType="hybrid"
          initialRegion={state.map.region || initialRegion}
          onRegionChange={handleRegionChange}
          onUserLocationChange={handleUserLocationChange}
          showsUserLocation
          showsCompass
          showsScale
          showsMyLocationButton
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center"
  },
  mapStyle: {
    ...StyleSheet.absoluteFillObject
  }
});
