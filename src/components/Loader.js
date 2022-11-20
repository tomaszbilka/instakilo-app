import React from 'react'
import { View, StyleSheet } from 'react-native'
import { Feather } from '@expo/vector-icons'

const Loader = () => {
  return (
    <View style={styles.loader}>
      <Feather name="loader" size={48} color="black" />
    </View>
  )
}

const styles = StyleSheet.create({
  loader: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
})

export default Loader
