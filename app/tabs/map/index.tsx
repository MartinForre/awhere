import React from "react";
import { Platform, StyleSheet, Text, View, Dimensions } from "react-native";
import MapView, { Region, EventUserLocation } from "react-native-maps";
import Constants from "expo-constants";
import * as Location from "expo-location";
import * as Permissions from "expo-permissions";
import { useAppContext } from "../../appContext";

export default function App() {
  const { state, dispatch } = useAppContext();

  const [location, setLocation] = React.useState<Location.LocationData | null>(
    null
  );
  const [region, setRegion] = React.useState<Region | null>(null);

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
    setLocation(currentLocation);
  };

  React.useEffect(() => {
    getLocationAsync();
  }, []);

  const initialRegion = React.useMemo<Region>(
    () => ({
      latitude: location?.coords.latitude,
      latitudeDelta: 0.0421,
      longitude: location?.coords.longitude,
      longitudeDelta: 0.0922
    }),
    [location]
  );

  const handleUserLocationChange = React.useCallback((e: EventUserLocation) => {
    setLocation({ coords: e.nativeEvent.coordinate, timestamp: +new Date() });
  }, []);

  const handleRegionChange = React.useCallback((region: Region) => {
    setRegion(region);
    dispatch({ type: "set region", region });
  }, []);

  return (
    <View style={styles.container}>
      {location && (
        <MapView
          style={styles.mapStyle}
          initialRegion={state.map.region || initialRegion}
          onRegionChange={handleRegionChange}
          onUserLocationChange={handleUserLocationChange}
          showsUserLocation
          showsCompass
          showsScale
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
