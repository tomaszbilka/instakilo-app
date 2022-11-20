import React from 'react'
import { AuthContextProvider } from './src/utilities/context'
import { StatusBar } from 'expo-status-bar'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

import Navigation from './src/components/Navigation'

const queryClient = new QueryClient()

const App = () => {
  return (
    <AuthContextProvider>
      <QueryClientProvider client={queryClient}>
        <StatusBar style="auto" />
        <Navigation />
      </QueryClientProvider>
    </AuthContextProvider>
  )
}

export default App
