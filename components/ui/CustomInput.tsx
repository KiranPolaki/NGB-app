import { StyleSheet, Text, TextInput, View } from "react-native";
import React from "react";
import { theme } from "@/constants/Colors";
import { hp } from "@/lib/commonHelper";

const Input = (props: any) => {
  return (
    <View
      style={[styles.container, props.containerStyle && props.containerStyle]}
    >
      {props.icon && props.icon}
      <TextInput
        style={{ flex: 1, height: "100%", justifyContent: "center", alignItems: "center" }}
        placeholderTextColor={theme.colors.textLight}
        ref={props.inputRef && props.inputRef}
        {...props}
      />
    </View>
  );
};

export default Input;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    height: hp(5.8),
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 0.4,
    borderColor: theme.colors.text,
    borderRadius: theme.radius.xs,
    borderCurve: "continuous",
    paddingHorizontal: 18,
    gap: 12,
    flexGrow: 1,
  },
});
