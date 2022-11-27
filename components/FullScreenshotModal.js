import React from "react";

import { StyleSheet, Image } from "react-native";

import Modal from "react-native-modal";
import ModalCloseButton from "./ModalCloseButton";

import { primaryColor } from "./Colors";

const styles = StyleSheet.create({
  shortcutModal: {
    width: "100%",
    height: "30%",
    backgroundColor: primaryColor,
    margin: 0,
    justifyContent: "flex-start",
    paddingTop: 50,
    borderRadius: 15,
  },
  fullScreenshot: {
    width: "100%",
    height: "100%",
  },
});

function FullScreenshotModal(props) {
  return (
    <Modal isVisible={props.isVisible} style={styles.shortcutModal}>
      <Image
        source={{ uri: props.screenshotURL }}
        style={styles.fullScreenshot}
      />
      <ModalCloseButton whenPressed={props.onPress} />
    </Modal>
  );
}

export default FullScreenshotModal;
