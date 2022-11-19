import React from 'react'
import { Text, View, Button } from 'react-native'

const WelcomeScreen = ({ navigation }) => {
  const { navigate } = navigation
  return (
    <View>
      <Text>Welcome Screen</Text>
      <Button title="Start your jurney!" onPress={() => navigate('Login')} />
    </View>
  )
}

export default WelcomeScreen
