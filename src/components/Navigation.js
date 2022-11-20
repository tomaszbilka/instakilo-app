import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { NavigationContainer } from '@react-navigation/native'

import { useAuth } from '../utilities/context'
import CreatePostScreen from '../screens/CreatePostScreen'
import HomeScreen from '../screens/HomeScreen'
import LoginScreen from '../screens/LoginScreen'
import ProfileScreen from '../screens/ProfileScreen'
import RegisterScreen from '../screens/RegisterScreen'
import SearchScreen from '../screens/SearchScreen'
import theme from '../styles/theme'
import WelcomeScreen from '../screens/WelcomeScreen'

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
            <Stack.Screen name="Welcome" component={WelcomeScreen} options={{ headerShown: false }} />
            <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} />
            <Stack.Screen
              name="Register"
              component={RegisterScreen}
              options={{
                title: 'Sign up form',
                headerStyle: {
                  backgroundColor: theme.colors.primary,
                },
              }}
            />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  )
}

export default Navigation
