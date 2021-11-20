import React, { Fragment, useEffect, useState } from "react";
import { Button, ScrollView, StyleSheet } from "react-native";
import NewButton from "./NewButton";
import { Text, View } from "./Themed";

export default function EditScreenInfo() {
  interface QuoteProps {
    text: string;
    author: string;
  }

  const [quote, setQuote] = useState<QuoteProps>();

  var data = require("../quotes.json");

  useEffect(() => {
    const retrievedQuotes = data.quotes;
    const randomIndex = Math.floor(Math.random() * retrievedQuotes.length);
    setQuote(retrievedQuotes[randomIndex]);
  }, []);

  function updateQuote() {
    const retrievedQuotes = data.quotes;
    const randomIndex = Math.floor(Math.random() * retrievedQuotes.length);
    setQuote(retrievedQuotes[randomIndex]);
  }

  return (
    <ScrollView style={styles.scrollViewStyle}>
      <View style={styles.getStartedContainer}>
        <View
          style={[styles.codeHighlightContainer, styles.homeScreenFilename]}
          darkColor="rgba(255,255,255,0.05)"
          lightColor="rgba(0,0,0,0.05)"
        ></View>
      </View>

      <View style={styles.container}>
        {quote && (
          <Fragment>
            <Text style={styles.quoteText}>"{quote.text}"</Text>
            <Text style={styles.quoteAuthor}>{quote.author}</Text>
            <NewButton onPress={updateQuote} title="Next Quote" />
            {/* <Button onPress={updateQuote} title="Show More" /> */}
          </Fragment>
        )}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  getStartedContainer: {
    alignItems: "center",
    marginHorizontal: 50,
    backgroundColor: "black",
  },
  homeScreenFilename: {
    marginVertical: 7,
  },
  codeHighlightContainer: {
    borderRadius: 3,
    paddingHorizontal: 4,
  },
  helpContainer: {
    marginTop: 15,
    marginHorizontal: 20,
    alignItems: "center",
  },
  helpLink: {
    paddingVertical: 15,
  },
  helpLinkText: {
    textAlign: "center",
  },
  container: {
    marginTop: 40,
    flex: 1,
    backgroundColor: "black",
    // alignItems: "center",
    // justifyContent: "center",
    marginRight: 40,
    marginLeft: 40,
    marginBottom: 40,
  },
  quoteText: {
    fontSize: 30,
    textAlign: "left",
    // maxWidth: "60%",
    color: "white",
  },
  quoteAuthor: {
    marginTop: 15,
    marginBottom: 60,
    fontSize: 24,
    fontWeight: 600,
    color: "#4f4f4f",
    textAlign: "left",
  },
  scrollViewStyle: { flexGrow: 0 },
});
