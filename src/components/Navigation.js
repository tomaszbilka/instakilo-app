import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'

import { useAuth } from '../utilities/context'
import HomeScreen from '../screens/HomeScreen'
import ProfileScreen from '../screens/ProfileScreen'
import LoginScreen from '../screens/LoginScreen'
import RegisterScreen from '../screens/RegisterScreen'
import WelcomeScreen from '../screens/WelcomeScreen'
import CreatePostScreen from '../screens/CreatePostScreen'
import SearchScreen from '../screens/SearchScreen'

const Stack = createNativeStackNavigator()
const Tabs = createBottomTabNavigator()

const MainTabs = () => (
  <Tabs.Navigator initialRouteName="Home">
    <Tabs.Screen name="Home" component={HomeScreen} options={{ headerShown: false }} />
    <Tabs.Screen name="Search" component={SearchScreen} options={{ headerShown: false }} />
    <Tabs.Screen name="CreatePost" component={CreatePostScreen} options={{ headerShown: false }} />
    <Tabs.Screen name="Profile" component={ProfileScreen} options={{ headerShown: false }} />
  </Tabs.Navigator>
)

const Navigation = () => {
  const { isSignedIn } = useAuth()

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName={'Welcome'}>
        {isSignedIn ? (
          <Stack.Screen name="MainTabs" component={MainTabs} />
        ) : (
          <>
            <Stack.Screen name="Welcome" component={WelcomeScreen} />
            <Stack.Screen name="Login" component={LoginScreen} />
            <Stack.Screen name="Register" component={RegisterScreen} />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  )
}

export default Navigation
