import React from "react";
import { useAppContext } from "../../../appContext";
import styles from "../styles";
import { View, Text } from "react-native";
import ToggleButton from "./ToggleButton";

const AtRiskRow = () => {
  const { state, dispatch } = useAppContext();

  const onYesPress = React.useCallback(
    () => dispatch({ type: "set at risk", atRisk: "yes" }),
    []
  );
  const onNoPress = React.useCallback(
    () => dispatch({ type: "set at risk", atRisk: "no" }),
    []
  );
  const onMaybePress = React.useCallback(
    () => dispatch({ type: "set at risk", atRisk: "maybe" }),
    []
  );

  return (
    <View style={styles.section}>
      <View style={styles.row}>
        <Text style={styles.rowTitle}>I'm at risk</Text>
      </View>
      <View style={styles.row}>
        <ToggleButton
          isActive={state.me.atRisk === "yes"}
          onPress={onYesPress}
          text="Yes"
        />
        <ToggleButton
          isActive={state.me.atRisk === "no"}
          onPress={onNoPress}
          text="No"
        />
        <ToggleButton
          isActive={state.me.atRisk === "maybe"}
          onPress={onMaybePress}
          text="Maybe"
        />
      </View>
    </View>
  );
};

export default AtRiskRow;
