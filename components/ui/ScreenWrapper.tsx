import { View, Text } from "react-native";
import React, { ReactElement } from "react";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const ScreenWrapper = ({
  children,
  bg,
}: {
  children: React.ReactNode;
  bg: string;
}) => {
  const { top } = useSafeAreaInsets();
  const paddingTop = 15;

  return (
    <View style={{ flex: 1, paddingTop, backgroundColor: bg }}>{children}</View>
  );
};

export default ScreenWrapper;
