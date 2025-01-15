import { ActivityIndicator, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { theme } from '@/constants/Colors'


const Loading = ({size="large", color=theme.colors.primary}) => {
  return (
    <View>
      <ActivityIndicator size={"large"} color={color} />
    </View>
  )
}

export default Loading

const styles = StyleSheet.create({})