import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Pressable,
  Dimensions,
  Platform,
  Modal,
} from "react-native";
import { Defs, RadialGradient, Rect, Stop, Svg, Path } from "react-native-svg";
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
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
} from "react-native-reanimated";
import { ExternalPathString, RelativePathString, router } from "expo-router";

const { width, height } = Dimensions.get("window");

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
  const translateY = useSharedValue(height);
  const [previousIndex, setPreviousIndex] = useState(index);

  const GoogleIcon = () => (
    <View>
      <Svg x="0px" y="0px" width="25" height="25" viewBox="0 0 48 48">
        <Path
          fill="#fbc02d"
          d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12	s5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24s8.955,20,20,20	s20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z"
        />
        <Path
          fill="#e53935"
          d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039	l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z"
        />
        <Path
          fill="#4caf50"
          d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36	c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z"
        />
        <Path
          fill="#1565c0"
          d="M43.611,20.083L43.595,20L42,20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571	c0.001-0.001,0.002-0.001,0.003-0.002l6.19,5.238C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z"
        />
      </Svg>
    </View>
  );
  ``;
  useEffect(() => {
    if (index >= totalSlides - 1) {
      translateY.value = height;
      translateY.value = withTiming(0, { duration: 500 });
    } else if (previousIndex >= totalSlides - 1) {
      translateY.value = withTiming(height, { duration: 500 });
    }
    setPreviousIndex(index);
  }, [index]);

  const handlePress = (
    currentIndex: number,
    setIndex: (index: number) => void
  ) => {
    if (currentIndex === 2) {
      setModalVisible(true);
    } else {
      setIndex(currentIndex + 1);
    }
  };

  const handleBack = () => {
    if (index > 0) {
      setIndex(index - 1);
    }
  };

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateY: translateY.value }],
    };
  });

  const ContentView = () => (
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
  );

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
            <ContentView />
          </BlurView>
        </>
      );
    }
    return (
      <View style={[StyleSheet.absoluteFill, { backgroundColor: slide.color }]}>
        <ContentView />
      </View>
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

      {/* Glassmorph Card */}
      {index === totalSlides - 1 && (
        <Animated.View style={[styles.glassmorph, animatedStyle]}>
          <BlurView intensity={50} style={styles.cardContent}>
            <Pressable
              style={styles.button}
              onPress={() => {
                router.push("/(tabs)");
              }}
            >
              <GoogleIcon />
              <Text style={styles.buttonText}>Login with Google</Text>
            </Pressable>
          </BlurView>
        </Animated.View>
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
      {/* <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <Pressable
          style={styles.modalContainer}
          onPress={() => setModalVisible(false)}
        />
      </Modal> */}
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
    bottom: verticalScale(150),
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
    height: HEIGHT * 0.2,
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
    justifyContent: "center",
    width: "80%",
    backgroundColor: "rgba(255, 255, 255, 0.2)",
    paddingVertical: 15,
    paddingHorizontal: 25,
    borderRadius: 10,
  },
  buttonText: {
    color: "white",
    fontSize: 15,
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
