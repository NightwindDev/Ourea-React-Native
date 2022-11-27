import React from "react";
import { Image, StyleSheet, TouchableOpacity } from "react-native";
import FullScreenshotModal from "./FullScreenshotModal";

import { primaryColor } from "./Colors";

const styles = StyleSheet.create({
  screenshot: {
    width: 300,
    height: 500,
    backgroundColor: primaryColor,
    borderRadius: 10,
    marginRight: 20,
  },
});

function Screenshot(props) {
  const [isScreenshotModalVisible, setIsScreenshotModalVisible] =
    React.useState(false);

  const handleOpenScreenshotModal = () => {
    setIsScreenshotModalVisible(() => !isScreenshotModalVisible);
  };

  return (
    <TouchableOpacity onPress={handleOpenScreenshotModal}>
      <Image source={props.source} style={styles.screenshot} />
      <FullScreenshotModal
        screenshotURL={props.screenshotURL}
        isVisible={isScreenshotModalVisible}
        onPress={handleOpenScreenshotModal}
      />
    </TouchableOpacity>
  );
}

export default Screenshot;
