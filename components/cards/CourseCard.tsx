import React from "react";
import { View, Text, Image, TouchableOpacity } from "react-native";
import { scale, verticalScale } from "react-native-size-matters";
import { fontSizes, windowWidth } from "@/themes/app.constant";
import { useTheme } from "@/context/theme.context";

const CourseCard = ({ course }) => {
  const { theme } = useTheme();

  const formatPrice = (price) => {
    return parseFloat(price) === 0
      ? "Free"
      : `$${parseFloat(price).toFixed(2)}`;
  };

  return (
    <TouchableOpacity
      style={{
        width: windowWidth(340),
        marginHorizontal: windowWidth(20),
        marginBottom: verticalScale(15),
        borderRadius: scale(15),
        backgroundColor: theme.dark ? "#1E1E1E" : "#F5F5F5",
        overflow: "hidden",
        elevation: 3,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
      }}
    >
      <Image
        source={{ uri: course.thumbnail }}
        style={{
          width: "100%",
          height: verticalScale(180),
          resizeMode: "cover",
        }}
      />

      <View style={{ padding: scale(15) }}>
        <Text
          style={{
            fontSize: fontSizes.FONT20,
            fontFamily: "Poppins_500Medium",
            color: theme.dark ? "#fff" : "#000",
            marginBottom: verticalScale(5),
          }}
          numberOfLines={2}
        >
          {course.title}
        </Text>

        <Text
          style={{
            fontSize: fontSizes.FONT14,
            fontFamily: "Poppins_400Regular",
            color: theme.dark ? "#A0A0A0" : "#666",
            marginBottom: verticalScale(10),
          }}
          numberOfLines={2}
        >
          {course.description}
        </Text>

        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            {parseFloat(course.discountedPrice) <
              parseFloat(course.totalPrice) && (
              <Text
                style={{
                  fontSize: fontSizes.FONT16,
                  fontFamily: "Poppins_400Regular",
                  color: theme.dark ? "#A0A0A0" : "#666",
                  textDecorationLine: "line-through",
                  marginRight: scale(8),
                }}
              >
                {formatPrice(course.totalPrice)}
              </Text>
            )}
            <Text
              style={{
                fontSize: fontSizes.FONT18,
                fontFamily: "Poppins_500Medium",
                color: "#bce973",
              }}
            >
              {formatPrice(course.discountedPrice)}
            </Text>
          </View>

          <View
            style={{
              backgroundColor: course.isPublished ? "#bce973" : "#FFA500",
              paddingHorizontal: scale(10),
              paddingVertical: verticalScale(5),
              borderRadius: scale(5),
            }}
          >
            <Text
              style={{
                fontSize: fontSizes.FONT12,
                fontFamily: "Poppins_400Regular",
                color: "#000",
              }}
            >
              {course.isPublished ? "Published" : "Draft"}
            </Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default CourseCard;
