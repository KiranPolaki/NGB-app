import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Platform,
} from "react-native";
import { BlurView } from "expo-blur";
import YoutubePlayer from "react-native-youtube-iframe";
import { LinearGradient } from "expo-linear-gradient";

const CoursePlayer = ({ videoId, theme, enrolled }) => {
  console.log(videoId);
  if (videoId === "Not Accessible" || videoId === undefined) {
    return (
      <View style={styles.container}>
        <BlurView
          intensity={theme.dark ? 30 : 50}
          tint={theme.dark ? "dark" : "light"}
          style={styles.blurContainer}
        >
          <LinearGradient
            colors={
              theme.dark
                ? ["rgba(149,221,34,0.8)", "rgba(149,221,34,0.6)"]
                : ["rgba(149,221,34,0.9)", "rgba(149,221,34,0.7)"]
            }
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.buyNowButton}
          >
            <TouchableOpacity style={styles.buttonContent}>
              <Text style={styles.buyNowText}>Buy Now to Unlock ✨</Text>
            </TouchableOpacity>
          </LinearGradient>
        </BlurView>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <YoutubePlayer
        height={200}
        play={false}
        videoId={videoId}
        onChangeState={() => {}}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 200,
    borderRadius: 24,
    overflow: "hidden",
    backgroundColor: "rgba(0,0,0,0.1)",
  },
  blurContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.2)",
  },
  buyNowButton: {
    paddingHorizontal: 32,
    paddingVertical: 16,
    borderRadius: 16,
    ...Platform.select({
      ios: {
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
      },
      android: {
        elevation: 5,
      },
    }),
  },
  buttonContent: {
    alignItems: "center",
    justifyContent: "center",
  },
  buyNowText: {
    color: "#fff",
    fontSize: 18,
    fontFamily: "Poppins_600SemiBold",
    textAlign: "center",
  },
});

export default CoursePlayer;
