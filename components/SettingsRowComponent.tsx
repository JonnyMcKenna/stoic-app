import React, { useState } from "react";
import { StyleSheet, Text, View } from "react-native";

const SettingsRowComponent = ({
  heading,
  description,
}: {
  heading: any;
  description: any;
}) => {
  const [isSelected, setSelection] = useState(false);

  return (
    <View style={containerStyle.rowContainer}>
      <View>
        <Text style={containerStyle.heading}>{heading}</Text>
        <Text style={containerStyle.description}>{description}</Text>
      </View>
      {/* <View style={containerStyle.checkbox}>
        <CheckBox value={isSelected} onValueChange={setSelection} />
      </View> */}
    </View>
  );
};

const containerStyle = StyleSheet.create({
  rowContainer: {
    marginTop: 30,
    flexDirection: "row",
  },
  heading: { fontSize: 16, fontWeight: "500", color: "black" },
  description: { fontSize: 14, fontWeight: "300", color: "gray" },
});

export default SettingsRowComponent;
