import React from 'react'
import { AuthContextProvider } from './src/utilities/context'
import { StatusBar } from 'expo-status-bar'

import Navigation from './src/components/Navigation'

const App = () => {
  return (
    <AuthContextProvider>
      <StatusBar style="auto" />
      <Navigation />
    </AuthContextProvider>
  )
}

export default App
