import React from "react";
import { Platform, View } from "react-native";
import { AdMobBanner } from "expo-ads-admob";
const BannerAd = () => {
  const unitID = Platform.select({
    android: "ca-app-pub-8720230404543468/6602074352",
  });

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
        adUnitID={unitID}
        bannerSize="fullBanner"
        servePersonalizedAds={false}
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
