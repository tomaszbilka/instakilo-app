import React, { useState } from 'react'
import { View, StyleSheet, Image, FlatList, Text, TouchableOpacity } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useFocusEffect, useNavigation } from '@react-navigation/native'
import { useQuery } from '@tanstack/react-query'
import get from 'lodash/get'
import { AntDesign } from '@expo/vector-icons'

import { getPost, createComment, getUser, deletePost } from '../api/api'
import MyError from '../components/MyError'
import Loader from '../components/Loader'
import theme from '../styles/theme'
import MyTextInput from '../components/MyTextInput'
import MyButton from '../components/MyButton'
import Comment from '../components/Comment'
import Likes from '../components/Likes'

const DetailScreen = ({ route }) => {
  const { navigate } = useNavigation()
  const [comment, setComment] = useState('')

  const {
    params: { id },
  } = route

  const { data, isLoading, isError, refetch } = useQuery({
    queryKey: ['post'],
    queryFn: () => getPost(id),
  })

  const userId = get(data, 'data.creator_uuid')

  const {
    data: userDetails,
    isLoading: loading,
    isError: error,
    refetch: userRefetch,
  } = useQuery({
    queryKey: ['post-user'],
    queryFn: () => getUser(userId),
  })

  useFocusEffect(() => {
    refetch()
    userRefetch()
  })

  const deletePostHandler = async () => {
    try {
      await deletePost(id)
      navigate('Home')
    } catch (err) {
      console.log(err)
    }
  }

  if (isLoading || loading) {
    return (
      <View style={styles.container}>
        <Loader />
      </View>
    )
  }

  if (isError || error) {
    return (
      <View style={styles.container}>
        <MyError message={'Something went wrong!'} />
      </View>
    )
  }
  const { data: post } = data

  const addComment = async () => {
    if (comment.length === 0) {
      return
    }
    try {
      const resposne = await createComment(comment, id)
      if (resposne.error) {
        throw new Error('Sth went wrong with sending comment!')
      }
    } catch (err) {
      console.log(err)
    }
    setComment('')
    refetch()
  }

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        ListHeaderComponent={
          <View>
            <View style={styles.imgWrap}>
              <Image
                style={styles.image}
                source={{
                  uri: post.image_url,
                }}
              />
              <Likes id={id} />
            </View>
            <View style={styles.authorWrap}>
              <View style={styles.author}>
                <Text>Author: {get(userDetails, 'data.first_name', 'unknown')}</Text>
              </View>
              <View style={styles.description}>
                <Text>{post.description}</Text>
              </View>
            </View>
            <View style={styles.comment}>
              <View style={styles.actions}>
                <View style={{ flex: 3 }}>
                  <MyTextInput placeholder={'comment here'} onChange={text => setComment(text)} value={comment} />
                </View>
                <View style={{ flex: 1 }}>
                  <MyButton title={'Add'} onPress={addComment} />
                </View>
              </View>
            </View>
          </View>
        }
        style={styles.list}
        data={post.comments}
        keyExtractor={item => item.id}
        renderItem={({ item }) => <Comment item={item} refetch={refetch} />}
      />
      <TouchableOpacity style={styles.remove} onPress={deletePostHandler}>
        <AntDesign name="delete" size={30} color="red" />
      </TouchableOpacity>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  imgWrap: {
    height: 300,
  },
  image: {
    width: 300,
    height: 300,
  },
  authorWrap: {
    flexDirection: 'row',
  },
  author: {
    flex: 1,
  },
  description: {
    flex: 3,
  },
  comment: {
    height: 100,
    width: '100%',
    marginTop: theme.spacings.lg,
  },
  actions: {
    flexDirection: 'row',
  },
  list: {
    flex: 1,
  },
  remove: {
    padding: theme.spacings.base,
  },
})

export default DetailScreen
