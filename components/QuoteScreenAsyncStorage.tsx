import * as BackgroundFetch from "expo-background-fetch";
import * as TaskManager from "expo-task-manager";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as Notifications from "expo-notifications";

export const BACKGROUND_FETCH_TASK = "background-fetch";
import data from "../quotes.json";

export const getNotificationDate = async () => {
  try {
    const notificationDate = await AsyncStorage.getItem("@notification_date");
    if (notificationDate !== null) {
      const parsedNotificationDate = new Date(notificationDate);
      return parsedNotificationDate;
    } else {
      return new Date();
    }
  } catch (e) {
    // error reading value
  }
};

export const storeNotificationDateToAsyncStorage = async (currentDate: any) => {
  try {
    await AsyncStorage.setItem("@notification_date", currentDate.toString());
  } catch (e) {
    // saving error
  }
};

export const getDailyQuote = async () => {
  try {
    const dailyQuote = await AsyncStorage.getItem("@daily_quote");
    if (dailyQuote !== null) {
      return JSON.parse(dailyQuote);
    }
  } catch (e) {
    // error reading value
  }
};

export const scheduleNotification = async () => {
  await Notifications.cancelAllScheduledNotificationsAsync();

  let minute = 0;
  let hour = 8;

  getNotificationDate()
    .then((updatedNotificationDate) => {
      if (updatedNotificationDate) {
        minute = Number(updatedNotificationDate.getMinutes());
        hour = Number(updatedNotificationDate.getHours());
      }
    })
    .then(() => {
      getDailyQuote().then((dailyQuote) => {
        const dailyQuoteMessage = dailyQuote.text;

        const schedulingOptions = {
          content: {
            title: "Stoic Quotes App",
            body: dailyQuoteMessage,
            sound: true,
            priority: Notifications.AndroidNotificationPriority.HIGH,
            // color: "blue",
          },
          trigger: {
            // seconds: 3,
            hour: hour,
            minute: minute,
            repeats: true,
          },
        };
        Notifications.scheduleNotificationAsync(schedulingOptions);
      });
    });
};

const storeQuoteToAsyncStorage = async () => {
  const retrievedQuotes = data.quotes;
  const randomIndex = Math.floor(Math.random() * retrievedQuotes.length);
  const newQuote = retrievedQuotes[randomIndex];

  try {
    await AsyncStorage.setItem("@daily_quote", JSON.stringify(newQuote));
    scheduleNotification;
  } catch (e) {
    // saving error
  }
};

const storeCurrentDayToAsyncStorage = async (currentDay: number) => {
  try {
    await AsyncStorage.setItem(
      "@past_day",
      JSON.stringify(JSON.stringify(currentDay))
    );
  } catch (e) {
    // saving error
  }
};

// 1. Define the task by providing a name and the function that should be executed
// Note: This needs to be called in the global scope (e.g outside of your React components)
TaskManager.defineTask(BACKGROUND_FETCH_TASK, async () => {
  // Every day change the quote and save to async storage

  var currentDay = new Date().getDay;
  const pastDay = await AsyncStorage.getItem("@past_day");

  if (pastDay !== null) {
    if (Number(pastDay) < Number(currentDay)) {
      storeQuoteToAsyncStorage();
      storeCurrentDayToAsyncStorage(Number(currentDay));
    }
  } else {
    storeCurrentDayToAsyncStorage(Number(currentDay));
  }

  return BackgroundFetch.BackgroundFetchResult.NewData;
});

// 2. Register the task at some point in your app by providing the same name, and some configuration options for how the background fetch should behave
// Note: This does NOT need to be in the global scope and CAN be used in your React components!
export async function registerBackgroundFetchAsync() {
  return BackgroundFetch.registerTaskAsync(BACKGROUND_FETCH_TASK, {
    minimumInterval: 60 * 15, // 15 minutes
    stopOnTerminate: false, // android only,
    startOnBoot: true, // android only
  });
}

// 3. (Optional) Unregister tasks by specifying the task name
// This will cancel any future background fetch calls that match the given name
// Note: This does NOT need to be in the global scope and CAN be used in your React components!
export async function unregisterBackgroundFetchAsync() {
  return BackgroundFetch.unregisterTaskAsync(BACKGROUND_FETCH_TASK);
}
