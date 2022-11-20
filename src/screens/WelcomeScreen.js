import React from 'react'
import { Text, View, StyleSheet } from 'react-native'

import MyButton from '../components/MyButton'
import theme from '../styles/theme'

const WelcomeScreen = ({ navigation }) => {
  const { navigate } = navigation
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Welcome</Text>
      <MyButton title="Start your jurney!" onPress={() => navigate('Login')} />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: theme.spacings.md,
  },
  text: {
    color: theme.colors.primary200,
    fontSize: theme.fontSizes.h5,
    marginBottom: theme.spacings.lg,
    textAlign: 'center',
  },
})

export default WelcomeScreen
