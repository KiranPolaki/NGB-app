import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import React from "react";
import { useTheme } from "@/context/theme.context";
// import useUser from "@/hooks/fetch/useUser";
import { Tabs, useNavigation } from "expo-router";
import { Feather, Ionicons, Octicons } from "@expo/vector-icons";
import { moderateScale, scale, verticalScale } from "react-native-size-matters";
import { fontSizes, IsAndroid, IsIOS, IsIPAD } from "@/themes/app.constant";
import { BlurView } from "expo-blur";

export default function _layout() {
  const { theme } = useTheme();
  // const { loader } = useUser();
  const navigation = useNavigation();

  return (
    <Tabs
      screenOptions={({ route }) => {
        return {
          tabBarIcon: ({ color }) => {
            let iconName;
            if (route.name === "index") {
              iconName = (
                <Feather
                  name="home"
                  size={moderateScale(24)}
                  style={{ width: IsIPAD ? scale(20) : "auto" }}
                  color={color}
                />
              );
            } else if (route.name === "courses") {
              iconName = (
                <Feather
                  name="book-open"
                  size={moderateScale(24)}
                  style={{ width: IsIPAD ? scale(20) : "auto" }}
                  color={color}
                />
              );
            } else if (route.name === "profile/index") {
              iconName = (
                <Octicons
                  name="person"
                  size={moderateScale(26)}
                  style={{ width: IsIPAD ? scale(20) : "auto" }}
                  color={color}
                />
              );
            }
            return iconName;
          },
          tabBarActiveTintColor: theme.dark ? "#bce973" : "#95dd22",
          tabBarInactiveTintColor: theme.dark ? "#8e8e93" : "#8e8e93",
          headerShown: route.name === "resources/index" ? true : false,
          headerTitle:
            route.name === "courses"
              ? "Courses"
              : route.name === "resources/index"
              ? "Video Lessons"
              : "",
          headerTitleStyle: {
            color: theme.dark ? "#fff" : "#000",
            textAlign: "center",
            width: scale(320),
            fontSize: fontSizes.FONT22,
            fontFamily: "Poppins_400Regular",
          },
          // headerLeft: () => (
          //   <TouchableOpacity onPress={() => navigation.goBack()}>
          //     <Ionicons
          //       name="arrow-back"
          //       size={moderateScale(24)}
          //       color={theme.dark ? "#fff" : "#000"}
          //       style={{ marginLeft: scale(10) }}
          //     />
          //   </TouchableOpacity>
          // ),
          headerBackgroundContainerStyle: {
            backgroundColor: theme.dark ? "#131313" : "#fff",
            shadowColor: theme.dark ? "#fff" : "#000",
            shadowOpacity: theme.dark ? 0.1 : 0.1,
            shadowOffset: { width: 0, height: 1 },
            shadowRadius: 1,
            elevation: 1,
          },
          headerBackground: () => (
            <BlurView
              intensity={theme.dark ? 70 : 80}
              style={{
                borderTopLeftRadius: scale(20),
                borderTopRightRadius: scale(20),
                overflow: "hidden",
                backgroundColor: "transparent",
              }}
            />
          ),
          tabBarShowLabel: false,
          tabBarStyle: {
            position: IsIOS ? (theme.dark ? "absolute" : "static") : "absolute",
            borderTopLeftRadius: IsAndroid ? 0 : IsIPAD ? scale(20) : scale(35),
            paddingTop: 10,
            borderTopRightRadius: IsAndroid
              ? 0
              : IsIPAD
              ? scale(20)
              : scale(35),
            borderTopWidth: 0,
            height: verticalScale(55),
            // opacity: loader ? 0 : 1,
            transition: "opacity 0.3s ease-in-out",
          },
          tabBarBackground: () => {
            return (
              <>
                {IsIOS && !theme.dark ? (
                  <View
                    style={{
                      ...StyleSheet.absoluteFillObject,
                      backgroundColor: "#fff",
                      borderTopLeftRadius: IsAndroid
                        ? 0
                        : IsIPAD
                        ? scale(25)
                        : scale(35),
                      borderTopRightRadius: IsAndroid
                        ? 0
                        : IsIPAD
                        ? scale(25)
                        : scale(35),
                      overflow: "hidden",
                    }}
                  />
                ) : (
                  <BlurView
                    intensity={theme.dark ? (IsAndroid ? 10 : 60) : 100}
                    style={{
                      ...StyleSheet.absoluteFillObject,
                      borderTopLeftRadius: IsAndroid
                        ? 0
                        : IsIPAD
                        ? scale(25)
                        : scale(35),
                      borderTopRightRadius: IsAndroid
                        ? 0
                        : IsIPAD
                        ? scale(25)
                        : scale(35),
                      overflow: "hidden",
                      backgroundColor: IsAndroid
                        ? theme.dark
                          ? "#131313"
                          : "#fff"
                        : theme.dark
                        ? "transparent"
                        : "#fff",
                    }}
                  />
                )}
              </>
            );
          },
        };
      }}
    >
      <Tabs.Screen name="index" />
      <Tabs.Screen name="courses" />
      <Tabs.Screen name="profile/index" />
    </Tabs>
  );
}
