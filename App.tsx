import { StatusBar } from "expo-status-bar";
import React from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";
import useCachedResources from "./hooks/useCachedResources";
import useColorScheme from "./hooks/useColorScheme";
import Navigation from "./navigation";
import * as Notifications from "expo-notifications";
import * as Permissions from "expo-permissions";
import { Button } from "react-native";

export default function App() {
  const isLoadingComplete = useCachedResources();
  const colorScheme = useColorScheme();

  const askPermissions = async () => {
    const { status: existingStatus } = await Permissions.getAsync(
      Permissions.NOTIFICATIONS
    );
    let finalStatus = existingStatus;
    if (existingStatus !== "granted") {
      const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS);
      finalStatus = status;
    }
    if (finalStatus !== "granted") {
      return false;
    }
    return true;
  };

  async function scheduleNotification() {
    await Notifications.scheduleNotificationAsync({
      content: {
        title: "Stoic Quote of the Day",
        body: "Here is the notification body",
        data: { data: "goes here" },
      },
      trigger: { repeats: true, seconds: 60 },
    });
  }

  if (!isLoadingComplete) {
    return null;
  } else {
    return (
      <SafeAreaProvider>
        <Navigation colorScheme={colorScheme} />
        <StatusBar />
        {/* <Button
          title="Please accept Notifications Permissions"
          onPress={() => askPermissions()}
        />
        <Button
          title={"Schedule Notification"}
          onPress={() => scheduleNotification()}
        />
        <Button
          title="Cancel Scheduled Notifications"
          onPress={() => Notifications.cancelAllScheduledNotificationsAsync()}
        /> */}
        {/* <PushNotifications /> dont need this */}
        {/* look to use this for push notifications https://notifee.app/ */}
      </SafeAreaProvider>
    );
  }
}
