import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  ScrollView,
} from "react-native";
import { useRoute } from "@react-navigation/native";
// import { theme } from "@/constants/Colors";
import CourseContent from "@/components/learn/CourseContent";
import Header from "@/components/ui/Header";
import ScreenWrapper from "@/components/ui/ScreenWrapper";
// import { hp, wp } from "@/lib/commonHelper";
import { Ionicons } from "@expo/vector-icons";
import Video from "react-native-video";
import { useVideoPlayer, VideoView } from "expo-video";
import { useEvent } from "expo";
import { HEIGHT } from "@/configs/constants";

export default function CourseDetails() {
  const route = useRoute();
  const [activeTab, setActiveTab] = useState("content"); // Active tab: 'content' or 'resources'
  const [course, setCourse] = useState({
    name: "React Native Basics",
    description:
      "This course introduces you to the fundamentals of React Native, covering essential topics to get started with mobile app development.",
    url: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4", // Dummy video placeholder
    instructor: "John Doe",
  });

  const [resources, setResources] = useState([
    {
      id: 1,
      name: "React Native Guide.pdf",
      url: "https://example.com/guide.pdf",
    },
    { id: 2, name: "Advanced Tips.pdf", url: "https://example.com/tips.pdf" },
  ]);

  const [userProgress, setUserProgress] = useState<any[]>([]);

  useEffect(() => {
    console.log(route.params);
    // if (route?.params?.courseData) {
    //   setCourse(route.params.courseData);
    // }
    getCourseProgress();
  }, [route]);

  const getCourseProgress = () => {
    const progress = [
      { id: 1, courseId: "course123", courseContentId: "content123" },
      { id: 2, courseId: "course123", courseContentId: "content124" },
    ];
    setUserProgress(progress);
  };
  const videoSource =
    "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4";

  const downloadPDF = (url: string) => {
    console.log(`Downloading PDF from ${url}`);
    // Integrate file downloader logic (e.g., FileSystem or external libraries)
  };

  const player = useVideoPlayer(course.url, (player) => {
    player.loop = true;
    player.play();
  });

  const { isPlaying } = useEvent(player, "playingChange", {
    isPlaying: player.playing,
  });

  return (
    <ScreenWrapper bg="white">
      <View style={styles.container}>
        {/* Header */}
        <Header title={course.name} />

        <ScrollView showsVerticalScrollIndicator={false}>
          {/* Video Player Placeholder */}
          <View style={styles.videoPlayer}>
            <VideoView
              style={styles.backgroundVideo}
              player={player}
              allowsFullscreen
              allowsPictureInPicture
            />
          </View>

          {/* Course Title and Description */}
          <View style={styles.infoSection}>
            <Text style={styles.courseTitle}>{course.name}</Text>
            <Text style={styles.courseDescription}>{course.description}</Text>
            <Text style={styles.instructor}>By {course.instructor}</Text>
          </View>

          {/* Tabs: Course Content & Resources */}
          <View style={styles.tabs}>
            <TouchableOpacity
              style={[
                styles.tabButton,
                activeTab === "content" && styles.activeTab,
              ]}
              onPress={() => setActiveTab("content")}
            >
              <Text
                style={[
                  styles.tabText,
                  activeTab === "content" && styles.activeTabText,
                ]}
              >
                Course Content
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.tabButton,
                activeTab === "resources" && styles.activeTab,
              ]}
              onPress={() => setActiveTab("resources")}
            >
              <Text
                style={[
                  styles.tabText,
                  activeTab === "resources" && styles.activeTabText,
                ]}
              >
                Resources
              </Text>
            </TouchableOpacity>
          </View>

          {/* Tab Content */}
          {activeTab === "content" ? (
            <CourseContent
              course={course}
              userProgress={userProgress}
              courseType={"Video"} // Dummy course type
            />
          ) : (
            <View style={styles.resourcesSection}>
              {resources.map((resource) => (
                <TouchableOpacity
                  key={resource.id}
                  style={styles.resourceItem}
                  onPress={() => downloadPDF(resource.url)}
                >
                  <Ionicons
                    name="document-text-outline"
                    size={24}
                    // color={theme.colors.primary}
                  />
                  <Text style={styles.resourceText}>{resource.name}</Text>
                </TouchableOpacity>
              ))}
            </View>
          )}
        </ScrollView>
      </View>
    </ScreenWrapper>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    marginBottom: 10,
    // marginHorizontal: wp(4),
    // height: HEIGHT(100),
  },
  videoPlayer: {
    height: 200,
    width: "100%",
    backgroundColor: "#000",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
    marginTop: 10,
  },
  infoSection: {
    marginTop: 15,
    paddingHorizontal: 10,
  },
  courseTitle: {
    fontSize: 20,
    fontWeight: "bold",
    // color: theme.colors.dark,
  },
  courseDescription: {
    fontSize: 14,
    // color: theme.colors.gray,
    lineHeight: 20,
    marginVertical: 5,
  },
  instructor: {
    fontSize: 13,
    // color: theme.colors.primary,
    fontWeight: "600",
  },
  tabs: {
    flexDirection: "row",
    marginTop: 15,
    marginBottom: 10,
    justifyContent: "space-around",
  },
  tabButton: {
    flex: 1,
    alignItems: "center",
    paddingVertical: 10,
    borderRadius: 5,
    backgroundColor: "#f0f0f0",
    marginHorizontal: 5,
  },
  activeTab: {
    // backgroundColor: theme.colors.primary,
  },
  tabText: {
    fontSize: 14,
    // color: theme.colors.dark,
  },
  activeTabText: {
    color: "#fff",
    fontWeight: "bold",
  },
  resourcesSection: {
    marginTop: 10,
    padding: 10,
    backgroundColor: "#f9f9f9",
    borderRadius: 8,
  },
  resourceItem: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  resourceText: {
    fontSize: 14,
    // color: theme.colors.dark,
    marginLeft: 10,
  },
  backgroundVideo: {
    width: "100%", // Full screen width
    height: "100%", // Full screen height
  },
});
