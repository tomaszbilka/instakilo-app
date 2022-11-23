import React from 'react'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { FontAwesome } from '@expo/vector-icons'
import { deleteUserComment } from '../api/api'

import theme from '../styles/theme'

const Comment = ({ item: comment, refetch }) => {
  const deleteComment = async () => {
    try {
      const response = await deleteUserComment(comment.id)
      if (response.error) {
        throw new Error('Cant delete comment!')
      }
      await refetch()
    } catch (err) {
      console.log(err)
    }
  }

  return (
    <View style={styles.commentTextWrap}>
      <View style={styles.layout}>
        <Text style={styles.commentText}>{comment.body}</Text>
        <TouchableOpacity onPress={deleteComment}>
          <FontAwesome name="remove" size={24} color="black" />
        </TouchableOpacity>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  commentTextWrap: {
    flex: 1,
    backgroundColor: theme.colors.primary200,
    marginBottom: theme.spacings.sm,
    padding: theme.spacings.sm,
    borderRadius: theme.radiuses.base,
  },
  layout: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  commentText: {
    textAlign: 'left',
    fontSize: theme.fontSizes.body,
  },
})

export default Comment
