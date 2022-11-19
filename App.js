import React from 'react'
import { AuthContextProvider } from './src/utilities/context'

import Navigation from './src/components/Navigation'

const App = () => {
  return (
    <AuthContextProvider>
      <Navigation />
    </AuthContextProvider>
  )
}

export default App
