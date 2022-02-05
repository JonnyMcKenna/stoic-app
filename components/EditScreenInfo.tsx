import React, { Fragment, useEffect, useState } from "react";
import { ScrollView } from "react-native";
import NewButton from "./NewButton";
import { Text, View } from "./Themed";
import * as TaskManager from "expo-task-manager";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  BACKGROUND_FETCH_TASK,
  registerBackgroundFetchAsync,
  unregisterBackgroundFetchAsync,
} from "./QuoteScreenAsyncStorage";
import { QuoteProps } from "../types/genericTypes";
import { homeScreenStyles } from "../styles/homeScreen";
import data from "../quotes.json";

export default function EditScreenInfo() {
  useEffect(() => {
    toggleFetchTask();
    checkStatusAsync();
    getDailyQuote();
  }, []);

  const [isRegistered, setIsRegistered] = React.useState(false);
  const [quote, setQuote] = useState<QuoteProps>();

  const getDailyQuote = async () => {
    try {
      const dailyQuote = await AsyncStorage.getItem("@daily_quote");
      if (dailyQuote !== null) {
        setQuote(JSON.parse(dailyQuote));
      }
    } catch (e) {
      // error reading value
    }
  };

  const checkStatusAsync = async () => {
    const isRegistered = await TaskManager.isTaskRegisteredAsync(
      BACKGROUND_FETCH_TASK
    );
    setIsRegistered(isRegistered);
  };

  const toggleFetchTask = async () => {
    if (isRegistered) {
      await unregisterBackgroundFetchAsync();
    } else {
      await registerBackgroundFetchAsync();
    }
    checkStatusAsync();
  };

  function updateQuote() {
    const retrievedQuotes = data.quotes;
    const randomIndex = Math.floor(Math.random() * retrievedQuotes.length);
    setQuote(retrievedQuotes[randomIndex]);
  }

  return (
    <ScrollView style={homeScreenStyles.scrollViewStyle}>
      <View style={homeScreenStyles.getStartedContainer}>
        <View
          style={[
            homeScreenStyles.codeHighlightContainer,
            homeScreenStyles.homeScreenFilename,
          ]}
          darkColor="rgba(255,255,255,0.05)"
          lightColor="rgba(0,0,0,0.05)"
        ></View>
      </View>

      <View style={homeScreenStyles.container}>
        {quote && (
          <Fragment>
            <Text style={homeScreenStyles.quoteText}>"{quote.text}"</Text>
            <Text style={homeScreenStyles.quoteAuthor}>- {quote.author}</Text>
            <NewButton onPress={updateQuote} title="New Quote" />
          </Fragment>
        )}
      </View>
    </ScrollView>
  );
}
