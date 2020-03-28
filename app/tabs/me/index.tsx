import React from "react";
import { SafeAreaView, Button, View, Text } from "react-native";
import styles from "./styles";
import InfectedRow from "./components/InfectedRow";
import RecoveredRow from "./components/RecoveredRow";
import AtRiskRow from "./components/AtRiskRow";
import { useAppContext } from "../../appContext";

export default function App() {
  const { dispatch } = useAppContext();

  return (
    <SafeAreaView style={styles.container}>
      <View style={{ alignItems: "flex-start", margin: 20 }}>
        <Text>
          Info: We do not store any information about you. The only thing we
          store is if any infected people has been in the area
        </Text>
        <Text style={{ marginTop: 20, fontSize: 20 }}>
          All fields below are optional
        </Text>
      </View>
      <InfectedRow />
      <AtRiskRow />
      <RecoveredRow />
      <Button
        onPress={() => dispatch({ type: "dev reset" })}
        title="RESET STORE"
      />
    </SafeAreaView>
  );
}
