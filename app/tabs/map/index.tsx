import React from "react";
import { Platform, StyleSheet, Text, View, Dimensions } from "react-native";
import MapView, { Region, EventUserLocation, Circle } from "react-native-maps";
import Constants from "expo-constants";
import * as Location from "expo-location";
import * as Permissions from "expo-permissions";
import { useAppContext } from "../../appContext";
import RiskRegistration from "../../models/riskRegistration";

const getRandomDistance = () => {
  const distance = Math.random() * 0.1;
  const random = Math.random();
  return random > 0.5 ? random * (distance * -1) : random * distance;
};

const createRandomRegistration = (
  currentLocation?: Location.LocationData
): RiskRegistration => ({
  severity: Math.random() * 3,
  riskArea: {
    latitude: currentLocation.coords.latitude + getRandomDistance(),
    longitude: currentLocation.coords.longitude + getRandomDistance()
  }
});

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

  const tempRegistrations = React.useMemo(
    () =>
      state.map.location
        ? [
            createRandomRegistration(state.map.location),
            createRandomRegistration(state.map.location),
            createRandomRegistration(state.map.location),
            createRandomRegistration(state.map.location),
            createRandomRegistration(state.map.location),
            createRandomRegistration(state.map.location),
            createRandomRegistration(state.map.location),
            createRandomRegistration(state.map.location),
            createRandomRegistration(state.map.location),
            createRandomRegistration(state.map.location),
            createRandomRegistration(state.map.location),
            createRandomRegistration(state.map.location),
            createRandomRegistration(state.map.location),
            createRandomRegistration(state.map.location),
            createRandomRegistration(state.map.location),
            createRandomRegistration(state.map.location),
            createRandomRegistration(state.map.location),
            createRandomRegistration(state.map.location),
            createRandomRegistration(state.map.location),
            createRandomRegistration(state.map.location),
            createRandomRegistration(state.map.location),
            createRandomRegistration(state.map.location),
            createRandomRegistration(state.map.location),
            createRandomRegistration(state.map.location),
            createRandomRegistration(state.map.location),
            createRandomRegistration(state.map.location),
            createRandomRegistration(state.map.location),
            createRandomRegistration(state.map.location),
            createRandomRegistration(state.map.location),
            createRandomRegistration(state.map.location),
            createRandomRegistration(state.map.location),
            createRandomRegistration(state.map.location),
            createRandomRegistration(state.map.location),
            createRandomRegistration(state.map.location),
            createRandomRegistration(state.map.location),
            createRandomRegistration(state.map.location),
            createRandomRegistration(state.map.location),
            createRandomRegistration(state.map.location),
            createRandomRegistration(state.map.location),
            createRandomRegistration(state.map.location),
            createRandomRegistration(state.map.location),
            createRandomRegistration(state.map.location),
            createRandomRegistration(state.map.location),
            createRandomRegistration(state.map.location),
            createRandomRegistration(state.map.location),
            createRandomRegistration(state.map.location),
            createRandomRegistration(state.map.location),
            createRandomRegistration(state.map.location),
            createRandomRegistration(state.map.location),
            createRandomRegistration(state.map.location),
            createRandomRegistration(state.map.location),
            createRandomRegistration(state.map.location),
            createRandomRegistration(state.map.location),
            createRandomRegistration(state.map.location),
            createRandomRegistration(state.map.location),
            createRandomRegistration(state.map.location),
            createRandomRegistration(state.map.location),
            createRandomRegistration(state.map.location),
            createRandomRegistration(state.map.location),
            createRandomRegistration(state.map.location),
            createRandomRegistration(state.map.location),
            createRandomRegistration(state.map.location),
            createRandomRegistration(state.map.location),
            createRandomRegistration(state.map.location),
            createRandomRegistration(state.map.location),
            createRandomRegistration(state.map.location),
            createRandomRegistration(state.map.location),
            createRandomRegistration(state.map.location),
            createRandomRegistration(state.map.location),
            createRandomRegistration(state.map.location),
            createRandomRegistration(state.map.location),
            createRandomRegistration(state.map.location),
            createRandomRegistration(state.map.location),
            createRandomRegistration(state.map.location),
            createRandomRegistration(state.map.location),
            createRandomRegistration(state.map.location),
            createRandomRegistration(state.map.location),
            createRandomRegistration(state.map.location),
            createRandomRegistration(state.map.location),
            createRandomRegistration(state.map.location),
            createRandomRegistration(state.map.location),
            createRandomRegistration(state.map.location),
            createRandomRegistration(state.map.location),
            createRandomRegistration(state.map.location),
            createRandomRegistration(state.map.location)
          ]
        : [],
    [state.map.location]
  );

  const circleRadius = React.useMemo(() => {
    return (
      800 *
      Math.max(
        state.map.region?.latitudeDelta || 0,
        state.map.region?.longitudeDelta || 0
      )
    );
  }, [state.map.region?.latitudeDelta, state.map.region?.longitudeDelta]);

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
          showsBuildings
          showsTraffic
          showsPointsOfInterest
        >
          {tempRegistrations.map(registration => (
            <Circle
              key={
                registration.riskArea.latitude.toString() +
                registration.riskArea.longitude.toString()
              }
              center={registration.riskArea}
              radius={circleRadius}
              fillColor={`rgba(255, 0, 0, ${registration.severity / 3})`}
              strokeColor="rgba(255, 0, 0, 1)"
            />
          ))}
        </MapView>
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
