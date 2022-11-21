import React from 'react'
import { StyleSheet, Image } from 'react-native'
import theme from '../styles/theme'

const ProfileImage = ({ item }) => {
  return (
    <Image
      style={styles.image}
      source={{
        uri: item.image_url,
      }}
    />
  )
}

const styles = StyleSheet.create({
  image: {
    width: 120,
    height: 120,
    margin: theme.spacings.sm,
  },
})

export default ProfileImage
