import { useNavigation } from '@react-navigation/native'
import React from 'react'
import { StyleSheet, Image, View, Text, TouchableOpacity } from 'react-native'
import { getAllPostLikes } from '../api/api'
import { useQuery } from '@tanstack/react-query'
import get from 'lodash/get'
import { Fontisto } from '@expo/vector-icons'

import theme from '../styles/theme'

const DashboardItem = ({ item }) => {
  const { navigate } = useNavigation()
  const { id } = item

  const { data, isLoading, isError, refetch } = useQuery({
    queryKey: [`likes-${id}`],
    queryFn: () => getAllPostLikes(id),
  })

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => navigate('Detail', { id: item.id })}>
        <Image
          style={styles.image}
          source={{
            uri: item.image_url,
          }}
        />
      </TouchableOpacity>
      <View style={styles.text}>
        <Text>{item.description}</Text>
      </View>
      <View style={styles.textWrap}>
        <Fontisto name="like" size={16} color="black" />
        <Text style={styles.like}>{get(data, 'count', '...')}</Text>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    alignSelf: 'center',
    marginBottom: theme.spacings.lg,
  },
  image: {
    width: 250,
    height: 250,
    margin: theme.spacings.sm,
  },
  textWrap: {
    marginLeft: theme.spacings.sm,
    flexDirection: 'row',
    marginTop: 2,
  },
  text: {
    marginHorizontal: theme.spacings.sm,
  },
  like: {
    color: 'green',
    marginLeft: 3,
  },
})

export default DashboardItem
