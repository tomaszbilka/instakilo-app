import React from 'react'
import { View, StyleSheet, Text, TouchableOpacity } from 'react-native'
import { AntDesign } from '@expo/vector-icons'
import { useQuery } from '@tanstack/react-query'

import theme from '../styles/theme'
import { likePost, getAllPostLikes } from '../api/api'
import get from 'lodash/get'

const Likes = ({ id }) => {
  const { data, isLoading, isError, refetch } = useQuery({
    queryKey: ['likes'],
    queryFn: () => getAllPostLikes(id),
  })

  const likePostRequest = async () => {
    try {
      const response = await likePost(id)
      if (response.error) {
        throw new Error('Cant like post...')
      }
      await refetch()
    } catch (err) {
      console.log(err)
    }
  }

  return (
    <TouchableOpacity onPress={likePostRequest}>
      <View style={styles.container}>
        <Text style={styles.text}>{get(data, 'count', '-')}</Text>
        <AntDesign name="like2" size={40} color="black" />
      </View>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    position: 'absolute',
    left: 0,
    bottom: 0,
    backgroundColor: theme.colors.primary,
    padding: 5,
    borderRadius: theme.radiuses.sm,
  },
  text: {
    color: theme.colors.primary200,
    fontSize: 20,
    marginHorizontal: theme.spacings.sm,
  },
})

export default Likes
