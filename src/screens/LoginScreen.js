import React, { useState } from 'react'
import { StyleSheet, View, TouchableWithoutFeedback, Keyboard, KeyboardAvoidingView, Platform } from 'react-native'
import { useForm, Controller } from 'react-hook-form'
import { useNavigation } from '@react-navigation/native'
import { yupResolver } from '@hookform/resolvers/yup'

import { loginScreenValidation as validation } from '../utilities/validations'
import { signInWithPassword } from '../api/api'
import { useAuth } from '../utilities/context'
import Loader from '../components/Loader'
import MyButton from '../components/MyButton'
import MyError from '../components/MyError'
import MyTextInput from '../components/MyTextInput'
import theme from '../styles/theme'

const LoginScreen = () => {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(false)
  const { login } = useAuth()
  const { navigate } = useNavigation()

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(validation),
    defaultValues: {
      email: '',
      password: '',
    },
  })

  const onSubmit = async values => {
    setIsLoading(true)
    setError(null)
    const { email, password } = values
    try {
      const response = await signInWithPassword(email, password)
      if (response.error) {
        throw new Error(response.error)
      }
      const token = response.data.session.access_token
      const userId = response.data.user.id
      if (token) {
        login(token, userId)
      }
    } catch (err) {
      setIsLoading(false)
      setError(err.message || 'Something went wrong!')
    }
  }

  const redirectToRegisterScreen = () => {
    navigate('Register')
  }

  if (isLoading) {
    return <Loader />
  }

  return (
    <TouchableWithoutFeedback
      onPress={() => {
        Keyboard.dismiss()
      }}
    >
      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={styles.container}>
        <View style={styles.inner}>
          <View>
            <Controller
              name="email"
              control={control}
              render={({ field: { onBlur, value, onChange } }) => (
                <MyTextInput placeholder="email" onBlur={onBlur} onChange={onChange} value={value} />
              )}
            />
            {errors.email && <MyError message={errors.email.message} />}
          </View>
          <View>
            <Controller
              name="password"
              control={control}
              render={({ field: { onBlur, value, onChange } }) => (
                <MyTextInput
                  placeholder="password"
                  onBlur={onBlur}
                  onChange={onChange}
                  value={value}
                  secureTextEntry={true}
                />
              )}
            />
            {errors.password && <MyError message={errors.password.message} />}
          </View>
          <MyButton title="Login" onPress={handleSubmit(onSubmit)} />
          <MyButton title="Sign up" onPress={redirectToRegisterScreen} />
          {error && (
            <View style={styles.error}>
              <MyError message={JSON.stringify(error)} />
            </View>
          )}
        </View>
      </KeyboardAvoidingView>
    </TouchableWithoutFeedback>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 16,
  },
  inner: {
    flex: 1,
    justifyContent: 'center',
  },
  error: {
    marginTop: theme.spacings.lg,
  },
})

export default LoginScreen
