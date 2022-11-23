import React from 'react'
import { useNavigation } from '@react-navigation/native'
import { StyleSheet, Image, TouchableOpacity } from 'react-native'

import theme from '../styles/theme'

const ProfileImage = ({ item }) => {
  const { navigate } = useNavigation()

  return (
    <TouchableOpacity onPress={() => navigate('Detail', { id: item.id })}>
      <Image
        style={styles.image}
        source={{
          uri: item.image_url,
        }}
      />
    </TouchableOpacity>
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
