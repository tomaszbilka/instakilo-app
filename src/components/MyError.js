import React from 'react'
import { StyleSheet, Text, View } from 'react-native'

import theme from '../styles/theme'

const MyError = ({ message }) => {
  return (
    <View style={styles.error}>
      <Text style={styles.text}>{message}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  error: {
    bottom: 3,
    left: 0,
    position: 'absolute',
  },
  text: {
    color: theme.colors.error,
  },
})

export default MyError
