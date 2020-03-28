import React from "react";
import { SafeAreaView, View, Text, Switch } from "react-native";
import styles from "./styles";
import InfectedRow from "./components/InfectedRow";
import RecoveredRow from "./components/RecoveredRow";
import AtRiskRow from "./components/AtRiskRow";
import { Ionicons } from "@expo/vector-icons";
import { useAppContext } from "../../appContext";

const MeTab = () => {
  const { state, dispatch } = useAppContext();

  const toggleNotifications = React.useCallback(() => {
    dispatch({ type: "toggle notifications" });
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.infoBubble}>
        <Ionicons
          name="ios-information-circle-outline"
          size={34}
          color="#666666"
        />
        <Text style={styles.infoBubbleText}>
          Info: We do not store any information about you. The only thing we
          store is if any infected people has been in the area
        </Text>
      </View>
      <View style={styles.row}>
        <Text style={{ marginTop: 20, fontSize: 20 }}>
          Everything is optional
        </Text>
      </View>
      <InfectedRow />
      <AtRiskRow />
      <View style={styles.notificationRow}>
        <Ionicons name="ios-notifications" size={16} color="#666666" />
        <Text style={styles.notificationRowText}>Turn on notifications</Text>
        <Switch
          value={state.me.isNotificationsOn}
          onValueChange={toggleNotifications}
          trackColor={{ false: "#9A00FF", true: "#9A00FF" }}
        />
      </View>
    </SafeAreaView>
  );
};

export default MeTab;
