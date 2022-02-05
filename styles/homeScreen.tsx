import { StyleSheet } from "react-native";

export const homeScreenStyles = StyleSheet.create({
  getStartedContainer: {
    alignItems: "center",
    marginHorizontal: 50,
    backgroundColor: "white",
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
    backgroundColor: "white",
    // alignItems: "center",
    // justifyContent: "center",
    marginRight: 40,
    marginLeft: 40,
    marginBottom: 40,
  },
  quoteText: {
    fontSize: 26,
    textAlign: "left",
    // maxWidth: "60%",
    color: "black",
  },
  quoteAuthor: {
    marginTop: 30,
    marginBottom: 50,
    fontSize: 18,
    fontWeight: "600",
    color: "#828282",
    textAlign: "left",
  },
  scrollViewStyle: { flexGrow: 0 },
});
