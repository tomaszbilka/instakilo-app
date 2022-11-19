import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import theme from '../styles/theme'

export const Title = ({ title, size }) => {
  return (
    <View style={styles.container}>
      <Text style={StyleSheet.flatten([{ fontSize: size }, styles.text])}>{title}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: theme.colors.primary,
    width: '100%',
  },
  text: {
    textAlign: 'center',
    marginBottom: theme.spacings.sm,
    marginTop: theme.spacings.sm,
  },
})
