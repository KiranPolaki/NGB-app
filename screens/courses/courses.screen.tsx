import {
  Image,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import { useTheme } from "@/context/theme.context";
import { useBottomTabBarHeight } from "@react-navigation/bottom-tabs";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  fontSizes,
  IsHaveNotch,
  IsIPAD,
  windowHeight,
  windowWidth,
} from "@/themes/app.constant";
import GradiantText from "@/components/common/gradient.text";
import { moderateScale, scale, verticalScale } from "react-native-size-matters";
import SkeltonLoader from "@/utils/skelton";
import CourseCard from "@/components/cards/CourseCard";
import axios from "axios";
import { FlatList } from "react-native";
import { Feather } from "@expo/vector-icons";
import { router } from "expo-router";
import { BlurView } from "expo-blur";
import { LinearGradient } from "expo-linear-gradient";

export default function CoursesScreen() {
  const { theme } = useTheme();
  const bottomTabBarHeight = useBottomTabBarHeight();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(true);
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get(
        "https://ngb-api.vercel.app/api/learn/courses?userId=1"
      );
      setCourses(response.data.courses);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching data:", error);
      // setLoading(true);
    }
  };

  const onPressCourse = (course: any) => {
    router.push("/(tabs)/courses/[courseId]");
  };

  const renderCourseItem = ({ item }: { item: any }) => (
    <TouchableOpacity
      onPress={() => {
        router.push({
          pathname: "/common/CourseDetails",
          params: { courseId: item.courseId },
        });
      }}
      key={item.courseId}
      activeOpacity={0.9}
    >
      <BlurView
        intensity={theme.dark ? 20 : 40}
        tint={theme.dark ? "dark" : "light"}
        style={styles.card}
      >
        <View style={styles.imageContainer}>
          <Image
            source={{ uri: item?.thumbnail }}
            style={styles.courseImage}
            resizeMode="cover"
          />
          {/* <TouchableOpacity style={styles.favoriteButton}>
            <Feather name="heart" size={20} color="white" />
          </TouchableOpacity> */}
        </View>
        <View style={styles.courseDetails}>
          <Text style={styles.courseTitle}>{item?.title}</Text>
          {/* <Text style={styles.courseLevel}>
            {item?.level} · {item?.chCount} lessons
          </Text> */}
          <View style={styles.courseStats}>
            {/* <View style={styles.ratingContainer}>
              <Feather name="star" size={14} color="#FFD700" />
              <Text style={styles.ratingText}>{item.rating}</Text>
            </View> */}
            <Text style={styles.durationText}>{item?.totalDuration}</Text>
          </View>
        </View>
      </BlurView>
    </TouchableOpacity>
  );

  return (
    // <SafeAreaView
    //   style={{
    //     flex: 1,
    //     backgroundColor: theme.dark ? "#30400d" : "#fff",
    //   }}
    // >
    //</SafeAreaView>
    <LinearGradient
      colors={
        theme.dark ? ["#30400d", "#2c322a", "#121212"] : ["#fff", "#f7f7f7"]
      }
      start={{ x: 0, y: 0 }}
      end={{ x: 0, y: 1 }}
      style={[
        styles.container,
        {
          flex: 1,
          backgroundColor: theme.dark ? "#101010" : "#fff",
        },
        {
          overflow: "hidden",
          backgroundColor: "transparent",
          paddingTop: IsHaveNotch
            ? IsIPAD
              ? verticalScale(30)
              : verticalScale(40)
            : verticalScale(30),
        },
      ]}
    >
      <StatusBar barStyle={!theme.dark ? "dark-content" : "light-content"} />

      <View style={{ marginHorizontal: windowWidth(20) }}>
        <View style={{ flexDirection: "row", marginTop: windowHeight(8) }}>
          <Text
            style={{
              fontSize: fontSizes.FONT35,
              fontFamily: "Poppins_500Medium",
              color: theme.dark ? "#fff" : "#000",
              fontWeight: 600,
            }}
          >
            All
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
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          <Text
            style={{
              fontFamily: "Poppins_400Regular",
              fontSize: fontSizes.FONT18,
              paddingLeft: windowWidth(5),
              paddingBottom: windowHeight(20),
              color: theme.dark ? "#ffff" : "#000",
            }}
          >
            Our comprehensive Courses by best instrctors
          </Text>
          <Text
            style={{
              fontFamily: "Poppins_400Regular",
              fontSize: fontSizes.FONT18,
              paddingLeft: windowWidth(5),
              paddingBottom: windowHeight(20),
              color: theme.dark ? "#ffff" : "#000",
            }}
          >
            🔥
          </Text>
        </View>
      </View>

      {loading ? (
        <>
          <ScrollView showsVerticalScrollIndicator={false}>
            <SkeltonLoader />
            <SkeltonLoader />
            <SkeltonLoader />
          </ScrollView>
        </>
      ) : (
        <FlatList
          data={courses}
          keyExtractor={(item) => item.id}
          renderItem={renderCourseItem}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{
            paddingHorizontal: windowWidth(20),
            paddingBottom: bottomTabBarHeight,
          }}
        />
      )}
    </LinearGradient>
  );
}
function onPressCourse(item: any): void {
  throw new Error("Function not implemented.");
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 16,
  },
  card: {
    marginBottom: 20,
    borderRadius: 24,
    overflow: "hidden",
    backgroundColor: "rgba(255, 255, 255, 0.1)", // Subtle background for glass effect
  },
  imageContainer: {
    width: "100%",
    height: IsIPAD ? moderateScale(220) : moderateScale(180),
    borderRadius: 20,
    overflow: "hidden", // Ensures image respects border radius
    marginBottom: 8,
  },
  courseImage: {
    width: "100%",
    height: "100%",
    borderRadius: 20,
  },
  courseDetails: {
    padding: 16,
  },
  courseTitle: {
    fontSize: 18,
    fontWeight: 600,
    fontFamily: "Poppins_600SemiBold",
    color: "#FFFFFF",
    marginBottom: 8,
  },
  courseLevel: {
    fontSize: 14,
    fontFamily: "Poppins_400Regular",
    color: "rgba(255, 255, 255, 0.8)",
    marginBottom: 12,
  },
  courseStats: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  ratingContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(255, 255, 255, 0.1)",
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
  },
  ratingText: {
    marginLeft: 6,
    fontSize: 14,
    fontFamily: "Poppins_500Medium",
    color: "#FFD700",
  },
  durationText: {
    fontSize: 14,
    fontFamily: "Poppins_400Regular",
    color: "rgba(255, 255, 255, 0.7)",
  },
  favoriteButton: {
    position: "absolute",
    top: 12,
    right: 12,
    backgroundColor: "rgba(0, 0, 0, 0.3)",
    padding: 8,
    borderRadius: 12,
  },
});
