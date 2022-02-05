import { StatusBar } from "expo-status-bar";
import React, { useEffect, useState } from "react";
import { PermissionStatus } from "expo-modules-core";
import { SafeAreaProvider } from "react-native-safe-area-context";
import useCachedResources from "./hooks/useCachedResources";
import useColorScheme from "./hooks/useColorScheme";
import Navigation from "./navigation";
import * as Notifications from "expo-notifications";
import SplashScreenAnimation from "./components/SplashScreenAnimation";

export default function App() {
  const [notificationPermissions, setNotificationPermissions] =
    useState<PermissionStatus>(PermissionStatus.UNDETERMINED);

  const isLoadingComplete = useCachedResources();
  const colorScheme = useColorScheme();
  const [showSplash, setShowSplash] = useState(true);

  const handleNotification = (notification: Notification) => {
    const { title } = notification.request.content;
    console.warn(title);
  };

  const requestNotificationPermissions = async () => {
    const { status } = await Notifications.requestPermissionsAsync({
      ios: {
        allowAlert: true,
        allowBadge: true,
        allowSound: true,
        allowDisplayInCarPlay: true,
        allowCriticalAlerts: true,
        provideAppNotificationSettings: true,
        allowProvisional: true,
        allowAnnouncements: true,
      },
    });
    setNotificationPermissions(status);
    return status;
  };

  useEffect(() => {
    requestNotificationPermissions();
  }, []);

  useEffect(() => {
    setTimeout(() => {
      setShowSplash(false);
    }, 4000);

    if (notificationPermissions !== PermissionStatus.GRANTED) return;
    const listener =
      Notifications.addNotificationReceivedListener(handleNotification);
    return () => listener.remove();
  }, [notificationPermissions]);

  if (!isLoadingComplete) {
    return null;
  } else {
    return showSplash ? (
      <SafeAreaProvider>
        <SplashScreenAnimation />
      </SafeAreaProvider>
    ) : (
      <SafeAreaProvider>
        <Navigation colorScheme={colorScheme} />
        <StatusBar />
      </SafeAreaProvider>
    );
  }
}
