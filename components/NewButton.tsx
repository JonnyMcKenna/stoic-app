import React from "react";
import { Text, StyleSheet, Pressable } from "react-native";

export default function NewButton(props: any) {
  const { onPress, title = "Save" } = props;
  return (
    <Pressable
      android_ripple={{ color: "#848E9C" }}
      style={({ pressed }) => [
        {
          //Might need this again for ios?
          // backgroundColor: pressed ? "#848E9C" : "#EAECEF",
        },
        styles.button,
      ]}
      onPress={onPress}
    >
      <Text style={styles.text}>{title}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 4,
    elevation: 5,
    backgroundColor: "#EAECEF",
    width: "80%",
    position: "absolute",
    bottom: 0,
  },
  text: {
    fontSize: 16,
    lineHeight: 21,
    fontWeight: "bold",
    letterSpacing: 0.25,
    color: "#181A20",
  },
});
