import { Stack } from "expo-router";
import React from "react";

export default function CoursesLayout() {
  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{ title: "courses", headerShown: false }}
      />
    </Stack>
  );
}
