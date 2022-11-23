import { useNavigation } from '@react-navigation/native'
import React from 'react'
import { StyleSheet, Image, View, Text, TouchableOpacity } from 'react-native'
import theme from '../styles/theme'

const DashboardItem = ({ item }) => {
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
      <View style={styles.text}>
        <Text>Likes </Text>
        <Text>2</Text>
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
    flexDirection: 'row',
  },
})

export default DashboardItem
