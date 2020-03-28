import React from "react";
import { Text, TouchableHighlight } from "react-native";
import styles from "../styles";

type ToggleButtonProps = {
  isActive: boolean;
  text: string;
  onPress: () => void;
};

const ToggleButton: React.FC<ToggleButtonProps> = ({
  isActive,
  text,
  onPress
}) => (
  <TouchableHighlight
    style={[styles.button, isActive && styles.activeButton]}
    onPress={onPress}
    underlayColor={styles.activeButton.backgroundColor}
    activeOpacity={0.4}
  >
    <Text style={isActive && styles.activeText}>{text}</Text>
  </TouchableHighlight>
);

export default ToggleButton;
