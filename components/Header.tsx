import React from "react";
import { Text, StyleSheet, View } from "react-native";

export default function Header() {
  return (
    <View style={headerStyles.headerViewContainer}>
      <Text style={headerStyles.headerText}>Stoic Quotes App</Text>
    </View>
  );
}

const headerStyles = StyleSheet.create({
  headerViewContainer: {
    flex: 1,
    backgroundColor: "#181A20",
    justifyContent: "center",
    height: 60,
    position: "absolute",
    top: 0,
    width: "100%",
    zIndex: 100,
  },
  headerText: {
    marginLeft: 40,
    fontSize: 18,
    textAlign: "left",
    color: "#848E9C",
  },
});
