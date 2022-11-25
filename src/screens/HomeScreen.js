import React from 'react'
import { Text, View, StyleSheet, FlatList } from 'react-native'
import { useQuery } from '@tanstack/react-query'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useFocusEffect } from '@react-navigation/native'
import get from 'lodash/get'

import { getAllPosts } from '../api/api'
import MyError from '../components/MyError'
import Loader from '../components/Loader'
import DashboardItem from '../components/DashboardItem'
import UserList from '../components/UserList'

const HomeScreen = () => {
  const { data, isLoading, isError, refetch } = useQuery({
    queryKey: ['posts'],
    queryFn: getAllPosts,
  })

  useFocusEffect(() => {
    refetch()
  })

  if (isLoading) {
    return (
      <View style={styles.container}>
        <Loader />
      </View>
    )
  }

  if (isError) {
    return (
      <View style={styles.container}>
        <MyError message={'Something went wrong!'} />
      </View>
    )
  }

  return (
    <SafeAreaView>
      <View>
        {get(data, 'data', []).length === 0 && <Text>No posts yet...</Text>}
        <FlatList
          ListHeaderComponent={<UserList />}
          data={data.data}
          keyExtractor={item => item.id}
          renderItem={({ item }) => <DashboardItem item={item} />}
        />
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
})

export default HomeScreen
