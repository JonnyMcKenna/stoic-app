import React from "react";
import { Platform, View } from "react-native";
import { AdMobBanner } from "expo-ads-admob";
const BannerAd = () => {
  const unitID = Platform.select({
    // ios: "ca-app-pub-3940256099942544/2934735716",
    android: "ca-app-pub-8720230404543468/6602074352",
  });

  return (
    <View style={{ flex: 0.1, justifyContent: "center", alignItems: "center" }}>
      <AdMobBanner
        adUnitID={unitID}
        bannerSize="fullBanner"
        servePersonalizedAds={true}
        style={{
          padding: 30,
        }}
      />
    </View>
  );
};

export default BannerAd;
