import React from "react";
import {
  Platform,
  StyleSheet,
  Text,
  View,
  Dimensions,
  TouchableHighlight,
  Animated,
  Easing
} from "react-native";
import MapView, { Region, EventUserLocation, Circle } from "react-native-maps";
import Constants from "expo-constants";
import * as Location from "expo-location";
import * as Permissions from "expo-permissions";
import { useAppContext } from "../../appContext";
import useRiskRegistrations from "../../hooks/useRiskRegistrations";
import useRiskRegistrationCircles from "./useRiskRegistrationCircles";

const MapTab = props => {
  console.log(props.navigation.isFocused());
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

  const riskRegistrations = useRiskRegistrations();

  const riskRegistrationCircles = useRiskRegistrationCircles(
    state,
    riskRegistrations
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

  const setHybridMapType = React.useCallback(
    () => dispatch({ type: "set map type", mapType: "hybrid" }),
    []
  );
  const setSatelliteMapType = React.useCallback(
    () => dispatch({ type: "set map type", mapType: "satellite" }),
    []
  );
  const setStandardMapType = React.useCallback(
    () => dispatch({ type: "set map type", mapType: "standard" }),
    []
  );

  const [toolbarAnimation] = React.useState(new Animated.Value(-40));
  React.useEffect(() => {
    Animated.timing(toolbarAnimation, {
      toValue: 20,
      easing: Easing.elastic(3),
      duration: 800
    }).start();
  }, []);

  return (
    <View style={styles.container}>
      {state.map.location && (
        <MapView
          style={styles.mapStyle}
          mapType={state.me.mapType}
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
          {riskRegistrationCircles.map(registration => (
            <Circle
              key={
                registration.riskArea.latitude.toString() +
                registration.riskArea.longitude.toString()
              }
              center={registration.riskArea}
              radius={Math.min(circleRadius * registration.radius, 5000)}
              fillColor={`rgba(255, 77, 138, ${Math.min(
                registration.severity / 3,
                0.8
              )})`}
              strokeColor="rgba(255, 77, 138, 1)"
            />
          ))}
        </MapView>
      )}
      <Animated.View
        style={{ ...styles.mapToolbarOverlay, bottom: toolbarAnimation }}
      >
        <TouchableHighlight
          onPress={setHybridMapType}
          underlayColor={styles.mapTypeButtonActive.backgroundColor}
          activeOpacity={0.4}
          style={[
            styles.mapTypeButton,
            state.me.mapType === "hybrid" && styles.mapTypeButtonActive
          ]}
        >
          <Text
            style={
              state.me.mapType === "hybrid" && styles.mapTypeButtonActiveText
            }
          >
            Hybrid
          </Text>
        </TouchableHighlight>
        <TouchableHighlight
          onPress={setSatelliteMapType}
          underlayColor={styles.mapTypeButtonActive.backgroundColor}
          activeOpacity={0.4}
          style={[
            styles.mapTypeButton,
            state.me.mapType === "satellite" && styles.mapTypeButtonActive
          ]}
        >
          <Text
            style={
              state.me.mapType === "satellite" && styles.mapTypeButtonActiveText
            }
          >
            Satellite
          </Text>
        </TouchableHighlight>
        <TouchableHighlight
          onPress={setStandardMapType}
          underlayColor={styles.mapTypeButtonActive.backgroundColor}
          activeOpacity={0.4}
          style={[
            styles.mapTypeButton,
            state.me.mapType === "standard" && styles.mapTypeButtonActive
          ]}
        >
          <Text
            style={
              state.me.mapType === "standard" && styles.mapTypeButtonActiveText
            }
          >
            Standard
          </Text>
        </TouchableHighlight>
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center"
  },
  mapStyle: {
    ...StyleSheet.absoluteFillObject
  },
  mapToolbarOverlay: {
    position: "absolute",
    zIndex: 2,
    backgroundColor: "#F4E4FF",
    borderRadius: 40,
    height: 40,
    flexDirection: "row",
    shadowColor: "#9A00FF",
    shadowRadius: 20,
    shadowOpacity: 0.15
  },

  mapTypeButton: {
    padding: 20,
    paddingTop: 0,
    paddingBottom: 0,
    justifyContent: "center",
    borderRadius: 40,
    margin: 1
  },

  mapTypeButtonActive: {
    backgroundColor: "#9A00FF"
  },

  mapTypeButtonActiveText: {
    color: "#FFFFFF"
  }
});

export default MapTab;
