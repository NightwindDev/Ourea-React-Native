import React from "react";

import {
  Text,
  View,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
  Platform,
} from "react-native";

import Modal from "react-native-modal";
import { satisfies } from "compare-versions";
import { WebView } from "react-native-webview";
import ModalCloseButton from "./ModalCloseButton";

import {
  primaryColor,
  labelColor,
  secondaryColor,
  secondaryLabelColor,
} from "./Colors";

const styles = StyleSheet.create({
  subtitle: {
    width: "100%",
    fontSize: 16,
    textAlign: "left",
    paddingLeft: 3,
    fontWeight: "bold",
    color: secondaryLabelColor,
  },
  shortcutCellIcon: {
    width: 50,
    height: 50,
    marginRight: 15,
    borderRadius: 5,
  },
  shortcutModal: {
    width: "100%",
    height: "30%",
    backgroundColor: primaryColor,
    margin: 0,
    justifyContent: "flex-start",
    paddingTop: 50,
    borderRadius: 15,
  },
  screenshotsArea: {
    backgroundColor: secondaryColor,
    borderRadius: 20,
    padding: 20,
  },
  webDepiction: {
    backgroundColor: secondaryColor,
    padding: 20,
    borderRadius: 20,
    marginTop: 20,
    width: "100%",
  },
  depiction: {
    paddingBottom: 140,
    paddingLeft: 20,
    paddingRight: 20,
  },
  depictionTopBar: {
    flexDirection: "row",
    padding: 20,
    alignItems: "center",
  },
  depictionTopBarContent: {
    width: "90%",
  },
  downloadButton: {
    backgroundColor: "rgb(10, 132, 255)",
    paddingTop: 8,
    paddingBottom: 8,
    paddingLeft: 12,
    paddingRight: 12,
    borderRadius: 90,
    marginTop: 10,
    alignSelf: "flex-start",
    flexDirection: "row",
  },
  downloadButtonText: {
    color: "white",
    fontWeight: "bold",
  },
  depictionTitle: {
    width: "100%",
    fontSize: 25,
    fontWeight: "bold",
    color: labelColor,
    marginBottom: 5,
    marginLeft: 3,
  },
  compatibilityWrapper: {
    backgroundColor: secondaryColor,
    padding: 20,
    marginBottom: 20,
    borderRadius: 20,
    flexDirection: "row",
  },
  compatibilityVersions: {
    color: labelColor,
    fontWeight: "bold",
    fontSize: 20,
  },
  compatibilityIndicator: {
    justifyContent: "center",
    alignItems: "center",
    width: 25,
    height: 25,
    marginRight: 10,
    borderRadius: 5,
  },
  compatibilityIndicatorText: {
    color: "white",
  },
  compatible: {
    backgroundColor: "limegreen",
  },
  notCompatible: {
    backgroundColor: "red",
  },
  webView: {
    width: "100%",
    height: 1000,
    borderRadius: 10,
  },
});

function ShortcutModal(props) {
  const compatible =
    satisfies(Platform.Version, ">=" + props.minVersion) &&
    satisfies(Platform.Version, "<=" + props.maxVersion)
      ? true
      : false;

  return (
    <Modal isVisible={props.isVisible} style={styles.shortcutModal}>
      <View style={styles.depictionTopBar}>
        <Image
          source={{ uri: props.iconURL }}
          style={styles.shortcutCellIcon}
        />
        <View style={styles.depictionTopBarContent}>
          <Text style={styles.depictionTitle}>{props.shortcutName}</Text>
          <Text style={styles.subtitle}>{props.shortcutDescription}</Text>
          <TouchableOpacity
            style={styles.downloadButton}
            onPress={props.downloadOnPress}
          >
            <Text style={styles.downloadButtonText}>Download</Text>
          </TouchableOpacity>
        </View>
      </View>
      <ScrollView contentContainerStyle={styles.depiction}>
        <View style={styles.compatibilityWrapper}>
          <View
            style={[
              compatible ? styles.compatible : styles.notCompatible,
              styles.compatibilityIndicator,
            ]}
          >
            <Text
              style={[
                compatible ? { fontSize: 20 } : { fontSize: 25 },
                styles.compatibilityIndicatorText,
              ]}
            >
              {compatible ? "✓" : "𐄂"}
            </Text>
          </View>
          <Text style={styles.compatibilityVersions}>
            Works on: {props.minVersion} - {props.maxVersion}
          </Text>
        </View>
        <ScrollView
          horizontal={true}
          style={styles.screenshotsArea}
          contentContainerStyle={{ paddingRight: 20 }}
          showsHorizontalScrollIndicator={false}
        >
          {props.screenshots}
        </ScrollView>
        <View style={styles.webDepiction}>
          <WebView
            style={styles.webView}
            source={{ uri: props.depictionURL }}
            javaScriptEnabled={true}
          />
        </View>
      </ScrollView>
      <ModalCloseButton whenPressed={props.whenPressed} />
    </Modal>
  );
}

export default ShortcutModal;
