import React, { useEffect } from "react";
import {
  Text,
  View,
  Appearance,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
  StatusBar,
  ActionSheetIOS,
} from "react-native";

import { SafeAreaView } from "react-native-safe-area-context";
import { SearchBar } from "react-native-elements";
import { WebView } from "react-native-webview";
import { useKeyboard } from "@react-native-community/hooks";
import Modal from "react-native-modal";

import ShortcutModal from "./components/ShortcutModal";
import openLink from "./components/openLink";
import ModalCloseButton from "./components/ModalCloseButton";
import Screenshot from "./components/Screenshot";

import {
  primaryColor,
  labelColor,
  secondaryColor,
  secondaryLabelColor,
} from "./components/Colors";

let shortcuts = [];
let featured = [];

const fetchData = async () => {
  const allResp = await fetch(
    "https://raw.githubusercontent.com/NightwindDev/Ourea-Global-Repo/main/globalrepo.json"
  );
  const allData = await allResp.json();
  shortcuts = allData;

  const featResp = await fetch(
    "https://raw.githubusercontent.com/NightwindDev/Ourea-Global-Repo/main/featured.json"
  );
  const featData = await featResp.json();

  featured = featData;
};

fetchData();

const appearance = Appearance.getColorScheme();

const styles = StyleSheet.create({
  mainBackground: {
    backgroundColor: primaryColor,
    paddingTop: 40,
  },
  title: {
    width: "100%",
    fontSize: 45,
    fontWeight: "bold",
    color: labelColor,
  },
  subtitle: {
    width: "100%",
    fontSize: 16,
    textAlign: "left",
    paddingLeft: 3,
    fontWeight: "bold",
    color: secondaryLabelColor,
  },
  topBar: {
    width: "100%",
    padding: "5% 0%",
    paddingTop: 10,
    backgroundColor: primaryColor,
  },
  carouselView: {
    width: 350,
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
    color: secondaryLabelColor,
  },
  carouselViewAuthor: {
    paddingTop: 10,
    color: secondaryLabelColor,
  },
  carouselViewIcon: {
    height: 80,
    width: 80,
    marginLeft: 0,
    borderRadius: 5,
  },
  carouselViewContent: {
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
    marginBottom: 20,
  },
  inputStyle: {
    backgroundColor: secondaryColor,
    color: labelColor,
  },
  searchBar: {
    backgroundColor: "rgba(0, 0, 0, 0)",
    padding: 12,
    width: "93.5%",
  },
  shortcutCell: {
    backgroundColor: secondaryColor,
    flexDirection: "row",
    alignItems: "center",
    padding: 15,
    marginTop: 20,
    marginLeft: 20,
    marginRight: 20,
    marginBottom: -5,
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
    marginBottom: 5,
    marginTop: 6,
    marginRight: 20,
    marginLeft: 20,
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
    color: secondaryLabelColor,
  },
  allShortcutsIcon: {
    width: 30,
    height: 30,
    marginRight: 5,
  },
  shortcutCellContent: {
    width: "80%",
  },
  allShortcutsModal: {
    width: "100%",
    height: "30%",
    backgroundColor: primaryColor,
    margin: 0,
    justifyContent: "flex-start",
    paddingTop: 50,
    borderRadius: 15,
  },
  dropdown: {
    backgroundColor: secondaryColor,
    padding: 10,
    marginBottom: 0,
    width: 48,
    height: 48,
    borderRadius: 10,
    marginRight: -5,
    marginTop: 13,
    justifyContent: "center",
    alignItems: "center",
  },
  dropdownImage: {
    width: 25,
    height: 25,
  },
  searchWrapper: {
    flexDirection: "row",
    width: "100%",
    paddingLeft: 20,
    paddingRight: 20,
    marginTop: -2,
    marginBottom: -5,
  },
});

