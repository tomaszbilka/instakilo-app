import React, { useState } from 'react'
import { StyleSheet, View, TouchableWithoutFeedback, Keyboard, KeyboardAvoidingView, Platform } from 'react-native'
import { useForm, Controller } from 'react-hook-form'
import { useNavigation } from '@react-navigation/native'
import { yupResolver } from '@hookform/resolvers/yup'

import { registerScreenValidation as validation } from '../utilities/validations'
import { signUp } from '../api/api'
import Loader from '../components/Loader'
import MyButton from '../components/MyButton'
import MyError from '../components/MyError'
import MyTextInput from '../components/MyTextInput'
import theme from '../styles/theme'

const RegisterScreen = ({ navigation }) => {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(false)
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
      confirmPassword: '',
    },
  })

  const onSubmit = async values => {
    setIsLoading(true)
    setError(null)
    const { email, password } = values
    try {
      const response = await signUp(email, password)
      if (response.error) {
        throw new Error(response.error)
      }
      const token = response.data.session.access_token
      if (token) {
        navigate('Login')
      }
    } catch (err) {
      setIsLoading(false)
      setError(err.message || 'Something went wrong!')
    }
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
                  onBlur={onBlur}
                  onChange={onChange}
                  placeholder="password"
                  secureTextEntry={true}
                  value={value}
                />
              )}
            />
            {errors.password && <MyError message={errors.password.message} />}
          </View>
          <View>
            <Controller
              name="confirmPassword"
              control={control}
              render={({ field: { onBlur, value, onChange } }) => (
                <MyTextInput
                  onBlur={onBlur}
                  onChange={onChange}
                  placeholder="confirm password"
                  secureTextEntry={true}
                  value={value}
                />
              )}
            />
            {errors.confirmPassword && <MyError message={errors.confirmPassword.message} />}
          </View>
          <MyButton title="Register" onPress={handleSubmit(onSubmit)} />
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
    marginTop: theme.spacings.md,
  },
})

export default RegisterScreen
