import { View, Text } from "react-native";
import React, { useEffect, useState } from "react";
import { FlatList } from "react-native";
import { Ionicons } from "@expo/vector-icons";
// import { theme } from "@/constants/Colors";
import { TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";

export default function CourseContent({
  course,
  userProgress,
  courseType,
}: {
  course: any;
  userProgress: any;
  courseType: any;
}) {
  const navigation = useNavigation();
  const [courseCh, setCourseCh] = useState<any[]>();
  const fetchData = async () => {
    try {
      const response = await fetch(
        "https://ngb-api.vercel.app/api/courses/" +
          (Math.floor(Math.random() * 6) + 1)
      ); // API URL
      const json = await response.json(); // Parse the response as JSON
      //setCourseList(json.courses);  // Set the fetched data
      console.log(json);
      setCourseCh(json.chapters);
    } catch (error) {
      console.error("Error fetching data:", error); // Handle any error
    } finally {
    }
  };

  course.Topic = [
    {
      Topic: "Hello",
      name: "Hello",
    },
    {
      Topic: "Hello",
      name: "Hello",
    },
    {
      Topic: "Hello",
      name: "Hello",
    },
    {
      Topic: "Hello",
      name: "Hello",
    },
    {
      Topic: "Hello",
      name: "Hello",
    },
    {
      Topic: "Hello",
      name: "Hello",
    },
    {
      Topic: "Hello",
      name: "Hello",
    },
    {
      Topic: "Hello",
      name: "Hello",
    },
    {
      Topic: "Hello",
      name: "Hello",
    },
    {
      Topic: "Hello",
      name: "Hello",
    },
    {
      Topic: "Hello",
      name: "Hello",
    },
    {
      Topic: "Hello",
      name: "Hello",
    },
    {
      Topic: "Hello",
      name: "Hello",
    },
    {
      Topic: "Hello",
      name: "Hello",
    },
    {
      Topic: "Hello",
      name: "Hello",
    },
    {
      Topic: "Hello",
      name: "Hello",
    },
    {
      Topic: "Hello",
      name: "Hello",
    },
  ];

  useEffect(() => {
    fetchData();
    console.log("userProgress", userProgress);
  }, []);

  // const checkUserProgress=(contentId)=>{
  //   return userProgress.find(item=>item.courseContentId==contentId)
  // }

  // const onChapterPress=(courseContent)=>{
  //   if(courseType=='text')
  //   {
  //   navigation.navigate('course-chapter',
  //   {courseContent:courseContent,
  //     courseId:course.id,
  //   })
  // }
  // else{
  //   navigation.navigate('play-video',
  //   {
  //     courseContent:courseContent,
  //     courseId:course.id,
  //   })
  // }
  // }

  const checkUserProgress = (contentId: any) => {
    return true;
  };

  // const onChapterPress=(courseContent)=>{
  //   if(courseType=='text')
  //   {
  //   navigation.navigate('course-chapter',
  //   {courseContent:courseContent,
  //     courseId:course.id,
  //   })
  // }
  // else{
  //   navigation.navigate('play-video',
  //   {
  //     courseContent:courseContent,
  //     courseId:course.id,
  //   })
  // }
  // }

  return (
    <View style={{ marginTop: 10 }}>
      <FlatList
        style={{ marginTop: 10 }}
        data={courseCh}
        ListHeaderComponent={
          <Text style={{ fontWeight: "bold", fontSize: 16, marginBottom: 10 }}>
            Course Contents
          </Text>
        }
        renderItem={({ item, index }) => (
          // <TouchableOpacity onPress={()=>onChapterPress(item)} style={{display:'flex',
          <TouchableOpacity
            onPress={() => {}}
            style={{
              display: "flex",
              flexDirection: "row",
              // backgroundColor: theme.light.background,
              marginBottom: 7,
              padding: 13,
              alignItems: "center",
              // borderRadius: theme.radius.lg * 1.1,
              borderCurve: "continuous",
              paddingVertical: 12,
              borderWidth: 0.5,
              // borderColor: theme.colors.gray,
            }}
          >
            {checkUserProgress(item.id) ? (
              <Ionicons
                name="checkmark-circle"
                size={24}
                // color={theme.colors.primary}
                style={{ marginRight: 20 }}
              />
            ) : (
              <Text
                style={{
                  fontWeight: "bold",
                  fontSize: 20,
                  // color: theme.colors.gray,
                  marginRight: 20,
                }}
              >
                {index + 1}
              </Text>
            )}
            <Text style={{ fontSize: 15, fontWeight: "bold" }}>
              {item.title ? item.title : item.name}
            </Text>
            <Ionicons
              name="play-circle"
              size={24}
              style={{ position: "absolute", right: 10 }}
              // color={theme.colors.primary}
            />
          </TouchableOpacity>
        )}
      />
    </View>
  );
}
