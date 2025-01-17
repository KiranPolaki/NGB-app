import { ScrollView, StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import { LinearGradient } from "expo-linear-gradient";
import { useTheme } from "@/context/theme.context";
import WelcomeHeader from "@/components/home/welcome.header";
import HomeBanner from "@/components/home/home.banner";
import { fontSizes, windowHeight, windowWidth } from "@/themes/app.constant";
import { scale, verticalScale } from "react-native-size-matters";
import GradiantText from "@/components/common/gradient.text";
import SkeltonLoader from "@/utils/skelton";

export default function HomeScreen() {
  const { theme } = useTheme();
  const [loading, setLoading] = useState(true);

  return (
    <>
      <LinearGradient
        colors={
          theme.dark ? ["#3f350d", "#32322a", "#121212"] : ["#fff", "#f7f7f7"]
        }
        start={{ x: 0, y: 0 }}
        end={{ x: 0, y: 1 }}
        style={{
          flex: 1,
          backgroundColor: theme.dark ? "#101010" : "#fff",
        }}
      >
        <WelcomeHeader />

        <ScrollView showsVerticalScrollIndicator={false}>
          <HomeBanner theme={theme.dark} />
          <View
            style={{
              marginHorizontal: windowWidth(20),
              marginTop: verticalScale(-25),
            }}
          >
            <View style={{ flexDirection: "row", marginTop: windowHeight(5) }}>
              <Text
                style={{
                  fontSize: fontSizes.FONT35,
                  fontFamily: "Poppins_500Medium",
                  fontWeight: 600,
                  color: theme.dark ? "#fff" : "#000",
                }}
              >
                Popular
              </Text>
              <GradiantText
                text="Courses"
                styles={{
                  fontSize: fontSizes.FONT35,
                  fontFamily: "Poppins_500Medium",
                  paddingLeft: scale(5),
                  fontWeight: 600,
                }}
              />
            </View>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <Text>🔥</Text>
              <Text
                style={{
                  fontFamily: "Poppins_400Regular",
                  fontSize: fontSizes.FONT18,
                  paddingLeft: windowWidth(5),
                  color: theme.dark ? "#FFFFFFBF" : "#000",
                }}
              >
                Our result based exercise courses
              </Text>
            </View>
          </View>
          {loading ? (
            <>
              <SkeltonLoader />
              <SkeltonLoader />
            </>
          ) : (
            <View></View>
          )}
        </ScrollView>
      </LinearGradient>
    </>
  );
}

const styles = StyleSheet.create({});
