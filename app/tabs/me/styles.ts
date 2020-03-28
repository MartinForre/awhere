import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff"
  },
  row: {
    display: "flex",
    flexDirection: "row",
    marginLeft: 20,
    marginRight: 20,
    marginBottom: 20
  },
  button: {
    flexGrow: 1,
    justifyContent: "center",
    alignItems: "center",
    height: 44,
    borderRadius: 4
  },
  activeButton: {
    backgroundColor: "#9A00FF"
  },
  activeText: {
    color: "#FFFFFF"
  },
  rowTitle: {
    fontSize: 24,
    marginTop: 40
  }
});

export default styles;
