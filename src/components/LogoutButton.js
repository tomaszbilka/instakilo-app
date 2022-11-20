import React from 'react'
import { StyleSheet, TouchableOpacity, View } from 'react-native'
import { AntDesign } from '@expo/vector-icons'

import theme from '../styles/theme'
import { useAuth } from '../utilities/context'

const LogoutButton = ({ title, onPress, onBlur, color = 'black' }) => {
  const { logout } = useAuth()
  return (
    <TouchableOpacity>
      <View style={styles.button}>
        <AntDesign name="logout" size={24} color={color} onPress={() => logout()} />
      </View>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  button: {
    padding: theme.spacings.sm,
    marginRight: theme.spacings.sm,
  },
})

export default LogoutButton
