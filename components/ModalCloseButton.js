import React from "react";
import { TouchableOpacity, Text, StyleSheet } from "react-native";

import {
  primaryColor,
  labelColor,
  secondaryColor,
  secondaryLabelColor,
} from "./Colors";

const styles = StyleSheet.create({
  closeModalButton: {
    backgroundColor: primaryColor,
    borderColor: primaryColor,
    borderRadius: 15,
    borderWidth: 5,
    shadowColor: secondaryColor,
    shadowOpacity: 1,
    shadowRadius: 20,
    shadowOffset: 25,
    position: "absolute",
    bottom: 50,
    alignSelf: "center",
    width: "50%",
    padding: 10,
  },
  closeModalButtonText: {
    width: "100%",
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 20,
    color: labelColor,
  },
});

function ModalCloseButton(props) {
  return (
    <TouchableOpacity
      style={styles.closeModalButton}
      activeOpacity={0.6}
      onPress={props.whenPressed}
    >
      <Text style={styles.closeModalButtonText}>Close</Text>
    </TouchableOpacity>
  );
}

export default ModalCloseButton;
