import React, { useEffect } from 'react'
import { createContext, useContext, useState } from 'react'

import { getItem, removeItem, storeItem } from './storage'

export const AuthContext = createContext({
  login() {},
  logout() {},
  isSignedIn: false,
})

export const AuthContextProvider = ({ children }) => {
  const [isSignedIn, setIsSignedIn] = useState(false)

  useEffect(() => {
    const isUserLogged = async () => {
      const token = await getItem('token')
      if (token) {
        setIsSignedIn(true)
      }
    }
    isUserLogged()
  }, [])

  const login = token => {
    setIsSignedIn(true)
    storeItem('token', token)
  }
  const logout = () => {
    setIsSignedIn(false)
    removeItem('token')
  }

  return <AuthContext.Provider value={{ isSignedIn, login, logout }}>{children}</AuthContext.Provider>
}

export const useAuth = () => useContext(AuthContext)
