import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Pressable,
  Platform,
  Modal,
} from "react-native";
import React, { useState } from "react";
import { Defs, RadialGradient, Rect, Stop, Svg } from "react-native-svg";
import { HEIGHT, WIDTH } from "@/configs/constants";
import { moderateScale, scale, verticalScale } from "react-native-size-matters";
import {
  fontSizes,
  SCREEN_WIDTH,
  windowHeight,
  windowWidth,
} from "@/themes/app.constant";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from "@expo/vector-icons";
import { BlurView } from "expo-blur";

export default function Slide({
  slide,
  index,
  setIndex,
  totalSlides,
}: {
  slide: onBoardingSlidesTypes;
  index: number;
  setIndex: (value: number) => void;
  totalSlides: number;
}) {
  const [modalVisible, setModalVisible] = useState(false);

  const handlePress = (index: number, setIndex: (index: number) => void) => {
    if (index === 2) {
      setModalVisible(true);
    } else {
      setIndex(index + 1);
    }
  };

  const renderBackground = () => {
    if (Platform.OS === "ios") {
      return (
        <>
          <Svg style={StyleSheet.absoluteFill}>
            <Defs>
              <RadialGradient id="gradient" cx="50%" cy="35%">
                <Stop offset="0%" stopColor={`${slide.color}99`} />
                <Stop offset="100%" stopColor={`${slide.color}CC`} />
              </RadialGradient>
            </Defs>
            <Rect
              x={0}
              y={0}
              width={WIDTH}
              height={HEIGHT}
              fill="url(#gradient)"
            />
          </Svg>
          <BlurView intensity={80} tint="dark" style={StyleSheet.absoluteFill}>
            <View style={styles.container}>
              <View>{slide.image}</View>
              <View>
                <View style={styles.textContainer}>
                  <Text style={styles.title}>{slide.title}</Text>
                  <Text style={styles.title}>{slide.secondTitle}</Text>
                  <Text style={styles.subtitle}>{slide.subTitle}</Text>
                </View>
              </View>
            </View>
          </BlurView>
        </>
      );
    }

    return (
      <>
        <View
          style={[StyleSheet.absoluteFill, { backgroundColor: slide.color }]}
        >
          <View style={styles.container}>
            <View>{slide.image}</View>
            <View>
              <View style={styles.textContainer}>
                <Text style={styles.title}>{slide.title}</Text>
                <Text style={styles.title}>{slide.secondTitle}</Text>
                <Text style={styles.subtitle}>{slide.subTitle}</Text>
              </View>
            </View>
          </View>
        </View>
      </>
    );
  };

  return (
    <>
      {renderBackground()}

      {/* Indicators */}
      <View style={styles.indicatorContainer}>
        {Array.from({ length: totalSlides }).map((_, i) => (
          <TouchableOpacity
            key={i}
            style={[styles.indicator, i === index && styles.activeIndicator]}
          />
        ))}
      </View>

      {/* Next Button */}
      {index >= totalSlides - 1 && (
        <BlurView intensity={50} style={styles.glassmorph}>
          {" "}
          <View style={styles.cardContent}>
            {" "}
            <Pressable
              style={styles.button}
              onPress={() => console.log("Login with Google")}
            >
              <Text style={styles.buttonText}>Login with Google</Text>{" "}
            </Pressable>{" "}
          </View>{" "}
        </BlurView>
      )}

      {/* Arrow Button */}
      {index < totalSlides - 1 && (
        <TouchableOpacity
          style={styles.arrowButton}
          onPress={() => handlePress(index, setIndex)}
        >
          <Ionicons
            name="chevron-forward-outline"
            size={scale(18)}
            color="white"
          />
        </TouchableOpacity>
      )}

      {/* Modal */}
      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <Pressable
          style={styles.modalContainer}
          onPress={() => setModalVisible(false)}
        />
      </Modal>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    padding: scale(60),
    paddingTop: verticalScale(100),
    alignItems: "center",
  },
  textContainer: {
    width: SCREEN_WIDTH * 1,
    paddingHorizontal: verticalScale(25),
  },
  title: {
    fontSize: fontSizes.FONT30,
    fontWeight: "600",
    color: "#FFFFFF",
    fontFamily: "Poppins_600SemiBold",
  },
  subtitle: {
    paddingVertical: verticalScale(4),
    fontSize: fontSizes.FONT18,
    color: "#FFFFFF",
    fontFamily: "Poppins_300Light",
    opacity: 0.8,
  },
  indicatorContainer: {
    flexDirection: "row",
    marginTop: verticalScale(35),
    position: "absolute",
    bottom: verticalScale(55),
    left: scale(22),
  },
  indicator: {
    height: verticalScale(7),
    width: scale(18),
    backgroundColor: "rgba(255, 255, 255, 0.5)",
    marginHorizontal: scale(4),
    borderRadius: scale(4),
  },
  activeIndicator: {
    height: verticalScale(7),
    width: scale(35),
    backgroundColor: "white",
  },
  glassmorph: {
    width: WIDTH,
    height: HEIGHT * 0.5,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    overflow: "hidden",
    position: "absolute",
    bottom: 0,
  },
  cardContent: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  button: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(255, 255, 255, 0.2)",
    paddingVertical: 15,
    paddingHorizontal: 25,
    borderRadius: 10,
  },
  buttonText: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
    marginLeft: 10,
  },
  arrowButton: {
    position: "absolute",
    width: scale(30),
    height: scale(30),
    borderRadius: scale(20),
    backgroundColor: "rgba(255, 255, 255, 0.3)",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 1000,
    right: moderateScale(5),
    top: Platform.OS === "ios" ? verticalScale(345) : verticalScale(355),
    transform: [{ translateY: -30 }],
  },
  modalContainer: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
});
