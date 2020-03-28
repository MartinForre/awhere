import React from "react";
import { useAppContext } from "../../../appContext";
import styles from "../styles";
import { View, Text } from "react-native";
import ToggleButton from "./ToggleButton";

const RecoveredRow = () => {
  const { state, dispatch } = useAppContext();

  const onYesPress = React.useCallback(
    () => dispatch({ type: "set has recovered", recovered: "yes" }),
    []
  );
  const onNoPress = React.useCallback(
    () => dispatch({ type: "set has recovered", recovered: "no" }),
    []
  );
  const onMaybePress = React.useCallback(
    () => dispatch({ type: "set has recovered", recovered: "maybe" }),
    []
  );

  return (
    <>
      <View style={styles.row}>
        <Text style={styles.rowTitle}>I have recovered</Text>
      </View>
      <View style={styles.row}>
        <ToggleButton
          isActive={state.me.recovered === "yes"}
          onPress={onYesPress}
          text="Yes"
        />
        <ToggleButton
          isActive={state.me.recovered === "no"}
          onPress={onNoPress}
          text="No"
        />
        <ToggleButton
          isActive={state.me.recovered === "maybe"}
          onPress={onMaybePress}
          text="Maybe"
        />
      </View>
    </>
  );
};

export default RecoveredRow;
