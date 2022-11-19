import React from 'react'
import { createContext, useContext, useState } from 'react'

export const AuthContext = createContext({
  login() {},
  logout() {},
  isSignedIn: false,
})

export const AuthContextProvider = ({ children }) => {
  const [isSignedIn, setIsSignedIn] = useState(false)

  const login = () => setIsSignedIn(true)
  const logout = () => setIsSignedIn(false)

  return <AuthContext.Provider value={{ isSignedIn, login, logout }}>{children}</AuthContext.Provider>
}

export const useAuth = () => useContext(AuthContext)
