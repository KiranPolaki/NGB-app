import React, { useState, useEffect, useCallback, useRef } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  StatusBar,
} from "react-native";
import { useRoute, useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import YoutubePlayer from "react-native-youtube-iframe";
import { useTheme } from "@/context/theme.context";
import { LinearGradient } from "expo-linear-gradient";
import { BlurView } from "expo-blur";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import axios from "axios";

export default function CourseDetails() {
  const { theme } = useTheme();
  const navigation = useNavigation();
  const route = useRoute();
  const insets = useSafeAreaInsets();
  const [activeTab, setActiveTab] = useState("Lessons");
  const [expandedLesson, setExpandedLesson] = useState(null);
  const [course, setCourse] = useState({
    courseId: 1,
    title: "Angular",
    description: "Angular description",
    slug: "angular",
    isPublished: 0,
    createdAt: "2025-01-16 12:23:14",
    updatedAt: "2025-01-16 12:25:36",
    instructorId: "1",
    totalPrice: "12321.0",
    discountedPrice: "12321.0",
    thumbnail:
      "https://fastly.picsum.photos/id/89/536/354.jpg?hmac=Jy1ozDoxWE53y9fhC_6TpYOH-goFkok6mxfBh1-w_4w",
    introVideo: "https://www.youtube.com/watch?v=_1QAJaC6Xwc",
    totalDuration: null,
    sections: [
      {
        sectionId: 1,
        title: "Some new Section",
        description: "New desc",
        isPublished: 0,
        thumbnail:
          "https://fastly.picsum.photos/id/251/536/354.jpg?hmac=KhDUHBrHQSRJYTMoWlVdRR8y3ZhdEKtx4bsBxrEP3SA",
        totalDuration: "1",
        position: 0,
        chapters: [
          {
            chapterId: 1,
            title: "State management",
            description: "description",
            slug: "state-management",
            type: "video",
            typeDetails: "Not Accessible",
            isPublished: 0,
            totalDuration: "0.00",
            content: "some text content",
            thumbnail:
              "https://fastly.picsum.photos/id/251/536/354.jpg?hmac=KhDUHBrHQSRJYTMoWlVdRR8y3ZhdEKtx4bsBxrEP3SA",
            position: 0,
            isFree: 0,
          },
        ],
      },
    ],
  });
  const [currentVideoId, setCurrentVideoId] = useState("");
  const scrollViewRef = useRef(null);

  const scrollToTop = () => {
    scrollViewRef.current?.scrollTo({
      y: 0,
      animated: true,
    });
  };

  function getYouTubeVideoId(url) {
    const urlParams = new URLSearchParams(new URL(url).search);
    return urlParams.get("v");
  }

  const courseId = (route.params as { courseId: string })?.courseId;

  const lessons = [
    {
      title: "Introduction to Strength Training",
      duration: "15:30 min",
      videoId: "abc123",
      description:
        "Learn the foundational principles of strength training and understand how to approach this comprehensive course. We'll cover safety basics, equipment needs, and what to expect from your journey.",
    },
    {
      title: "Proper Form and Technique Basics",
      duration: "25:45 min",
      videoId: "def456",
      description:
        "Master the essential techniques that will form the backbone of your strength training journey. Focus on proper posture, breathing, and movement patterns to maximize results and prevent injuries.",
    },
    {
      title: "Building Your Core Strength",
      duration: "40:20 min",
      videoId: "ghi789",
      description:
        "Discover how to develop a strong core foundation, essential for all strength training exercises. Learn progressive core strengthening techniques and stability exercises.",
    },
    {
      title: "Advanced Lifting Techniques",
      duration: "55:10 min",
      videoId: "jkl012",
      description:
        "Take your training to the next level with advanced compound movements and specialized lifting techniques. Learn proper form for deadlifts, squats, and Olympic lifts.",
    },
  ];

  useEffect(() => {
    getCourseDetails();
    setCurrentVideoId(getYouTubeVideoId(course.introVideo));
  }, []);

  const getCourseDetails = async () => {
    const response = await axios.get(
      `https://ngb-api.vercel.app/api/learn/courses/1?userId=${courseId}`,
      {
        headers: {
          //user token here
          Authorization: `Bearer 4a3750bd-2b34-4d96-87ad-e9dda6fbd7d3`,
        },
      }
    );
    const data = await response.data;
    setCourse(data);
  };

  return (
    <LinearGradient
      colors={
        theme.dark ? ["#3f350d", "#32322a", "#121212"] : ["#fff", "#f7f7f7"]
      }
      start={{ x: 0, y: 0 }}
      end={{ x: 0, y: 1 }}
      style={[styles.container, { paddingTop: insets.top }]}
    >
      <StatusBar barStyle={theme.dark ? "light-content" : "dark-content"} />

      <View
        // intensity={theme.dark ? 20 : 40}
        // tint={theme.dark ? "dark" : "light"}
        style={styles.header}
      >
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons
            name="arrow-back"
            size={24}
            color={theme.dark ? "#fff" : "#000"}
          />
        </TouchableOpacity>
        {/* <Text
          style={[styles.headerTitle, { color: theme.dark ? "#fff" : "#000" }]}
        >
          Course Overview
        </Text> */}
        {/* <TouchableOpacity>
          <Ionicons
            name="heart-outline"
            size={24}
            color={theme.dark ? "#fff" : "#000"}
          />
        </TouchableOpacity> */}
      </View>

      <View style={styles.scrollContainer}>
        <ScrollView
          contentContainerStyle={[
            styles.scrollContent,
            { paddingBottom: insets.bottom + 100 },
          ]}
          ref={scrollViewRef}
        >
          <BlurView
            intensity={theme.dark ? 20 : 40}
            tint={theme.dark ? "dark" : "light"}
            style={styles.videoCard}
          >
            <View style={styles.bannerContainer}>
              <YoutubePlayer
                height={200}
                play={false}
                videoId={currentVideoId}
                onChangeState={() => {}}
              />
            </View>
          </BlurView>

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
                {course?.title}
              </Text>
              <View style={styles.courseMetaInfo}>
                <Text
                  style={[
                    styles.metaText,
                    { color: theme.dark ? "rgba(255,255,255,0.7)" : "#666" },
                  ]}
                >
                  {course?.totalDuration}
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
                  {course.sections.length} lessons
                </Text>
                <View style={styles.ratingContainer}>
                  <Ionicons name="star" size={16} color="#FFD700" />
                  <Text
                    style={[
                      styles.ratingText,
                      { color: theme.dark ? "#FFD700" : "#000" },
                    ]}
                  >
                    4.3
                    {/* {course.rating} */}
                  </Text>
                </View>
              </View>
            </View>
          </BlurView>

          {/* Tabs Card */}
          <BlurView
            intensity={theme.dark ? 20 : 40}
            tint={theme.dark ? "dark" : "light"}
            style={styles.tabsCard}
          >
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
                      { color: theme.dark ? "rgba(255,255,255,0.6)" : "#666" },
                      activeTab === tab && styles.activeTabText,
                    ]}
                  >
                    {tab}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
            {activeTab === "Lessons" ? (
              <View style={styles.lessonsContainer}>
                {course.sections.map((lesson, index) => (
                  <View key={index}>
                    <TouchableOpacity
                      style={styles.lessonItem}
                      onPress={() =>
                        setExpandedLesson(
                          expandedLesson === index ? null : index
                        )
                      }
                    >
                      {/* <View style={styles.lessonIcon}>
                        <Ionicons name="play" size={16} color="#95dd22" />
                      </View> */}
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
                          {/* TODO: send the time details in a format */}
                          {lesson.totalDuration} min
                        </Text>
                      </View>
                      <Ionicons
                        name={
                          expandedLesson === index
                            ? "chevron-down"
                            : "chevron-forward"
                        }
                        size={20}
                        color={theme.dark ? "rgba(255,255,255,0.6)" : "#666"}
                      />
                    </TouchableOpacity>
                    {expandedLesson === index && (
                      <View style={styles.lessonDescription}>
                        {lesson.chapters.map((chapter) => {
                          return (
                            <TouchableOpacity
                              style={styles.lessonItem}
                              onPress={() => {
                                setCurrentVideoId(
                                  getYouTubeVideoId(chapter.typeDetails)
                                );
                                scrollToTop();
                              }}
                            >
                              <View style={styles.lessonIcon}>
                                <Ionicons
                                  name="play"
                                  size={16}
                                  color="#95dd22"
                                />
                              </View>
                              <View style={styles.lessonInfo}>
                                <Text
                                  style={[
                                    styles.lessonTitle,
                                    { color: theme.dark ? "#fff" : "#000" },
                                  ]}
                                >
                                  {chapter.title}
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
                                  {/* TODO: send the time details in a format */}
                                  {chapter.totalDuration} min
                                </Text>
                              </View>
                            </TouchableOpacity>
                          );
                        })}
                      </View>
                    )}
                  </View>
                ))}
              </View>
            ) : (
              <View style={styles.descriptionContainer}>
                <Text
                  style={[
                    styles.description,
                    { color: theme.dark ? "rgba(255,255,255,0.7)" : "#666" },
                  ]}
                >
                  {course.description}
                </Text>

                <View style={styles.instructorSection}>
                  <Text
                    style={[
                      styles.sectionTitle,
                      { color: theme.dark ? "#fff" : "#000" },
                    ]}
                  >
                    About the Instructor
                  </Text>
                  <View style={styles.instructorHeader}>
                    <View style={styles.instructorAvatar}>
                      <Text style={styles.avatarText}>
                        {/* {course.instructor.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")} */}
                      </Text>
                    </View>
                    <View style={styles.instructorDetails}>
                      <Text
                        style={[
                          styles.instructorName,
                          { color: theme.dark ? "#fff" : "#000" },
                        ]}
                      >
                        {/* {course.instructor.name} */}
                        Naween
                      </Text>
                      <Text
                        style={[
                          styles.instructorTitle,
                          {
                            color: theme.dark
                              ? "rgba(255,255,255,0.7)"
                              : "#666",
                          },
                        ]}
                      >
                        {/* {course.instructor.title} */}
                        Golden Boy
                      </Text>
                      <Text
                        style={[
                          styles.instructorExperience,
                          { color: theme.dark ? "#95dd22" : "#658717" },
                        ]}
                      >
                        {/* {course.instructor.experience} experience */}2
                        experience
                      </Text>
                    </View>
                  </View>
                  <Text
                    style={[
                      styles.instructorDescription,
                      { color: theme.dark ? "rgba(255,255,255,0.7)" : "#666" },
                    ]}
                  >
                    {/* {course.instructor.description} */}
                    He is a famous influencer
                  </Text>
                  <View style={styles.achievementsList}>
                    {/* {course.instructor.achievements.map(
                      (achievement, index) => (
                        <View key={index} style={styles.achievementItem}>
                          <Ionicons
                            name="checkmark-circle"
                            size={16}
                            color="#95dd22"
                          />
                          <Text
                            style={[
                              styles.achievementText,
                              {
                                color: theme.dark
                                  ? "rgba(255,255,255,0.7)"
                                  : "#666",
                              },
                            ]}
                          >
                            {achievement}
                          </Text>
                        </View>
                      )
                    )} */}
                  </View>
                </View>
              </View>
            )}
          </BlurView>
        </ScrollView>
      </View>

      {/* Bottom CTA */}
      <BlurView
        intensity={theme.dark ? 20 : 40}
        tint={theme.dark ? "dark" : "light"}
        style={[styles.bottomCTA, { paddingBottom: insets.bottom + 16 }]}
      >
        <Text style={[styles.price, { color: theme.dark ? "#fff" : "#000" }]}>
          ₹{course.totalPrice}
        </Text>
        <TouchableOpacity style={styles.enrollButton}>
          <Text style={styles.enrollButtonText}>Enroll Now</Text>
        </TouchableOpacity>
      </BlurView>
    </LinearGradient>
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
  tabsCard: {
    borderRadius: 24,
    padding: 24,
    overflow: "hidden",
    backgroundColor: "rgba(255,255,255,0.1)",
  },
  tabsContainer: {
    flexDirection: "row",
    borderBottomWidth: 1,
    borderBottomColor: "rgba(255,255,255,0.1)",
  },
  tab: {
    flex: 1,
    paddingVertical: 12,
    alignItems: "center",
  },
  activeTab: {
    borderBottomWidth: 2,
    borderBottomColor: "#95dd22",
  },
  tabText: {
    fontSize: 16,
    fontFamily: "Poppins_400Regular",
  },
  activeTabText: {
    color: "#95dd22",
    fontFamily: "Poppins_600SemiBold",
  },
  descriptionContainer: {
    padding: 16,
    gap: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontFamily: "Poppins_600SemiBold",
    marginBottom: 16,
  },
  instructorSection: {
    marginTop: 24,
  },
  instructorHeader: {
    flexDirection: "row",
    marginBottom: 16,
  },
  instructorAvatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: "#95dd22",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 16,
  },
  avatarText: {
    color: "#000",
    fontSize: 24,
    fontFamily: "Poppins_600SemiBold",
  },
  instructorDetails: {
    flex: 1,
  },
  instructorName: {
    fontSize: 18,
    fontFamily: "Poppins_600SemiBold",
    marginBottom: 4,
  },
  instructorTitle: {
    fontSize: 14,
    fontFamily: "Poppins_400Regular",
    marginBottom: 4,
  },
  instructorExperience: {
    fontSize: 14,
    fontFamily: "Poppins_500Medium",
  },
  instructorDescription: {
    fontSize: 14,
    lineHeight: 22,
    fontFamily: "Poppins_400Regular",
    marginBottom: 16,
  },
  achievementsList: {
    gap: 8,
  },
  achievementItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  achievementText: {
    fontSize: 14,
    fontFamily: "Poppins_400Regular",
  },
  lessonDescription: {
    padding: 16,
    // backgroundColor: theme.dark ? "rgba(255,255,255,0.05)" : "rgba(0,0,0,0.05)",
    borderBottomLeftRadius: 12,
    borderBottomRightRadius: 12,
    marginTop: -8,
  },
  lessonDescriptionText: {
    fontSize: 14,
    lineHeight: 20,
    fontFamily: "Poppins_400Regular",
  },
});
