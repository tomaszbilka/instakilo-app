import React from 'react'
import { StyleSheet, TouchableOpacity, View, FlatList, Image } from 'react-native'
import { useNavigation } from '@react-navigation/native'

import theme from '../styles/theme'

const users = [
  { id: 1, url: 'https://ps.w.org/user-avatar-reloaded/assets/icon-256x256.png?rev=2540745' },
  {
    id: 2,
    url: 'https://www.pixelmator.com/community/download/file.php?avatar=25775_1635446971.png',
  },
  {
    id: 3,
    url: 'https://cdn1.iconfinder.com/data/icons/avatar-97/32/avatar-02-512.png',
  },
  {
    id: 4,
    url: 'https://w7.pngwing.com/pngs/312/283/png-transparent-man-s-face-avatar-computer-icons-user-profile-business-user-avatar-blue-face-heroes.png',
  },
  {
    id: 5,
    url: 'https://banner2.cleanpng.com/20180402/bje/kisspng-computer-icons-avatar-login-user-avatar-5ac207e69ecd41.2588125315226654466505.jpg',
  },
]

const UserList = () => {
  const { navigate } = useNavigation()
  const redirectToUserHabdler = () => {
    navigate('Profile')
  }
  return (
    <View style={styles.button}>
      <FlatList
        horizontal={true}
        style={styles.list}
        data={users}
        keyExtractor={item => item.id}
        renderItem={({ item }) => {
          return (
            <TouchableOpacity onPress={redirectToUserHabdler}>
              <View styles={styles.imgWrap}>
                <Image
                  style={styles.image}
                  source={{
                    uri: item.url,
                  }}
                />
              </View>
            </TouchableOpacity>
          )
        }}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    color: theme.colors.secondary,
    textAlign: 'center',
  },
  image: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginHorizontal: theme.spacings.sm,
    marginVertical: theme.spacings.sm,
  },
})

export default UserList
