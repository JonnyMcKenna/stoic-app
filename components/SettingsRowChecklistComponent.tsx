import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { CheckBox } from "react-native-elements";

const SettingsRowChecklistComponent = ({
  heading,
  description,
  isSelected,
  setSelection,
}: {
  heading: any;
  description: any;
  isSelected: any;
  setSelection: any;
}) => {
  return (
    <TouchableOpacity onPress={() => setSelection(!isSelected)}>
      <View style={containerStyle.rowContainer}>
        <View style={{ width: "80%" }}>
          <Text style={containerStyle.heading}>{heading}</Text>
          <Text style={containerStyle.description}>{description}</Text>
        </View>
        <View style={containerStyle.checkbox}>
          <CheckBox
            checked={isSelected}
            onPress={() => setSelection(!isSelected)}
            checkedColor="#EAECEF"
          />
        </View>
      </View>
    </TouchableOpacity>
  );
};

const containerStyle = StyleSheet.create({
  rowContainer: {
    marginTop: 30,
    flexDirection: "row",
  },
  heading: { fontSize: 16, fontWeight: "500", color: "#EAECEF" },
  description: { fontSize: 14, fontWeight: "300", color: "#848E9C" },
  checkbox: {
    width: "20%",
    justifyContent: "center",
  },
});

export default SettingsRowChecklistComponent;
