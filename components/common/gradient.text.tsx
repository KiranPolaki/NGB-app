import { StyleSheet, Text, View } from "react-native";
import React from "react";
import MaskedView from "@react-native-community/masked-view";
import { LinearGradient } from "expo-linear-gradient";

export default function GradiantText({
  text,
  styles,
}: {
  text: string;
  styles: any;
}) {
  return (
    // @ts-ignore
    <MaskedView
      maskElement={
        <Text style={[styles, { backgroundColor: "transparent" }]}>{text}</Text>
      }
    >
      <LinearGradient
        colors={["#95dd22", "#aae34f", "#bce973"]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      >
        <Text style={[styles, { opacity: 0 }]}>{text}</Text>
      </LinearGradient>
    </MaskedView>
  );
}

const styles = StyleSheet.create({});
