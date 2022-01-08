import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  Linking,
  Platform,
} from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";

import { View as ThemeView } from "../components/Themed";
import SettingsRowChecklistComponent from "./SettingsRowChecklistComponent";
import SettingsRowComponent from "./SettingsRowComponent";
import ShareApp from "./ShareApp";

const SettingsComponent = () => {
  const [date, setDate] = useState(new Date(1598051730000));
  const [open, setOpen] = useState(false);
  const [isSelected, setSelection] = useState(false);

  const onChange = (event: any, selectedDate: any) => {
    const currentDate = selectedDate || date;
    setOpen(Platform.OS === "ios");
    setDate(currentDate);
  };

  function addZeroBefore(n: any) {
    return (n < 10 ? "0" : "") + n;
  }

  var minutes = date.getMinutes();
  var hours = addZeroBefore(date.getHours());

  return (
    <ScrollView>
      <View
        style={[
          styles.container,
          {
            flexDirection: "column",
            backgroundColor: "white",
          },
        ]}
      >
        <View style={{}}>
          <Text
            style={{
              color: "black",
              marginTop: 0,
              fontSize: 16,
              fontWeight: "bold",
            }}
          >
            Notifications
          </Text>
        </View>

        <SettingsRowChecklistComponent
          heading={"Daily"}
          description={
            "If selected daily notification of a randomly selected quote will show up."
          }
          isSelected={isSelected}
          setSelection={setSelection}
        />

        {isSelected && (
          <TouchableOpacity onPress={() => setOpen(!open)}>
            <SettingsRowComponent
              heading={"Delivery Time"}
              description={
                "When do you want your daily dose? Currently at " +
                hours +
                ":" +
                minutes
              }
            />
          </TouchableOpacity>
        )}

        {open && (
          <DateTimePicker
            testID="dateTimePicker"
            value={date}
            mode={"time"}
            is24Hour={true}
            display="default"
            onChange={onChange}
            themeVariant="dark"
          />
        )}

        <ThemeView
          style={styles.separator}
          lightColor="lightgray"
          darkColor="rgba(255,255,255,0.1)"
        />

        <View style={{}}>
          <Text
            style={{
              color: "black",
              marginTop: 0,
              fontSize: 16,
              fontWeight: "bold",
            }}
          >
            Share
          </Text>
        </View>

        <ShareApp />

        <ThemeView
          style={styles.separator}
          lightColor="lightgray"
          darkColor="rgba(255,255,255,0.1)"
        />

        <View style={{}}>
          <Text
            style={{
              color: "black",
              marginTop: 0,
              fontSize: 16,
              fontWeight: "bold",
            }}
          >
            The Stoic
          </Text>
        </View>

        <TouchableOpacity
          onPress={() =>
            Linking.openURL(
              "https://paypal.me/jonnycmckenna?country.x=GB&locale.x=en_GB"
            ).catch((err) => console.error("Error", err))
          }
        >
          <SettingsRowComponent
            heading={"Support Development"}
            description={
              "If you really like The Stoic, consider supporting its development by sending a couple of pounds my way!"
            }
          />
        </TouchableOpacity>

        {/* <TouchableOpacity
          onPress={() => console.log("Advertisement Free / Pro Version")}
        >
          <SettingsRowComponent
            heading={"Advertisement Free / Pro Version"}
            description={
              "Remove all the ads on the App and support development"
            }
          />
        </TouchableOpacity> */}

        {/* <TouchableOpacity onPress={() => console.log("Rate App")}>
          <SettingsRowComponent
            heading={"Rate App"}
            description={"If you like The Stoic, feel free to rate it 5 stars"}
          />
        </TouchableOpacity> */}

        <TouchableOpacity
          onPress={() =>
            Linking.openURL("mailto:jonathanmckenna123abc@hotmail.com").catch(
              (err) => console.error("Error", err)
            )
          }
        >
          <SettingsRowComponent
            heading={"Report Bug"}
            description={"Report bugs or request new features."}
          />
        </TouchableOpacity>

        <ThemeView
          style={styles.separator}
          lightColor="lightgray"
          darkColor="rgba(255,255,255,0.1)"
        />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    marginTop: 24,
    // marginLeft: 24,
    // marginRight: 24,
  },
  separator: {
    marginVertical: 30,
    height: 1,
    // width: "80%",
  },
});

const containerStyle = StyleSheet.create({
  container: {
    padding: 8,
    backgroundColor: "#ffffff",
  },
  rowContainer: {
    marginTop: 30,
    flexDirection: "row",
  },
});

export default SettingsComponent;
