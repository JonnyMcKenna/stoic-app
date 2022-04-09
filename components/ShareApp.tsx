import React from "react";
import { StyleSheet, Share, View, Button, Text, Pressable } from "react-native";

const ShareApp = () => {
  const onShare = async () => {
    try {
      const result = await Share.share({
        message: "Download the Stoic Quotes App",
      });
      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          // shared with activity type of result.activityType
        } else {
          // shared
        }
      } else if (result.action === Share.dismissedAction) {
        // dismissed
      }
    } catch (error: any) {
      alert(error.message);
    }
  };
  return (
    <View style={containerStyle.rowContainer}>
      <Pressable style={{}} onPress={onShare}>
        <Text style={containerStyle.heading}>Tell a friend</Text>
        <Text style={containerStyle.description}>
          Share this app with a friend.
        </Text>
      </Pressable>
      {/* <Button onPress={onShare} title="Tell a friend" style={}/> */}
    </View>
  );
};

const containerStyle = StyleSheet.create({
  rowContainer: {
    marginTop: 30,
    flexDirection: "row",
  },
  heading: { fontSize: 16, fontWeight: "500", color: "#EAECEF" },
  description: { fontSize: 14, fontWeight: "300", color: "#848E9C" },
});

export default ShareApp;
