import React from 'react'
import { StyleSheet, Image, View, Text, TouchableOpacity } from 'react-native'
import { useNavigation } from '@react-navigation/native'

import theme from '../styles/theme'

const ProfileList = ({ item }) => {
  const { navigate } = useNavigation()

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => navigate('Detail', { id: item.id })}>
        <Image
          style={styles.image}
          source={{
            uri: item.image_url,
          }}
        />
      </TouchableOpacity>

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
