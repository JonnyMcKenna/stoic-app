import React, { Fragment, useEffect, useState } from "react";
import {
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  Linking,
  Platform,
  Animated,
  Easing,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { CheckBox } from "react-native-elements";
import RNDateTimePicker from "@react-native-community/datetimepicker";
import { View as ThemeView } from "../components/Themed";
import SettingsRowChecklistComponent from "./SettingsRowChecklistComponent";
import SettingsRowComponent from "./SettingsRowComponent";
import ShareApp from "./ShareApp";
import * as Notifications from "expo-notifications";
import {
  getDailyNotificationsToggle,
  getNotificationDate,
  scheduleNotification,
  storeNotificationDateToAsyncStorage,
} from "./QuoteScreenAsyncStorage";
import {
  settingsContainerStyle,
  settingsRowChecklistStyle,
  settingsStyles,
} from "../styles/settingsComponentStyle";
import Header from "./Header";

const SettingsComponent = () => {
  const [fadeAnim] = useState(new Animated.Value(0));

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 1500,
      easing: Easing.bounce,
      useNativeDriver: false,
    }).start();
    getNotificationDate().then((parsedNotificationDate) => {
      if (parsedNotificationDate) {
        setDate(parsedNotificationDate);
      }
    });

    getDailyNotificationsToggle().then((dailyNotificationToggleValue) => {
      setSelection(dailyNotificationToggleValue);
    });
  }, []);

  const [date, setDate] = useState(new Date(1598051757900));
  const [open, setOpen] = useState(false);
  const [isSelected, setSelection] = useState(false);

  const onChange = (event: any, selectedDate: any) => {
    const currentDate = selectedDate || date;
    setOpen(Platform.OS === "ios");
    storeNotificationDateToAsyncStorage(currentDate).then(() => {
      scheduleNotification();
    });
    setDate(currentDate);
  };

  const onDailyChange = async (isSelected: any, date: any) => {
    if (isSelected) {
      //if isSelected is true then this section is open but about to close
      await Notifications.cancelAllScheduledNotificationsAsync();
    }
    if (!isSelected) {
      //if isSelected is false then this section is closed but about to open
      // cancelAllScheduledNotificationsAsync is already called in scheduleNotification which is why we don't trigger cancelAllScheduledNotificationsAsync twice
      scheduleNotification();
    }

    const isSelectedToggle = !isSelected;
    await AsyncStorage.setItem(
      "@daily_notifications_toggle",
      isSelectedToggle.toString()
    );

    setSelection(!isSelected);
  };

  function addZeroBefore(n: any) {
    return (n < 10 ? "0" : "") + n;
  }

  var minutes = addZeroBefore(date.getMinutes());
  var hours = addZeroBefore(date.getHours());

  return (
    <Animated.View
      style={{
        opacity: fadeAnim,
      }}
    >
      {/* <Header /> */}
      <ScrollView>
        <View
          style={[
            settingsStyles.container,
            {
              flexDirection: "column",
            },
          ]}
        >
          <View style={{}}>
            <Text
              style={{
                color: "#EAECEF",
                marginTop: 0,
                fontSize: 16,
                fontWeight: "bold",
              }}
            >
              Notifications
            </Text>
          </View>

          {/* <SettingsRowChecklistComponent
          heading={"Daily"}
          description={
            "If selected daily notification of a randomly selected quote will show up."
          }
          isSelected={isSelected}
          setSelection={setSelection}
        /> */}

          <TouchableOpacity onPress={() => setSelection(!isSelected)}>
            <View style={settingsContainerStyle.rowContainer}>
              <View style={{ width: "80%" }}>
                <Text style={settingsRowChecklistStyle.heading}>{"Daily"}</Text>
                <Text style={settingsRowChecklistStyle.description}>
                  {
                    "If selected daily notification of a randomly selected quote will show up."
                  }
                </Text>
              </View>
              <View style={settingsRowChecklistStyle.checkbox}>
                <CheckBox
                  checked={isSelected}
                  onPress={() => onDailyChange(isSelected, date)}
                  checkedColor="#EAECEF"
                />
              </View>
            </View>
          </TouchableOpacity>

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
            <RNDateTimePicker
              testID="dateTimePicker"
              value={date}
              mode={"time"}
              is24Hour={true}
              display="spinner"
              onChange={onChange}
              themeVariant="dark"
            />
          )}

          <ThemeView
            style={settingsStyles.separator}
            lightColor="lightgray"
            darkColor="rgba(255,255,255,0.1)"
          />

          <View style={{}}>
            <Text
              style={{
                color: "#EAECEF",
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
            style={settingsStyles.separator}
            lightColor="lightgray"
            darkColor="rgba(255,255,255,0.1)"
          />

          <View style={{}}>
            <Text
              style={{
                color: "#EAECEF",
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
            style={settingsStyles.separator}
            lightColor="lightgray"
            darkColor="rgba(255,255,255,0.1)"
          />
        </View>
      </ScrollView>
    </Animated.View>
  );
};

export default SettingsComponent;
