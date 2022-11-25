import React, { useState } from 'react'
import { View, StyleSheet, ScrollView } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useQuery } from '@tanstack/react-query'
import { useFocusEffect } from '@react-navigation/native'
import get from 'lodash/get'

import { getAllPosts } from '../api/api'
import MyError from '../components/MyError'
import Loader from '../components/Loader'
import MyTextInput from '../components/MyTextInput'
import ProfileImage from '../components/ProfileImage'
import theme from '../styles/theme'

const SearchScreen = ({ navigation }) => {
  const [search, setSearch] = useState('')
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
  const filteredPosts = get(data, 'data').filter(post => post.description.includes(search))

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
        <MyTextInput onChange={text => setSearch(text)} value={search} style={styles.search} placeholder="search" />
        <ScrollView style={styles.img} contentContainerStyle={styles.listWrap}>
          {filteredPosts.map(item => (
            <ProfileImage item={item} key={item.id} />
          ))}
        </ScrollView>
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignContent: 'center',
  },
  search: {
    marginHorizontal: theme.spacings.lg,
    marginTop: theme.spacings.base,
  },
  listWrap: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
})

export default SearchScreen
