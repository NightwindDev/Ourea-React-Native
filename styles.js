import { StyleSheet, Appearance } from "react-native";

let primaryColor = Appearance.getColorScheme() == "light" ? "white" : "black";
let labelColor = Appearance.getColorScheme() == "light" ? "black" : "white";
let secondaryColor =
  Appearance.getColorScheme() == "light"
    ? "rgb(230, 230, 230)"
    : "rgb(30, 30, 30)";

const styles = StyleSheet.create({
  mainBackground: {
    backgroundColor: primaryColor,
    paddingTop: 40,
  },
  title: {
    width: "100%",
    fontSize: 60,
    fontWeight: "bold",
    color: labelColor,
  },
  subtitle: {
    width: "100%",
    fontSize: "20",
    textAlign: "left",
    color: labelColor,
  },
  topBar: {
    width: "100%",
    padding: "5% 0%",
    paddingTop: 0,
    backgroundColor: primaryColor,
  },
  carouselView: {
    width: 350,
    // height: 75,
    backgroundColor: secondaryColor,
    padding: 20,
    borderRadius: "10",
    flex: 1,
    justifyContent: "flex-start",
    flexDirection: "row",
    marginRight: 20,
  },
  carouselViewTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: labelColor,
  },
  carouselViewDescription: {
    color: labelColor,
  },
  carouselViewAuthor: {
    paddingTop: 10,
    color: labelColor,
  },
  carouselViewIcon: {
    height: 80,
    width: 80,
    marginLeft: 0,
    borderRadius: 5,
  },
  carouselViewContent: {
    // alignSelf: "flex-end",
    justifyContent: "center",
    marginLeft: 20,
    width: 220,
  },
  carouselScrollView: {
    marginHorizontal: 10,
  },
  mainContent: {
    backgroundColor: primaryColor,
  },
  carouselWrapper: {
    paddingLeft: 20,
    marginBottom: 10,
  },
  inputStyle: {
    backgroundColor: secondaryColor,
  },
  searchBar: {
    backgroundColor: "rgba(0, 0, 0, 0)",
    padding: 12,
  },
  shortcutCell: {
    backgroundColor: secondaryColor,
    flexDirection: "row",
    alignItems: "center",
    padding: 15,
    marginTop: 10,
    marginLeft: 20,
    marginRight: 20,
    marginBottom: 10,
    borderRadius: 10,
  },
  shortcutCellIcon: {
    width: 50,
    height: 50,
    marginRight: 15,
    borderRadius: 5,
  },
  shortcutCellTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: labelColor,
  },
  allShortcutsButton: {
    backgroundColor: secondaryColor,
    width: -10,
    margin: 20,
    padding: 10,
    borderRadius: 10,
    flexDirection: "row",
    alignItems: "center",
  },
  allShortcutsButtonText: {
    fontSize: 18,
    color: labelColor,
  },
  shortcutCellDescription: {
    color: labelColor,
  },
  allShortcutsIcon: {
    width: 30,
    height: 30,
    marginRight: 5,
  },
  shortcutCellContent: {
    width: "80%",
  },
});
export default styles;
