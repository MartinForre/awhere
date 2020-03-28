import React from "react";
import { useAppContext } from "../../../appContext";
import styles from "../styles";
import { View, Text } from "react-native";
import ToggleButton from "./ToggleButton";

const InfectedRow = () => {
  const { state, dispatch } = useAppContext();

  const onYesPress = React.useCallback(
    () => dispatch({ type: "set is infected", infected: "yes" }),
    []
  );
  const onNoPress = React.useCallback(
    () => dispatch({ type: "set is infected", infected: "no" }),
    []
  );
  const onMaybePress = React.useCallback(
    () => dispatch({ type: "set is infected", infected: "maybe" }),
    []
  );

  return (
    <>
      <View style={styles.row}>
        <Text style={styles.rowTitle}>I'm infected</Text>
      </View>
      <View style={styles.row}>
        <ToggleButton
          isActive={state.me.infected === "yes"}
          onPress={onYesPress}
          text="Yes"
        />
        <ToggleButton
          isActive={state.me.infected === "no"}
          onPress={onNoPress}
          text="No"
        />
        <ToggleButton
          isActive={state.me.infected === "maybe"}
          onPress={onMaybePress}
          text="Maybe"
        />
      </View>
    </>
  );
};

export default InfectedRow;
