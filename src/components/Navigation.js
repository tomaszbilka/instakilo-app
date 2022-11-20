import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { NavigationContainer } from '@react-navigation/native'
import { FontAwesome } from '@expo/vector-icons'
import { MaterialIcons } from '@expo/vector-icons'

import { useAuth } from '../utilities/context'
import CreatePostScreen from '../screens/CreatePostScreen'
import HomeScreen from '../screens/HomeScreen'
import LoginScreen from '../screens/LoginScreen'
import LogoutButton from './LogoutButton'
import ProfileScreen from '../screens/ProfileScreen'
import RegisterScreen from '../screens/RegisterScreen'
import SearchScreen from '../screens/SearchScreen'
import theme from '../styles/theme'
import WelcomeScreen from '../screens/WelcomeScreen'

const Stack = createNativeStackNavigator()
const Tabs = createBottomTabNavigator()

const MainTabs = () => (
  <Tabs.Navigator
    initialRouteName="Home"
    screenOptions={{
      tabBarStyle: {
        backgroundColor: theme.colors.primary,
        height: 60,
      },
      tabBarActiveTintColor: theme.colors.secondary,
      tabBarInactiveTintColor: theme.colors.primary200,
      tabBarShowLabel: false,
    }}
  >
    <Tabs.Screen
      name="Home"
      component={HomeScreen}
      options={{
        headerShown: false,
        tabBarIcon: ({ color }) => <MaterialIcons name="dashboard" size={32} color={color} />,
      }}
    />
    <Tabs.Screen
      name="Search"
      component={SearchScreen}
      options={{ headerShown: false, tabBarIcon: ({ color }) => <FontAwesome name="search" size={32} color={color} /> }}
    />
    <Tabs.Screen
      name="CreatePost"
      component={CreatePostScreen}
      options={{
        headerShown: false,
        tabBarIcon: ({ color }) => <MaterialIcons name="post-add" size={32} color={color} />,
      }}
    />
    <Tabs.Screen
      name="Profile"
      component={ProfileScreen}
      options={{
        headerShown: true,
        headerRight: () => <LogoutButton color={theme.colors.secondary} />,
        tabBarIcon: ({ color }) => <FontAwesome name="user" size={32} color={color} />,
        headerStyle: {
          backgroundColor: theme.colors.primary,
        },
        headerTintColor: theme.colors.secondary,
      }}
    />
  </Tabs.Navigator>
)

const Navigation = () => {
  const { isSignedIn } = useAuth()

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName={'Welcome'}>
        {isSignedIn ? (
          <Stack.Screen name="MainTabs" component={MainTabs} options={{ headerShown: false }} />
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
