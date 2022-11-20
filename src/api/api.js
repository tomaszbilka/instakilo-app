import { createClient } from '@supabase/supabase-js'
import AsyncStorage from '@react-native-async-storage/async-storage'
import 'react-native-url-polyfill/auto'

const url = 'https://jvneoinifrjqltrrxesb.supabase.co'

const PUBLIC_KEY =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imp2bmVvaW5pZnJqcWx0cnJ4ZXNiIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NjY1NTAwOTYsImV4cCI6MTk4MjEyNjA5Nn0.YYIUu3UKyNAxEh5Y5_elQxkV3uWHvu3aOjDS4wmyqvg'

const client = createClient(url, PUBLIC_KEY, {
  auth: {
    storage: AsyncStorage,
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
  },
})

export const signUp = async (email, password) => {
  const response = await client.auth.signUp({
    email: email,
    password: password,
  })
  return response
}

export const signInWithPassword = async (email, password) => {
  const response = await client.auth.signInWithPassword({
    email: email,
    password: password,
  })
  return response
}

export const getUser = async id => {
  const user = await client.from('users').select().eq('uuid', id).single()
  return user
}

export const getAllPosts = async () => {
  const response = await client.from('posts').select('*').is('archived_at', null)
  return response
}

export const createPost = async (description, imgName) => {
  const response = await client
    .from('posts')
    .insert({
      description: description,
      image_url: imgName,
    })
    .limit(1)
    .single()
  return response
}
