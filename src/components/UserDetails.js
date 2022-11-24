import React, { useState } from 'react'
import { Text, View, Image, StyleSheet, TextInput } from 'react-native'
import get from 'lodash/get'
import theme from '../styles/theme'
import { updateUserName } from '../api/api'

const UserDetails = ({ user, refetch }) => {
  const [userName, setUserName] = useState('')
  const [isEditing, setIsEditing] = useState(false)

  const name = get(user, 'data.first_name', 'unknown')
  const imageUrl = get(user, 'image_url', 'https://images.freeimages.com/images/large-previews/a06/cats-1343463.jpg')

  const sendUserName = async () => {
    setIsEditing(false)
    try {
      const response = await updateUserName({ name: userName, id: user.data.uuid })
      if (response.error) {
        throw new Error('Sth went wrong!')
      }
      await refetch()
    } catch (err) {
      console.log(err)
    }
  }

  return (
    <View>
      <Image
        style={styles.image}
        source={{
          uri: imageUrl,
        }}
      />
      {!isEditing && (
        <Text style={styles.text} onPress={() => setIsEditing(true)}>
          {name}
        </Text>
      )}
      {isEditing && (
        <TextInput
          value={userName}
          onChangeText={newName => setUserName(newName)}
          onBlur={sendUserName}
          style={styles.inputText}
        />
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  image: {
    width: 120,
    height: 120,
    borderRadius: 60,
  },
  text: {
    textAlign: 'center',
    fontSize: theme.fontSizes.bodyLarge,
    marginTop: 20,
  },
  inputText: {
    textAlign: 'center',
    fontSize: theme.fontSizes.bodyLarge,
    marginTop: 20,
    backgroundColor: '#fff',
  },
})
export default UserDetails