function CarouselView(props) {
  const [isShortcutModalVisible, setIsShortcutModalVisible] =
    React.useState(false);

  const handleShortcutModal = () => {
    setIsShortcutModalVisible(() => !isShortcutModalVisible);
  };

  let screenshotsArray = [];

  for (const screenshot of props.screenshots) {
    screenshotsArray.push(
      <Screenshot source={{ uri: screenshot }} screenshotURL={screenshot} />
    );
  }

  return (
    <TouchableOpacity
      style={styles.carouselView}
      activeOpacity={0.6}
      onPress={handleShortcutModal}
    >
      <Image source={{ uri: props.iconURL }} style={styles.carouselViewIcon} />
      <View style={styles.carouselViewContent}>
        <Text style={styles.carouselViewTitle}>{props.shortcutName}</Text>
        <Text style={styles.carouselViewDescription}>
          {props.shortcutDescription}
        </Text>
        <Text style={styles.carouselViewAuthor}>By {props.shortcutAuthor}</Text>
      </View>
      <ShortcutModal
        isVisible={isShortcutModalVisible}
        iconURL={props.iconURL}
        shortcutName={props.shortcutName}
        shortcutDescription={props.shortcutDescription}
        downloadOnPress={() => openLink(props.downloadURLS)}
        minVersion={props.minVersion}
        maxVersion={props.maxVersion}
        depictionURL={props.depictionURL}
        screenshots={screenshotsArray}
        whenPressed={handleShortcutModal}
      />
    </TouchableOpacity>
  );
}

function ShortcutCell(props) {
  const [isShortcutModalVisible, setIsShortcutModalVisible] =
    React.useState(false);

  const handleShortcutModal = () => {
    setIsShortcutModalVisible(() => !isShortcutModalVisible);
  };

  let screenshotsArray = [];

  for (const screenshot of props.screenshots) {
    screenshotsArray.push(
      <Screenshot source={{ uri: screenshot }} screenshotURL={screenshot} />
    );
  }

  return (
    <TouchableOpacity
      style={styles.shortcutCell}
      activeOpacity={0.6}
      onPress={handleShortcutModal}
    >
      <Image source={{ uri: props.iconURL }} style={styles.shortcutCellIcon} />
      <View style={styles.shortcutCellContent}>
        <Text style={styles.shortcutCellTitle}>{props.shortcutName}</Text>
        <Text style={styles.shortcutCellDescription}>
          {props.shortcutDescription}
        </Text>

        <ShortcutModal
          isVisible={isShortcutModalVisible}
          iconURL={props.iconURL}
          shortcutName={props.shortcutName}
          shortcutDescription={props.shortcutDescription}
          downloadOnPress={() => openLink(props.downloadURLS)}
          minVersion={props.minVersion}
          maxVersion={props.maxVersion}
          depictionURL={props.depictionURL}
          screenshots={screenshotsArray}
          whenPressed={handleShortcutModal}
        />
      </View>
    </TouchableOpacity>
  );
}

