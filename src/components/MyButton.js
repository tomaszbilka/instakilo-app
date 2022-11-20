import React from 'react'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'

import theme from '../styles/theme'

const MyButton = ({ title, onPress, onBlur }) => {
  return (
    <TouchableOpacity>
      <View style={styles.button}>
        <Text onPress={onPress} onBlur={onBlur} style={styles.text}>
          {title}
        </Text>
      </View>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: theme.colors.primary,
    borderColor: theme.colors.primary200,
    borderRadius: theme.radiuses.md,
    borderWidth: 1,
    marginBottom: theme.spacings.sm,
    padding: theme.spacings.base,
  },
  text: {
    color: theme.colors.secondary,
    textAlign: 'center',
  },
})

export default MyButton
