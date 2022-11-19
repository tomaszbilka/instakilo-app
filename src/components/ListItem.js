import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { AntDesign } from '@expo/vector-icons'
import theme from '../styles/theme'

const ListItem = ({ item }) => {
  return (
    <View style={styles.container}>
      <View>{item.checked && <AntDesign name="checksquareo" size={24} color="black" />}</View>
      <Text>{item.title}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: theme.spacings.base,
    marginLeft: theme.spacings.base,
    flexDirection: 'row',
    backgroundColor: theme.colors.secondary,
    borderRadius: theme.radiuses.base,
    paddingHorizontal: theme.spacings.md,
    paddingVertical: theme.spacings.sm,
  },
})

export default ListItem