function HomeScreen() {
  const [search, setSearch] = React.useState(null);
  const [filterType, setFilterType] = React.useState("Name");

  const [isModalVisible, setIsModalVisible] = React.useState(false);

  const [data, setData] = React.useState([]);
  const [filteredData, setFilteredData] = React.useState([]);

  const scrollViewRef = React.useRef(null);
  const searchBarRef = React.useRef(null);

  const searchArray = [];
  const featuredArray = [];

  if (Appearance.getColorScheme() == "light")
    StatusBar.setBarStyle("dark-content", true);
  else StatusBar.setBarStyle("light-content", true);

  const searchPressed = () => {
    searchBarRef.current.measure((fx, fy, width, height, px, py) => {
      scrollViewRef.current.scrollTo({
        y: py + 44,
        animated: true,
      });
    });
  };

  const updateSearch = (text) => {
    setSearch(text);

    if (text.replace(/\s/g, "").length) {
      const newData = data.filter((item) => {
        let type = "";

        if (filterType == "Name") type = item.props.shortcutName;
        else if (filterType == "Author") type = item.props.shortcutAuthor;

        const itemData = type ? type.toUpperCase() : " ".toUpperCase();
        const textData = text.toUpperCase();
        return itemData.indexOf(textData) > -1;
      });
      setFilteredData(newData);
    } else setFilteredData(searchArray);
  };

  const cancelSearch = () => {
    setSearch("");
    setFilteredData(data);
  };

  const handleModal = () => setIsModalVisible(() => !isModalVisible);

  for (const shortcut of shortcuts) {
    const arr = shortcut.download_urls;
    let sorted = {};

    Object.keys(arr)
      .sort()
      .reverse(arr)
      .forEach(function (v, i) {
        sorted[v] = arr[v];
      });

    searchArray.push(
      <ShortcutCell
        iconURL={shortcut.icon_url}
        shortcutName={shortcut.name}
        shortcutDescription={shortcut.description}
        screenshots={shortcut.screenshots}
        downloadURLS={sorted}
        depictionURL={shortcut.depiction_url}
        minVersion={
          shortcut.min_version == undefined ? 0 : shortcut.min_version
        }
        maxVersion={
          shortcut.max_version == undefined ? 0 : shortcut.max_version
        }
        shortcutAuthor={shortcut.author}
      />
    );
  }

  useEffect(() => {
    setData(searchArray);
    scrollViewRef.current.scrollTo({
      y: 1,
      animated: true,
    });
  }, []);

  for (const featuredShortcut of featured) {
    const arr = featuredShortcut.download_urls;
    let sorted = {};

    Object.keys(arr)
      .sort()
      .reverse(arr)
      .forEach(function (v, i) {
        sorted[v] = arr[v];
      });

    featuredArray.push(
      <CarouselView
        shortcutName={featuredShortcut.name}
        shortcutDescription={featuredShortcut.description}
        shortcutAuthor={featuredShortcut.author}
        iconURL={featuredShortcut.icon_url}
        screenshots={featuredShortcut.screenshots}
        downloadURLS={sorted}
        depictionURL={featuredShortcut.depiction_url}
        minVersion={
          featuredShortcut.min_version == undefined
            ? 0
            : featuredShortcut.min_version
        }
        maxVersion={
          featuredShortcut.max_version == undefined
            ? 0
            : featuredShortcut.max_version
        }
      />
    );
  }

  const filterPressed = () => {
    ActionSheetIOS.showActionSheetWithOptions(
      {
        title: "Sort by:",
        options: ["Name", "Author", "Cancel"],
        cancelButtonIndex: 2,
        userInterfaceStyle: Appearance.getColorScheme(),
      },
      (buttonIndex) => {
        if (buttonIndex == 0) {
          setFilterType("Name");
        } else if (buttonIndex == 1) {
          setFilterType("Author");
        }
      }
    );
  };

  const keyboard = useKeyboard();

  return (
    <SafeAreaView style={styles.mainBackground}>
      <View style={styles.topBar}>
        <Text style={styles.title}>Ourea</Text>
        <Text style={styles.subtitle}>
          {new Date().toLocaleDateString("en-us", {
            month: "long",
            day: "numeric",
            year: "numeric",
          })}
        </Text>
      </View>
      <ScrollView
        style={styles.mainContent}
        contentContainerStyle={{ paddingBottom: 150, minHeight: "100%" }}
        keyboardShouldPersistTaps="handled"
        ref={scrollViewRef}
      >
        <View style={styles.carouselWrapper}>
          <ScrollView
            horizontal={true}
            styles={styles.carouselScrollView}
            showsHorizontalScrollIndicator={false}
          >
            {featuredArray}
          </ScrollView>
        </View>
        <TouchableOpacity
          style={styles.allShortcutsButton}
          activeOpacity={0.6}
          onPress={handleModal}
        >
          <Image
            style={styles.allShortcutsIcon}
            source={require("./assets/all-shortcuts.png")}
          />
          <Text style={styles.allShortcutsButtonText}>All Shortcuts</Text>
        </TouchableOpacity>
        <View style={styles.searchWrapper}>
          <TouchableOpacity
            onPress={filterPressed}
            style={styles.dropdown}
            activeOpacity={0.6}
          >
            <Image
              source={require("./assets/filter-icon.png")}
              style={styles.dropdownImage}
            />
          </TouchableOpacity>
          <SearchBar
            platform="ios"
            placeholder={"Search By " + filterType + "..."}
            onCancel={() => cancelSearch}
            onChangeText={updateSearch}
            onFocus={searchPressed}
            value={search}
            containerStyle={styles.searchBar}
            inputContainerStyle={styles.inputStyle}
            inputStyle={styles.inputStyle}
          />
        </View>
        <View
          style={{
            paddingBottom: keyboard.keyboardShown ? keyboard.keyboardHeight : 0,
          }}
          ref={searchBarRef}
        >
          {filteredData.length != 0 ? filteredData : data}
        </View>
      </ScrollView>
      <Modal isVisible={isModalVisible} style={styles.allShortcutsModal}>
        <View style={styles.topBar}>
          <Text style={styles.title}>All Shortcuts</Text>
          <Text style={styles.subtitle}>All available shortcuts</Text>
        </View>
        <ScrollView
          contentContainerStyle={{ paddingBottom: 100, minHeight: "100%" }}
        >
          {searchArray}
        </ScrollView>
        <ModalCloseButton whenPressed={handleModal} />
      </Modal>
      <WebView style={styles.webView} source={{ uri: "https://expo.dev" }} />
    </SafeAreaView>
  );
}

export default function App() {
  return <HomeScreen />;
}
