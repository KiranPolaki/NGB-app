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
import { scale, verticalScale } from "react-native-size-matters";
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
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const gymCourses = [
        {
          id: "gym1",
          title: "Beginner's Strength Training",
          desc: "Learn the basics of weightlifting and strength training",
          image:
            "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80",
          level: "Beginner",
          chCount: 12,
          rating: 4.8,
          duration: "4h 30min",
        },
        {
          id: "gym2",
          title: "HIIT Cardio Workout",
          desc: "High-intensity interval training for maximum calorie burn",
          image:
            "https://images.unsplash.com/photo-1549576490-b0b4831ef60a?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80",
          level: "Intermediate",
          chCount: 8,
          rating: 4.9,
          duration: "3h 15min",
        },
        {
          id: "gym3",
          title: "Yoga for Flexibility",
          desc: "Improve your flexibility and balance with yoga",
          image:
            "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8MHx8&auto=format&fit=crop&w=1520&q=80",
          level: "All Levels",
          chCount: 10,
          rating: 4.7,
          duration: "5h 45min",
        },
        {
          id: "gym4",
          title: "Advanced Powerlifting",
          desc: "Take your strength to the next level with advanced powerlifting techniques",
          image:
            "https://images.unsplash.com/photo-1579758629937-036021eb4203?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80",
          level: "Advanced",
          chCount: 15,
          rating: 4.9,
          duration: "6h 20min",
        },
        {
          id: "gym5",
          title: "Functional Training Basics",
          desc: "Enhance your everyday movement with functional training",
          image:
            "https://images.unsplash.com/photo-1571019613914-85f342c6a6f6?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80",
          level: "Beginner",
          chCount: 9,
          rating: 4.6,
          duration: "2h 50min",
        },
        {
          id: "gym6",
          title: "Core Strength Mastery",
          desc: "Build a solid core to improve balance and stability",
          image:
            "https://images.unsplash.com/photo-1554284126-44f636a72427?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80",
          level: "Intermediate",
          chCount: 7,
          rating: 4.8,
          duration: "3h 10min",
        },
        {
          id: "gym7",
          title: "Meditation and Relaxation",
          desc: "Unwind and refresh with guided meditation sessions",
          image:
            "https://images.unsplash.com/photo-1523662175815-16a2e22eb0c5?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80",
          level: "All Levels",
          chCount: 5,
          rating: 4.5,
          duration: "2h 30min",
        },
      ];
      setCourses(gymCourses);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching data:", error);
      setLoading(false);
    }
  };

  const onPressCourse = (course: any) => {
    router.push("/(tabs)/courses/[courseId]");
  };

  const renderCourseItem = ({ item }: { item: any }) => (
    <TouchableOpacity onPress={() => onPressCourse(item)}>
      <BlurView
        intensity={theme.dark ? 70 : 80}
        style={[
          styles.card,
          {
            borderTopLeftRadius: scale(20),
            borderTopRightRadius: scale(20),
            overflow: "hidden",
            backgroundColor: "transparent",
          },
        ]}
      >
        <Image source={{ uri: item.image }} style={styles.courseImage} />
        <View style={styles.courseDetails}>
          <Text style={styles.courseTitle}>{item.title}</Text>
          <Text style={styles.courseLevel}>
            {item.level} · {item.chCount} lessons
          </Text>
          <View style={styles.courseStats}>
            <View style={styles.ratingContainer}>
              <Feather name="star" size={14} color="#FFD700" />
              <Text style={styles.ratingText}>{item.rating}</Text>
            </View>
            <Text style={styles.durationText}>{item.duration}</Text>
          </View>
        </View>
        <TouchableOpacity style={styles.favoriteButton}>
          <Feather name="heart" size={24} color={"white"} />
        </TouchableOpacity>
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
          borderTopLeftRadius: scale(20),
          borderTopRightRadius: scale(20),
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
          {/* <View
            style={{
              backgroundColor: "#bce973",
              width: windowWidth(15),
              height: windowWidth(15),
              borderRadius: 100,
              marginTop: verticalScale(-18),
            }}
          /> */}

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
        <View>
          <SkeltonLoader />
          <SkeltonLoader />
        </View>
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
  searchContainer: {
    flexDirection: "row",
    marginBottom: 16,
  },
  searchInput: {
    flex: 1,
    height: 44,
    borderRadius: 22,
    paddingHorizontal: 16,
    backgroundColor: "#F0F0F0",
    marginRight: 8,
  },
  filterButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    // backgroundColor: ,
    justifyContent: "center",
    alignItems: "center",
  },
  card: {
    flexDirection: "row",
    backgroundColor: "#",
    borderRadius: 12,
    marginBottom: 16,
    padding: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  courseImage: {
    width: 80,
    height: 80,
    borderRadius: 8,
  },
  courseDetails: {
    flex: 1,
    marginLeft: 12,
  },
  courseTitle: {
    fontSize: 16,
    fontWeight: "bold",
    // color: theme.colors.dark,
    marginBottom: 4,
  },
  courseLevel: {
    fontSize: 14,
    // color: theme.colors.gray,
    marginBottom: 4,
  },
  courseStats: {
    flexDirection: "row",
    alignItems: "center",
  },
  ratingContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginRight: 8,
  },
  ratingText: {
    marginLeft: 4,
    fontSize: 14,
    // color: theme.colors.dark,
  },
  durationText: {
    fontSize: 14,
    // color: theme.colors.gray,
  },
  favoriteButton: {
    padding: 4,
  },
});
