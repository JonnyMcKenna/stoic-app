import React from "react";
import { Platform, View } from "react-native";
import { AdMobBanner } from "expo-ads-admob";
const BannerAd = () => {
  const bannerError = (error: any) => {
    console.log("Error receiving Ad: " + error);
    return;
  };

  return (
    <View
      style={{
        flex: 0.1,
        backgroundColor: "#181A20",
        alignItems: "center",
      }}
    >
      <AdMobBanner
        adUnitID={"ca-app-pub-8720230404543468/6602074352"}
        bannerSize="fullBanner"
        servePersonalizedAds={true}
        style={{
          position: "absolute",
          bottom: 0,
        }}
        onDidFailToReceiveAdWithError={bannerError}
      />
    </View>
  );
};

export default BannerAd;
