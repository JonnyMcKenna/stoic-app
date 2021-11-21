import React, { Fragment } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  Linking,
} from "react-native";

import { View as ThemeView } from "../components/Themed";
import SettingsRowChecklistComponent from "./SettingsRowChecklistComponent";
import SettingsRowComponent from "./SettingsRowComponent";
import ShareApp from "./ShareApp";

const SettingsComponent = () => {
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
        {/* Notification */}

        {/* <View style={{}}>
          <Text style={{ color: "orange", marginTop: 20 }}>Notification</Text>
        </View>
        <SettingsRowChecklistComponent
          heading={"Daily"}
          description={"Some Text About The Daily Setting"}
        />
        <ThemeView
          style={styles.separator}
          lightColor="#eee"
          darkColor="rgba(255,255,255,0.1)"
        /> */}

        {/* Share */}

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

        {/* 
        <TouchableOpacity onPress={() => console.log("Share App With Friends")}>
          <SettingsRowComponent
            heading={"Tell a friend"}
            description={"Share this app with a friend"}
          />
        </TouchableOpacity> */}

        <ThemeView
          style={styles.separator}
          lightColor="lightgray"
          darkColor="rgba(255,255,255,0.1)"
        />

        {/* The Stoic */}

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
            description={"Report bugs or request new features"}
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
