import {
  Pressable,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import React, { useState } from "react";
import { useTheme } from "@/context/theme.context";
// import useUserData from "@/hooks/useUserData";
import { LinearGradient } from "expo-linear-gradient";
import {
  fontSizes,
  IsAndroid,
  IsHaveNotch,
  IsIPAD,
  windowHeight,
  windowWidth,
} from "@/themes/app.constant";
import { moderateScale, scale, verticalScale } from "react-native-size-matters";
import { EvilIcons, Ionicons } from "@expo/vector-icons";

export default function WelcomeHeader() {
  const { theme } = useTheme();
  //   const { name } = useUserData();
  const [notificationLength, setnotificationLength] = useState(0);

  return (
    <LinearGradient
      colors={
        theme.dark ? ["#262626", "#262626", "#262626"] : ["#75ABFC", "#0047AB"]
      }
      start={theme.dark ? { x: 0.5, y: 0 } : { x: 0.5, y: 0 }}
      end={theme.dark ? { x: 0.5, y: 1 } : { x: 0.5, y: 1 }}
      style={[styles.headerWrapper]}
    >
      <StatusBar barStyle={"light-content"} />
      <View
        style={{
          flexDirection: "row",
          paddingTop: IsHaveNotch
            ? IsIPAD
              ? verticalScale(30)
              : verticalScale(40)
            : verticalScale(30),
          justifyContent: "space-between",
        }}
      >
        <View>
          <Text
            style={{
              fontSize: fontSizes.FONT32,
              color: "#fff",
              fontWeight: 800,
              fontFamily: "Poppins_600SemiBold",
            }}
          >
            {/* Hi {name?.split(" ")[0]},
             */}
            Hi Naveen
          </Text>
          <Text
            style={{
              fontSize: fontSizes.FONT22,
              color: "#FFFFFFBF",
              fontFamily: "Poppins_400Regular",
            }}
          >
            Explore Life Changing Courses
          </Text>
        </View>
        <View style={{ flexDirection: "row" }}>
          <Pressable>
            <View
              style={[
                styles.notificationWrapper,
                {
                  backgroundColor: theme.dark
                    ? "rgba(255, 255, 255, 0.2)"
                    : "#004FAB",
                  // borderWidth: theme?.dark ? 1 : 0,
                  // borderColor: theme.dark ? "#fff" : "transparent",
                },
              ]}
            >
              <Ionicons
                name="notifications-sharp"
                size={scale(25)}
                color={"#fff"}
              />
              <View
                style={[
                  styles.dot,
                  {
                    position: "absolute",
                    right: windowWidth(15),
                    top: windowHeight(10),
                  },
                ]}
              >
                <Text style={{ fontSize: fontSizes.FONT14, color: "#fff" }}>
                  {notificationLength}
                </Text>
              </View>
            </View>
          </Pressable>
        </View>
      </View>
      <View style={{ position: "relative" }}>
        <TextInput
          placeholder="Search for Topics, Courses"
          style={[
            styles.input,
            {
              backgroundColor: theme.dark ? "rgba(255, 255, 255, 0.2)" : "#fff",
              // borderWidth: theme.dark ? 1 : 0,
              // borderColor: theme.dark ? "#fff" : "",
              color: theme?.dark ? "#fff" : "#000",
            },
          ]}
          placeholderTextColor={theme.dark ? "#fff" : "#000"}
        />
        <Pressable
          style={{
            position: "absolute",
            right: windowWidth(10),
            top: windowHeight(16),
          }}
        >
          <EvilIcons
            name="search"
            size={IsIPAD ? scale(20) : scale(30)}
            color={theme.dark ? "#95dd22" : "blue"}
          />
        </Pressable>
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  headerWrapper: {
    height: IsHaveNotch
      ? IsIPAD
        ? verticalScale(175)
        : verticalScale(155)
      : IsAndroid
      ? verticalScale(168)
      : verticalScale(162),
    paddingHorizontal: moderateScale(25),
    borderBottomLeftRadius: moderateScale(40),
    borderBottomRightRadius: moderateScale(40),
    paddingTop: IsAndroid ? verticalScale(10) : verticalScale(0),
  },
  notificationWrapper: {
    position: "relative",
    width: scale(45),
    height: scale(45),
    borderRadius: scale(50),
    alignItems: "center",
    justifyContent: "center",
  },
  dot: {
    width: scale(13),
    height: scale(13),
    backgroundColor: "#95dd22",
    borderRadius: scale(100),
    alignItems: "center",
    justifyContent: "center",
  },
  input: {
    height: IsHaveNotch ? verticalScale(35) : verticalScale(40),
    backgroundColor: "#fff",
    color: "#000",
    marginTop: verticalScale(12),
    fontSize: IsIPAD ? fontSizes.FONT15 : fontSizes.FONT18,
    borderRadius: moderateScale(30),
    paddingHorizontal: moderateScale(15),
    fontFamily: "Poppins_400Regular",
  },
});
