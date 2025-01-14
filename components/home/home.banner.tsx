import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import React from "react";
import Swiper from "react-native-swiper";
import * as WebBrowser from "expo-web-browser";
import { moderateScale, scale, verticalScale } from "react-native-size-matters";
import {
  fontSizes,
  IsIPAD,
  windowHeight,
  windowWidth,
} from "@/themes/app.constant";
import { bannerData } from "@/configs/constants";
import GradiantText from "../common/gradient.text";

export default function HomeBanner({ theme }: { theme: boolean }) {
  const handlePress = async (item: string) => {
    await WebBrowser.openBrowserAsync(item);
  };

  return (
    <View style={styles.container}>
      {/* <View
        style={{
          marginHorizontal: windowWidth(20),
          marginTop: verticalScale(0),
          marginBottom: verticalScale(10),
        }}
      >
        <View style={{ flexDirection: "row", marginTop: windowHeight(5) }}>
          <Text
            style={{
              fontSize: fontSizes.FONT35,
              fontFamily: "Poppins_500Medium",
              fontWeight: 600,
              color: theme ? "#fff" : "#000",
            }}
          >
            Free Courses
          </Text>
        </View>
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <View
            style={{
              backgroundColor: "#12BB70",
              width: windowWidth(15),
              height: windowWidth(15),
              borderRadius: 100,
            }}
          />
          <Text
            style={{
              fontFamily: "Poppins_400Regular",
              fontSize: fontSizes.FONT18,
              paddingLeft: windowWidth(5),
              color: theme ? "#FFFFFFBF" : "#000",
            }}
          >
            Demo classes here
          </Text>
        </View>
      </View> */}
      <Swiper
        dotStyle={styles.dot}
        activeDotStyle={styles.activeDot}
        autoplay={true}
        autoplayTimeout={5}
        style={{ height: IsIPAD ? moderateScale(240) : moderateScale(230) }}
      >
        {bannerData.map((item, index: number) => (
          <Pressable
            key={index}
            style={styles.slide}
            onPress={() => handlePress(item.url)}
          >
            <Image
              source={{ uri: item.image! }}
              alt=""
              style={{
                height: IsIPAD ? moderateScale(200) : moderateScale(185),
                objectFit: "cover",
                borderRadius: scale(5),
              }}
            />
          </Pressable>
        ))}
      </Swiper>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: verticalScale(10),
    paddingHorizontal: verticalScale(7),
  },
  dot: {
    backgroundColor: "#C6C7CC",
    width: scale(8),
    height: scale(8),
    borderRadius: scale(5),
    marginHorizontal: verticalScale(3),
  },
  activeDot: {
    backgroundColor: "#95dd22",
    width: scale(8),
    height: scale(8),
    borderRadius: scale(5),
    marginHorizontal: verticalScale(3),
  },
  slide: { flex: 1, marginHorizontal: scale(10) },
});
