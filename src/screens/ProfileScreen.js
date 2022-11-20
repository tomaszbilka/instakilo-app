import React from 'react'
import { Button, Text, View } from 'react-native'
import { useQuery } from '@tanstack/react-query'

import { getUser } from '../api/api'
import { useAuth } from '../utilities/context'

const ProfileScreen = () => {
  const { logout, userId } = useAuth()
  console.log(userId)
  const { data, isLoading, isError } = useQuery({
    queryKey: ['posts'],
    queryFn: () => getUser(userId),
  })
  console.log(data)

  return (
    <View>
      <Text>ProfileScreen</Text>
    </View>
  )
}

export default ProfileScreen
