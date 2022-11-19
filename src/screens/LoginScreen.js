import { useNavigation } from '@react-navigation/native'
import React from 'react'
import { Text, View, Button } from 'react-native'
import { useAuth } from '../utilities/context'

const LoginScreen = () => {
  const { navigate } = useNavigation()
  const { login } = useAuth()

  return (
    <View>
      <Text>LoginScreen</Text>
      <Button title="Login" onPress={() => login()} />
      <Button title="Register" onPress={() => navigate('Register')} />
    </View>
  )
}

export default LoginScreen
