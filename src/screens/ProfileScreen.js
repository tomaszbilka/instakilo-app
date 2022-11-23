import React, { useState } from 'react'
import { View, StyleSheet, ScrollView, TouchableOpacity, FlatList } from 'react-native'
import { useQuery } from '@tanstack/react-query'
import { Feather } from '@expo/vector-icons'
import { Foundation } from '@expo/vector-icons'

import { getUser, getAllPosts } from '../api/api'
import { useAuth } from '../utilities/context'
import UserDetails from '../components/UserDetails'
import Loader from '../components/Loader'
import MyError from '../components/MyError'
import ProfileImage from '../components/ProfileImage'
import ProfileList from '../components/ProfileList'
import theme from '../styles/theme'
import { useFocusEffect } from '@react-navigation/native'

const ProfileScreen = () => {
  const [isList, setIsList] = useState(false)
  const { userId } = useAuth()

  const { data, isLoading, isError, refetch } = useQuery({
    queryKey: ['user'],
    queryFn: () => getUser(userId),
  })

  const {
    data: userPosts,
    isLoading: isPostsLoading,
    isError: isPostsError,
    refetch: postsRefetch,
  } = useQuery({
    queryKey: ['posts'],
    queryFn: getAllPosts,
  })

  useFocusEffect(() => {
    postsRefetch()
  })

  if (isLoading || isPostsLoading) {
    return (
      <View style={styles.container}>
        <Loader />
      </View>
    )
  }

  if (isError || isPostsError) {
    return (
      <View style={styles.container}>
        <MyError message={'Something went wrong!'} />
      </View>
    )
  }

  return (
    <View style={styles.container}>
      <View style={styles.buttons}>
        <TouchableOpacity onPress={() => setIsList(false)}>
          <Feather name="grid" size={24} color="black" />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setIsList(true)}>
          <Foundation name="list" size={24} color="black" />
        </TouchableOpacity>
      </View>
      <View style={styles.info}>
        <UserDetails user={data} refetch={refetch} />
      </View>
      <View style={styles.posts}>
        {!isList && (
          <ScrollView style={styles.img} contentContainerStyle={styles.listWrap}>
            {userPosts.data.map(item => (
              <ProfileImage item={item} key={item.id} />
            ))}
          </ScrollView>
        )}
        {isList && (
          <FlatList
            data={userPosts.data}
            keyExtractor={item => item.id}
            renderItem={({ item }) => <ProfileList item={item} />}
          />
        )}
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  buttons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: theme.spacings.base,
    marginTop: theme.spacings.base,
    marginBottom: -theme.spacings.base,
  },
  info: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  posts: {
    flex: 2,
  },
  img: {
    flex: 1,
    width: '100%',
  },
  listWrap: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
})

export default ProfileScreen
