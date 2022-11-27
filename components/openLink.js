import { ActionSheetIOS, Appearance } from "react-native";
import * as Linking from "expo-linking";

const openLink = (downloadURLS) => {
  let urls = [];

  for (const url in downloadURLS) {
    urls.push(url);
  }

  downloadURLS["Cancel"] = " ";

  urls.push("Cancel");

  ActionSheetIOS.showActionSheetWithOptions(
    {
      title: "Select which version to install:",
      options: urls,
      cancelButtonIndex: urls.length - 1,
      userInterfaceStyle: Appearance.getColorScheme(),
    },
    (buttonIndex) => {
      for (const url of urls) {
        if (buttonIndex == urls.indexOf(url)) {
          Linking.openURL(downloadURLS[url])
            .then(() => null)
            .catch(() => null);
        }
      }
    }
  );
};

export default openLink;
