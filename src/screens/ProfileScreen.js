import React from 'react'
import { Button, Text, View } from 'react-native'
import { useAuth } from '../utilities/context'

const ProfileScreen = () => {
  const { logout } = useAuth()
  return (
    <View>
      <Text>ProfileScreen</Text>
      <Button title="logout" onPress={() => logout()} />
    </View>
  )
}

export default ProfileScreen
