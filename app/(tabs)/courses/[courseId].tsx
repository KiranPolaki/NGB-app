import React, { useState, useEffect, useCallback } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
  Platform,
  StatusBar,
} from "react-native";
import { useRoute, useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import YoutubePlayer from "react-native-youtube-iframe";
import { useTheme } from "@/context/theme.context";
import { LinearGradient } from "expo-linear-gradient";
import { BlurView } from "expo-blur";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function CourseDetails() {
  const { theme } = useTheme();
  const navigation = useNavigation();
  const route = useRoute();
  const insets = useSafeAreaInsets();

  const [activeTab, setActiveTab] = useState("Lessons");
  const [course, setCourse] = useState({
    name: "Ultimate Strength Training Masterclass",
    description:
      "Master the art of strength training with our comprehensive course. From proper form to advanced techniques, this course covers everything you need to build muscle, increase strength, and transform your physique.",
    duration: "8h 45min",
    lessons: 32,
    rating: 4.8,
    price: 299,
    videoId: "b0fPciW_uco",
    instructor: "Alex Strong",
  });

  const lessons = [
    { title: "Introduction to Strength Training", duration: "15:30 min" },
    { title: "Proper Form and Technique Basics", duration: "25:45 min" },
    { title: "Building Your Core Strength", duration: "40:20 min" },
    { title: "Advanced Lifting Techniques", duration: "55:10 min" },
  ];

  useEffect(() => {
    fetchData();
  }, [route]);

  const fetchData = async () => {
    try {
      const response = await fetch(
        "https://ngb-api.vercel.app/api/courses/" +
          (Math.floor(Math.random() * 6) + 1)
      );
      const json = await response.json();
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const onStateChange = useCallback((state: string) => {
    if (state === "ended") {
      // You can handle video end here
    }
  }, []);

  return (
    // <SafeAreaView style={{ flex: 1 }}>
    <LinearGradient
      colors={
        theme.dark ? ["#30400d", "#2c322a", "#121212"] : ["#fff", "#f7f7f7"]
      }
      start={{ x: 0, y: 0 }}
      end={{ x: 0, y: 1 }}
      style={[styles.container, { paddingTop: insets.top }]}
    >
      <StatusBar barStyle={theme.dark ? "light-content" : "dark-content"} />

      {/* Header with glass effect */}
      <BlurView
        intensity={theme.dark ? 20 : 40}
        tint={theme.dark ? "dark" : "light"}
        style={styles.header}
      >
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons
            name="arrow-back"
            size={24}
            color={theme.dark ? "#fff" : "#000"}
          />
        </TouchableOpacity>
        <Text
          style={[styles.headerTitle, { color: theme.dark ? "#fff" : "#000" }]}
        >
          Course Overview
        </Text>
        <TouchableOpacity>
          <Ionicons
            name="heart-outline"
            size={24}
            color={theme.dark ? "#fff" : "#000"}
          />
        </TouchableOpacity>
      </BlurView>

      <View style={styles.scrollContainer}>
        <ScrollView
          contentContainerStyle={[
            styles.scrollContent,
            { paddingBottom: insets.bottom + 100 }, // Added extra padding for bottom CTA
          ]}
        >
          {/* Video Player Card */}
          <BlurView
            intensity={theme.dark ? 20 : 40}
            tint={theme.dark ? "dark" : "light"}
            style={styles.videoCard}
          >
            <View style={styles.bannerContainer}>
              <YoutubePlayer
                height={200}
                play={false}
                videoId={course.videoId}
                onChangeState={onStateChange}
              />
            </View>
          </BlurView>

          {/* Course Info Card */}
          <BlurView
            intensity={theme.dark ? 20 : 40}
            tint={theme.dark ? "dark" : "light"}
            style={styles.courseInfoCard}
          >
            <View style={styles.courseInfo}>
              <Text
                style={[
                  styles.courseTitle,
                  { color: theme.dark ? "#fff" : "#000" },
                ]}
              >
                {course.name}
              </Text>
              <View style={styles.courseMetaInfo}>
                <Text
                  style={[
                    styles.metaText,
                    { color: theme.dark ? "rgba(255,255,255,0.7)" : "#666" },
                  ]}
                >
                  {course.duration}
                </Text>
                <Text
                  style={[
                    styles.metaText,
                    { color: theme.dark ? "rgba(255,255,255,0.7)" : "#666" },
                  ]}
                >
                  •
                </Text>
                <Text
                  style={[
                    styles.metaText,
                    { color: theme.dark ? "rgba(255,255,255,0.7)" : "#666" },
                  ]}
                >
                  {course.lessons} lessons
                </Text>
                <View style={styles.ratingContainer}>
                  <Ionicons name="star" size={16} color="#FFD700" />
                  <Text
                    style={[
                      styles.ratingText,
                      { color: theme.dark ? "#FFD700" : "#000" },
                    ]}
                  >
                    {course.rating}
                  </Text>
                </View>
              </View>
            </View>
          </BlurView>

          {/* Content Section */}
          <BlurView
            intensity={theme.dark ? 20 : 40}
            tint={theme.dark ? "dark" : "light"}
            style={styles.contentCard}
          >
            <View style={styles.contentContainer}>
              {activeTab === "Lessons" ? (
                <View style={styles.lessonsContainer}>
                  {lessons.map((lesson, index) => (
                    <TouchableOpacity key={index} style={styles.lessonItem}>
                      <View style={styles.lessonIcon}>
                        <Ionicons name="play" size={16} color="#95dd22" />
                      </View>
                      <View style={styles.lessonInfo}>
                        <Text
                          style={[
                            styles.lessonTitle,
                            { color: theme.dark ? "#fff" : "#000" },
                          ]}
                        >
                          {lesson.title}
                        </Text>
                        <Text
                          style={[
                            styles.lessonDuration,
                            {
                              color: theme.dark
                                ? "rgba(255,255,255,0.6)"
                                : "#666",
                            },
                          ]}
                        >
                          {lesson.duration}
                        </Text>
                      </View>
                      <Ionicons
                        name="chevron-forward"
                        size={20}
                        color={theme.dark ? "rgba(255,255,255,0.6)" : "#666"}
                      />
                    </TouchableOpacity>
                  ))}
                </View>
              ) : (
                <Text
                  style={[
                    styles.description,
                    { color: theme.dark ? "rgba(255,255,255,0.7)" : "#666" },
                  ]}
                >
                  {course.description}
                </Text>
              )}
            </View>
          </BlurView>
        </ScrollView>
      </View>

      {/* Bottom CTA */}
      <BlurView
        intensity={theme.dark ? 20 : 40}
        tint={theme.dark ? "dark" : "light"}
        style={[
          styles.bottomCTA,
          { paddingBottom: insets.bottom + 16 }, // Added safe area padding
        ]}
      >
        <Text style={[styles.price, { color: theme.dark ? "#fff" : "#000" }]}>
          ${course.price}
        </Text>
        <TouchableOpacity style={styles.enrollButton}>
          <Text style={styles.enrollButtonText}>Enroll Now</Text>
        </TouchableOpacity>
      </BlurView>
    </LinearGradient>
    // </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: "rgba(255,255,255,0.1)",
    // backgroundColor: "rgba(255,255,255,0.1)",
  },
  headerTitle: {
    fontSize: 18,
    fontFamily: "Poppins_600SemiBold",
  },
  scrollContainer: {
    flex: 1,
  },
  scrollContent: {
    padding: 16,
  },
  videoCard: {
    borderRadius: 24,
    overflow: "hidden",
    marginBottom: 16,
    backgroundColor: "rgba(255,255,255,0.1)",
  },
  bannerContainer: {
    height: 200,
    overflow: "hidden",
  },
  courseInfoCard: {
    borderRadius: 24,
    overflow: "hidden",
    marginBottom: 16,
    backgroundColor: "rgba(255,255,255,0.1)",
  },
  courseInfo: {
    padding: 16,
  },
  courseTitle: {
    fontSize: 22,
    fontFamily: "Poppins_700Bold",
    marginBottom: 8,
  },
  courseMetaInfo: {
    flexDirection: "row",
    alignItems: "center",
    flexWrap: "wrap",
  },
  metaText: {
    fontSize: 14,
    fontFamily: "Poppins_400Regular",
    marginRight: 8,
  },
  ratingContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(255,215,0,0.1)",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  ratingText: {
    fontSize: 14,
    fontFamily: "Poppins_600SemiBold",
    marginLeft: 4,
  },
  contentCard: {
    borderRadius: 24,
    overflow: "hidden",
    backgroundColor: "rgba(255,255,255,0.1)",
  },
  contentContainer: {
    padding: 16,
  },
  lessonsContainer: {
    paddingVertical: 8,
  },
  lessonItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "rgba(255,255,255,0.1)",
  },
  lessonIcon: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: "rgba(149,221,34,0.1)",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },
  lessonInfo: {
    flex: 1,
  },
  lessonTitle: {
    fontSize: 16,
    fontFamily: "Poppins_500Medium",
    marginBottom: 4,
  },
  lessonDuration: {
    fontSize: 14,
    fontFamily: "Poppins_400Regular",
  },
  description: {
    fontSize: 16,
    lineHeight: 24,
    fontFamily: "Poppins_400Regular",
  },
  bottomCTA: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 16,
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: "rgba(255,255,255,0.1)",
    borderTopWidth: 1,
    borderTopColor: "rgba(255,255,255,0.1)",
  },
  price: {
    fontSize: 24,
    fontFamily: "Poppins_700Bold",
  },
  enrollButton: {
    backgroundColor: "#95dd22",
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 12,
  },
  enrollButtonText: {
    color: "#000",
    fontSize: 16,
    fontFamily: "Poppins_600SemiBold",
  },
});
