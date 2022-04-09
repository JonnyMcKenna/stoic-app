import React from "react";
import { Modal, Text, StyleSheet, View } from "react-native";
import LottieView from "lottie-react-native";

export default function SimpleAnimation() {
  return (
    <Modal visible={true} animationType="fade">
      <View style={splashScreenStyles.container}>
        <Text style={splashScreenStyles.quoteText}>Stoic Quotes App</Text>
        <Text style={splashScreenStyles.taglineText}>Tagline</Text>
      </View>
      {/* 
      <LottieView
        source={require("../assets/lottie/splashScreen.json")}
        loop={true}
        autoPlay={true}
      /> */}
    </Modal>
  );
}

export const splashScreenStyles = StyleSheet.create({
  quoteText: {
    fontSize: 26,
    color: "#EAECEF",
  },
  taglineText: {
    marginTop: 10,
    fontSize: 18,
    color: "#848E9C",
  },
  container: {
    flex: 1,
    backgroundColor: "#181A20",
    justifyContent: "center",
    alignItems: "center",
  },
});
