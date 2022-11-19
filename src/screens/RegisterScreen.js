import React from 'react'
import { Text, View, Button } from 'react-native'

const RegisterScreen = ({ navigation }) => {
  const { navigate } = navigation
  return (
    <View>
      <Text>RegisterScreen</Text>
      <Button title="Login" onPress={() => navigate('MainTabs')} />
    </View>
  )
}

export default RegisterScreen
