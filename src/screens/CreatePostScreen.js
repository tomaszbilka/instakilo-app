import React from 'react'
import { Button, Text, View } from 'react-native'
import { useAuth } from '../utilities/context'

const CreatePostScreen = () => {
  const { logout } = useAuth()
  return (
    <View>
      <Text>CreatePostScreen</Text>
      <Button title="logout" onPress={() => logout()} />
    </View>
  )
}

export default CreatePostScreen
