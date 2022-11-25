import React, { useState } from 'react'
import { View, StyleSheet, Text, TouchableOpacity } from 'react-native'
import { AntDesign } from '@expo/vector-icons'
import { useQuery } from '@tanstack/react-query'
import { useFocusEffect } from '@react-navigation/native'

import theme from '../styles/theme'
import { likePost, getAllPostLikes, ifPostLiked, unlikePost } from '../api/api'
import get from 'lodash/get'
import isEmpty from 'lodash/isEmpty'
import { useAuth } from '../utilities/context'

const Likes = ({ id }) => {
  const [isLiked, setIsLiked] = useState()
  const { userId } = useAuth()

  const { data, refetch } = useQuery({
    queryKey: [`likes-${id}`],
    queryFn: () => getAllPostLikes(id),
  })

  const likePostRequest = async () => {
    console.log('like')
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

  const unlikePostRequest = async () => {
    console.log('unlike')
    try {
      const response = await unlikePost(get(data, 'data[0].id'))
      if (response.error) {
        throw new Error('Cant unlike post...')
      }
      await refetch()
    } catch (err) {
      console.log(err)
    }
  }

  useFocusEffect(() => {
    const checkIfLiked = async () => {
      const response = await ifPostLiked({ id, user_uuid: userId })
      if (!isEmpty(response.data)) {
        setIsLiked(true)
      } else {
        setIsLiked(false)
      }
    }
    checkIfLiked()
    refetch()
  })

  return (
    <View style={{ zIndex: 100 }}>
      <TouchableOpacity onPress={likePostRequest}>
        <View style={styles.container}>
          <Text style={styles.text}>{get(data, 'count', '0')}</Text>
          <AntDesign name="like2" size={40} color={isLiked ? 'green' : 'black'} />
        </View>
      </TouchableOpacity>
      <TouchableOpacity onPress={unlikePostRequest}>
        <View style={styles.unlikeContainer}>
          <AntDesign name="dislike2" size={40} color="black" />
        </View>
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    position: 'absolute',
    right: 70,
    bottom: 0,
    backgroundColor: theme.colors.primary,
    padding: 5,
    borderRadius: theme.radiuses.sm,
    zIndex: 100,
  },
  text: {
    color: theme.colors.primary200,
    fontSize: 20,
    marginHorizontal: theme.spacings.sm,
  },
  unlikeContainer: {
    position: 'absolute',
    left: 70,
    bottom: 0,
    backgroundColor: theme.colors.primary,
    padding: 5,
    paddingRight: 40,
    borderRadius: theme.radiuses.sm,
    zIndex: 100,
  },
})

export default Likes
