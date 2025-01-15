import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { hp } from '@/lib/commonHelper'
import { theme } from '@/constants/Colors'
import { Image } from 'react-native'
// import { getUserImageSrc } from '../services/imageService'

const Avatar = ({
    uri,
    size= hp(4.5),
    rounded= theme.radius.md,
    style={}
}: {
    uri: string;
    size?: number | undefined;
    rounded?: number | undefined;
    style?: {} | undefined;
}) => {
  return (
    <Image
        source={{uri: uri}}
        style={[styles.avatar, {height: size, width: size, borderRadius: rounded}, style]}
    />
  )
}

export default Avatar

const styles = StyleSheet.create({
    avatar: {
        borderCurve: 'continuous',
        borderColor: theme.colors.darkLight,
        borderWidth: 1,
    }
})