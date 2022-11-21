import React from 'react'
import { View, StyleSheet } from 'react-native'
import { useQuery } from '@tanstack/react-query'

import { getUser } from '../api/api'
import { useAuth } from '../utilities/context'
import UserDetails from '../components/UserDetails'
import Loader from '../components/Loader'
import MyError from '../components/MyError'

const ProfileScreen = () => {
  const { userId } = useAuth()

  const { data, isLoading, isError } = useQuery({
    queryKey: ['posts'],
    queryFn: () => getUser(userId),
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
    <View style={styles.container}>
      <View style={styles.info}>
        <UserDetails user={data} />
      </View>
      <View style={styles.posts} />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  info: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  posts: {
    flex: 2,
  },
})

export default ProfileScreen
