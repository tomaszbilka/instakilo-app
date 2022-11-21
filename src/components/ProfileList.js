import React from 'react'
import { StyleSheet, Image, View, Text } from 'react-native'
import theme from '../styles/theme'

const ProfileList = ({ item }) => {
  return (
    <View style={styles.container}>
      <Image
        style={styles.image}
        source={{
          uri: item.image_url,
        }}
      />
      <View style={styles.text}>
        <Text>{item.description}</Text>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    alignSelf: 'center',
    marginBottom: theme.spacings.lg,
  },
  image: {
    width: 250,
    height: 250,
    margin: theme.spacings.sm,
  },
  text: {
    marginLeft: theme.spacings.sm,
  },
})

export default ProfileList
