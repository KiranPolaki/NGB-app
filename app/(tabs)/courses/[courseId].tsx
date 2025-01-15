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
// import { theme } from "@/constants/Colors";
import YoutubePlayer from "react-native-youtube-iframe";
import { useTheme } from "@/context/theme.context";

export default function CourseDetails() {
  const { theme } = useTheme();
  const navigation = useNavigation();
  const route = useRoute();

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
      console.log(json);
      // You can update the course state here with the fetched data if needed
      // setCourse(json);
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
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color={"#000"} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Course Overview</Text>
        <TouchableOpacity>
          <Ionicons name="heart-outline" size={24} color={"#000"} />
        </TouchableOpacity>
      </View>

      <View style={styles.scrollContainer}>
        <ScrollView contentContainerStyle={styles.scrollContent}>
          {/* Course Banner (YouTube Video) */}
          <View style={styles.bannerContainer}>
            <YoutubePlayer
              height={200}
              play={false}
              videoId={course.videoId}
              onChangeState={onStateChange}
            />
          </View>

          {/* Course Info */}
          <View style={styles.courseInfo}>
            <Text style={styles.courseTitle}>{course.name}</Text>
            <View style={styles.courseMetaInfo}>
              <Text style={styles.metaText}>{course.duration}</Text>
              <Text style={styles.metaText}>•</Text>
              <Text style={styles.metaText}>{course.lessons} lessons</Text>
              <View style={styles.ratingContainer}>
                <Ionicons name="star" size={16} color="#FFD700" />
                <Text style={styles.ratingText}>{course.rating}</Text>
              </View>
            </View>
          </View>

          {/* Tabs */}
          <View style={styles.tabsContainer}>
            {["Lessons", "Description"].map((tab) => (
              <TouchableOpacity
                key={tab}
                style={[styles.tab, activeTab === tab && styles.activeTab]}
                onPress={() => setActiveTab(tab)}
              >
                <Text
                  style={[
                    styles.tabText,
                    activeTab === tab && styles.activeTabText,
                  ]}
                >
                  {tab}
                </Text>
              </TouchableOpacity>
            ))}
          </View>

          {/* Tab Content */}
          {activeTab === "Lessons" ? (
            <View style={styles.lessonsContainer}>
              {lessons.map((lesson, index) => (
                <TouchableOpacity key={index} style={styles.lessonItem}>
                  <View style={styles.lessonIcon}>
                    <Ionicons name="play" size={16} color={"#95dd22"} />
                  </View>
                  <View style={styles.lessonInfo}>
                    <Text style={styles.lessonTitle}>{lesson.title}</Text>
                    <Text style={styles.lessonDuration}>{lesson.duration}</Text>
                  </View>
                  <Ionicons
                    name="chevron-forward"
                    size={20}
                    color={"#595959"}
                  />
                </TouchableOpacity>
              ))}
            </View>
          ) : (
            <Text style={styles.description}>{course.description}</Text>
          )}
        </ScrollView>
      </View>

      {/* Bottom CTA */}
      <View style={styles.bottomCTA}>
        <Text style={styles.price}>${course.price}</Text>
        <TouchableOpacity style={styles.enrollButton}>
          <Text style={styles.enrollButtonText}>Enroll Now</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
    height: "100%",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#E5E5E5",
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "600",
  },
  scrollContainer: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 140, // Increased to account for bottomCTA height + bottom navigation
  },
  bannerContainer: {
    height: 200,
    backgroundColor: "#E1F5FE",
  },
  courseInfo: {
    padding: 16,
  },
  courseTitle: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 8,
  },
  courseMetaInfo: {
    flexDirection: "row",
    alignItems: "center",
  },
  metaText: {
    fontSize: 14,
    color: "#ffff",
    marginRight: 8,
  },
  ratingContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  ratingText: {
    fontSize: 14,
    fontWeight: "600",
    marginLeft: 4,
  },
  tabsContainer: {
    flexDirection: "row",
    borderBottomWidth: 1,
    borderBottomColor: "#E5E5E5",
    marginBottom: 16,
  },
  tab: {
    flex: 1,
    paddingVertical: 12,
    alignItems: "center",
  },
  activeTab: {
    borderBottomWidth: 2,
    // borderBottomColor: theme.colors.primary,
  },
  tabText: {
    fontSize: 16,
    // color: theme.colors.gray,
  },
  activeTabText: {
    // color: theme.colors.primary,
    fontWeight: "600",
  },
  lessonsContainer: {
    paddingHorizontal: 16,
  },
  lessonItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#E5E5E5",
  },
  lessonIcon: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: "#E1F5FE",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },
  lessonInfo: {
    flex: 1,
  },
  lessonTitle: {
    fontSize: 16,
    fontWeight: "500",
  },
  lessonDuration: {
    fontSize: 14,
    // color: theme.colors.gray,
  },
  description: {
    fontSize: 16,
    lineHeight: 24,
    // color: theme.colors.gray,
    paddingHorizontal: 16,
  },
  bottomCTA: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: "#E5E5E5",
    position: "absolute",
    bottom: 60, // Add space for bottom navigation
    left: 0,
    right: 0,
    backgroundColor: "white",
    elevation: 4, // Android shadow
    shadowColor: "#000", // iOS shadow
    shadowOffset: {
      width: 0,
      height: -2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  price: {
    fontSize: 24,
    fontWeight: "bold",
  },
  enrollButton: {
    // backgroundColor: theme.colors.primary,
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
  },
  enrollButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "600",
  },
});
