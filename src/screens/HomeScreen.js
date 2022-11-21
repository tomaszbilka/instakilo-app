import React from 'react'
import { Text, View } from 'react-native'
import { useQuery } from '@tanstack/react-query'
import { SafeAreaView } from 'react-native-safe-area-context'

import { getAllPosts } from '../api/api'

const HomeScreen = () => {
  const { data, isLoading, isError } = useQuery({
    queryKey: ['posts'],
    queryFn: getAllPosts,
  })
  console.log(data)
  return (
    <SafeAreaView>
      <View>
        <Text>HomeScreen</Text>
        {data?.data.length === 0 && <Text>No posts yet...</Text>}
      </View>
    </SafeAreaView>
  )
}

export default HomeScreen
