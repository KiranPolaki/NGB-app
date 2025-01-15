import { Pressable, StyleSheet, Text, View } from "react-native";
import React from "react";
import { theme } from "@/constants/Colors";
import { hp } from "@/lib/commonHelper";
import Loading from "@/components/ui/Loading";

const Button = ({
  buttonStyle,
  textStyle,
  title = "",
  onPress,
  loading = false,
  hasShadow = true,
}: {
    buttonStyle?: any;
    textStyle?: any;
    title?: string | undefined;
    onPress?: (() => void) | undefined;
    loading?: boolean | undefined;
    hasShadow?: boolean | undefined;
}) => {
  const shadowStyle = {
    shadowColor: theme.colors.dark,
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 4,
  };

  if (loading) {
    return (
      <View style={[styles.button, buttonStyle, { backgroundColor: "white" }]}>
        <Loading />
      </View>
    );
  }
  return (
    <Pressable
      onPress={onPress}
      style={[styles.button, hasShadow && shadowStyle]}
    >
      <Text style={[styles.text, textStyle]}>{title}</Text>
    </Pressable>
  );
};

export default Button;

const styles = StyleSheet.create({
  button: {
    backgroundColor: theme.colors.primary,
    height: hp(6.6),
    justifyContent: "center",
    alignItems: "center",
    borderCurve: "continuous",
    borderRadius: theme.radius.xl,
  },
  text: {
    fontSize: hp(2.5),
    color: "white",
    fontWeight: "700",
  },
});
