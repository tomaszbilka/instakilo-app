import React from 'react'
import { Text, View, Image, StyleSheet } from 'react-native'
import get from 'lodash/get'
import theme from '../styles/theme'

const UserDetails = ({ user }) => {
  const name = get(user, 'first_name', 'unknown')
  const imageUrl = get(user, 'image_url', 'https://images.freeimages.com/images/large-previews/a06/cats-1343463.jpg')

  return (
    <View>
      <Image
        style={styles.image}
        source={{
          uri: imageUrl,
        }}
      />
      <Text style={styles.text}>{name}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  image: {
    width: 120,
    height: 120,
    borderRadius: 60,
  },
  text: {
    textAlign: 'center',
    fontSize: theme.fontSizes.bodyLarge,
    marginTop: 20,
  },
})
export default UserDetails
