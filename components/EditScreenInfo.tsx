import React, { Fragment, useEffect, useState } from "react";
import { ScrollView } from "react-native";
import NewButton from "./NewButton";
import { Text, View } from "./Themed";
import * as TaskManager from "expo-task-manager";
import {
  BACKGROUND_FETCH_TASK,
  getDailyQuote,
  registerBackgroundFetchAsync,
  storeQuoteToAsyncStorage,
  unregisterBackgroundFetchAsync,
} from "./QuoteScreenAsyncStorage";
import { QuoteProps } from "../types/genericTypes";
import { homeScreenStyles } from "../styles/homeScreen";
import data from "../quotes.json";
import "./QuoteScreenAsyncStorage";

export default function EditScreenInfo() {
  // On Load - Ensure that background fetch is in sync and get todays quote
  useEffect(() => {
    checkStatusAsync();
    toggleFetchTask();
    getDailyQuote().then((dailyQuote: any) => {
      setQuote(dailyQuote);
    });
  }, []);

  const [isRegistered, setIsRegistered] = React.useState(false);
  const [quote, setQuote] = useState<QuoteProps>();

  const checkStatusAsync = async () => {
    // Check if background fetch is registered and syced
    const isRegistered = await TaskManager.isTaskRegisteredAsync(
      BACKGROUND_FETCH_TASK
    );
    setIsRegistered(isRegistered);
  };

  // Ensure background fetch is registered
  const toggleFetchTask = async () => {
    if (isRegistered) {
      await unregisterBackgroundFetchAsync();
    } else {
      await registerBackgroundFetchAsync();
    }
    checkStatusAsync();
  };

  // Get, set and store new quote to async storage
  function updateQuote() {
    const retrievedQuotes = data.quotes;
    const randomIndex = Math.floor(Math.random() * retrievedQuotes.length);
    const newQuote = retrievedQuotes[randomIndex];
    setQuote(newQuote);
    storeQuoteToAsyncStorage(newQuote);
  }

  return (
    <Fragment>
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
            </Fragment>
          )}
        </View>
      </ScrollView>
      <View style={homeScreenStyles.buttonViewContainer}>
        <NewButton onPress={updateQuote} title="New Quote" />
      </View>
    </Fragment>
  );
}
