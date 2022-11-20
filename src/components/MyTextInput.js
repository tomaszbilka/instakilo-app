import React from 'react'
import { StyleSheet, TextInput } from 'react-native'

import theme from '../styles/theme'

const MyTextInput = ({ style, value, onChange, placeholder, onBlur, secureTextEntry }) => {
  return (
    <TextInput
      autoCapitalize={false}
      autoComplete="off"
      autoCorrect={false}
      blurOnSubmit={false}
      onBlur={onBlur}
      onChangeText={onChange}
      placeholder={placeholder}
      returnKeyType="next"
      secureTextEntry={secureTextEntry}
      style={StyleSheet.flatten([style, styles.input])}
      value={value}
    />
  )
}

const styles = StyleSheet.create({
  input: {
    borderColor: theme.colors.primary,
    borderRadius: theme.radiuses.md,
    borderWidth: 1,
    marginBottom: theme.spacings.md,
    padding: theme.spacings.sm,
  },
})

export default MyTextInput
