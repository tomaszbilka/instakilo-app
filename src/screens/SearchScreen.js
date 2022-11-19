import React from 'react'
import { Text, View, Button } from 'react-native'

const SearchScreen = ({ navigation }) => {
  const { navigate } = navigation
  return (
    <View>
      <Text>SearchScreen</Text>
      <Button title="Login" onPress={() => navigate('MainTabs')} />
    </View>
  )
}

export default SearchScreen
