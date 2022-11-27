import { Appearance } from "react-native";

export let primaryColor =
  Appearance.getColorScheme() == "light" ? "white" : "black";
export let labelColor =
  Appearance.getColorScheme() == "light" ? "black" : "white";
export let secondaryLabelColor =
  Appearance.getColorScheme() == "light" ? "darkgray" : "gray";
export let secondaryColor =
  Appearance.getColorScheme() == "light"
    ? "rgb(230, 230, 230)"
    : "rgb(30, 30, 30)";
