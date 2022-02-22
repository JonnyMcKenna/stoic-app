import React from "react";
import { Modal } from "react-native";
import LottieView from "lottie-react-native";

export default function SimpleAnimation() {
  return (
    <Modal visible={true} animationType="fade">
      <LottieView
        source={require("../assets/lottie/splashScreen.json")}
        loop={true}
        autoPlay={true}
      />
    </Modal>
  );
}
