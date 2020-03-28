import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff"
  },
  section: {
    backgroundColor: "#F4E4FF",
    borderRadius: 10,
    margin: 20,
    marginBottom: 10,
    shadowColor: "#9A00FF",
    shadowRadius: 20,
    shadowOpacity: 0.15
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
    marginTop: 20,
    color: "#6400A8"
  },

  infoBubble: {
    margin: 20,
    marginTop: 10,
    marginBottom: 10,
    backgroundColor: "#efefef",
    borderRadius: 10,
    padding: 10,
    flexDirection: "row",
    alignItems: "center"
  },

  infoBubbleText: {
    marginLeft: 10,
    marginRight: 40
  },

  notificationRow: {
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "center",
    margin: 20,
    marginTop: 10,
    marginBottom: 0
  },

  notificationRowText: {
    marginRight: 10,
    marginLeft: 5
  }
});

export default styles;
