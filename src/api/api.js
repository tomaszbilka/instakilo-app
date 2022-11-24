import { createClient } from '@supabase/supabase-js'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { decode } from 'base64-arraybuffer'
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

export const getPost = async id => {
  const response = await client
    .from('posts')
    .select('id, created_at, description, image_url, comments ( body, creator_uuid, id )')
    .eq('id', id)
    .is('archived_at', null)
    .single()
  return response
}

export const createComment = async (body, post_id) => {
  const response = await client
    .from('comments')
    .insert({
      body: body,
      post_id: post_id,
    })
    .limit(1)
    .single()
  return response
}

export const deleteUserComment = async id => {
  const response = await client.from('comments').delete().eq('id', id)
  return response
}

export const updateUserName = async ({ name, id }) => {
  const response = await client.from('users').update({ first_name: name }).eq('uuid', id)
  return response
}

export const likePost = async id => {
  const response = await client
    .from('likes')
    .insert({
      post_id: id,
    })
    .limit(1)
    .single()
  return response
}

export const unlikePost = async id => {
  const response = await client.from('likes').delete().eq('id', id)
  return response
}

export const getAllPostLikes = async id => {
  const response = client.from('likes').select('*', { count: 'exact' }).eq('post_id', id)
  return response
}

export const ifPostLiked = async ({ id, user_uuid }) => {
  const response = await client.from('likes').select('*').eq('post_id', id).eq('creator_uuid', user_uuid)
  return response
}

export const uploadFile = async ({ imageName, imageFile }) => {
  await client.storage.from('images').upload(imageName, decode(imageFile.base64), {
    cacheControl: '3600',
    upsert: false,
  })

  const imageUrl = await client.storage.from('images').getPublicUrl(imageName)

  return imageUrl.data.publicUrl
}

export const deletePost = async id => {
  const response = await client
    .from('posts')
    .update({
      archived_at: new Date().toISOString(),
    })
    .eq('id', id)
  return response
}
