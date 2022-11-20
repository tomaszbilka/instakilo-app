import React, { useEffect } from 'react'
import { createContext, useContext, useState } from 'react'

import { getItem, removeItem, storeItem } from './storage'

export const AuthContext = createContext({
  login() {},
  logout() {},
  isSignedIn: false,
  userId: null,
})

export const AuthContextProvider = ({ children }) => {
  const [isSignedIn, setIsSignedIn] = useState(false)
  const [userId, setUserId] = useState(null)

  useEffect(() => {
    const isUserLogged = async () => {
      const token = await getItem('token')
      const id = await getItem('userId')

      if (token && id) {
        setIsSignedIn(true)
        setUserId(id)
      }
    }
    isUserLogged()
  }, [])

  const login = (token, id) => {
    setIsSignedIn(true)
    setUserId(id)
    storeItem('token', token)
    storeItem('userId', id)
  }
  const logout = () => {
    setIsSignedIn(false)
    setUserId(null)
    removeItem('token')
    removeItem('userId')
  }

  return <AuthContext.Provider value={{ isSignedIn, login, logout, userId }}>{children}</AuthContext.Provider>
}

export const useAuth = () => useContext(AuthContext)
