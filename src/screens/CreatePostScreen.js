import React, { useState } from 'react'
import { yupResolver } from '@hookform/resolvers/yup'
import { useForm, Controller } from 'react-hook-form'
import {
  View,
  StyleSheet,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Platform,
  Keyboard,
  Image,
} from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useNavigation } from '@react-navigation/native'

import theme from '../styles/theme'
import { addPostValidation as validation } from '../utilities/validations'
import MyTextInput from '../components/MyTextInput'
import MyError from '../components/MyError'
import MyButton from '../components/MyButton'
import { createPost } from '../api/api'
import Loader from '../components/Loader'

const imageUrl =
  'https://images.unsplash.com/photo-1661961110218-35af7210f803?ixlib=rb-4.0.3&ixid=MnwxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80'

const CreatePostScreen = () => {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(false)

  const { navigate } = useNavigation()
  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(validation),
    defaultValues: {
      title: '',
      description: '',
    },
  })

  const onSubmit = async values => {
    setIsLoading(true)
    setError(null)
    try {
      const resposne = await createPost(values.description, imageUrl)
      if (resposne.error) {
        throw new Error('Sth went wrong...!!')
      }
      reset()
      setIsLoading(false)
      navigate('Home')
    } catch (err) {
      setIsLoading(false)
      setError(err.message || 'Something went wrong!')
    }
  }

  return (
    <SafeAreaView style={styles.container}>
      <TouchableWithoutFeedback
        onPress={() => {
          Keyboard.dismiss()
        }}
      >
        {isLoading ? (
          <Loader />
        ) : (
          <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={styles.container}>
            <View style={styles.photo}>
              <Image
                style={styles.image}
                source={{
                  uri: imageUrl,
                }}
              />
            </View>
            <View style={styles.form}>
              <View>
                <Controller
                  name="title"
                  control={control}
                  render={({ field: { onBlur, value, onChange } }) => (
                    <MyTextInput placeholder="title" onBlur={onBlur} onChange={onChange} value={value} />
                  )}
                />
                {errors.title && <MyError message={errors.title.message} />}
              </View>

              <View>
                <Controller
                  name="description"
                  control={control}
                  render={({ field: { onBlur, value, onChange } }) => (
                    <MyTextInput
                      placeholder="description"
                      onBlur={onBlur}
                      onChange={onChange}
                      value={value}
                      multiline={true}
                      numberOfLines={3}
                    />
                  )}
                />
                {errors.description && <MyError message={errors.description.message} />}
              </View>
            </View>
            <View style={styles.buttonsContainer}>
              <View style={styles.buttons}>
                <MyButton title="Camera" onPress={() => console.log('open camera')} />
              </View>
              <View style={styles.buttons}>
                <MyButton title="Add" onPress={handleSubmit(onSubmit)} />
              </View>
            </View>
            {error && (
              <View style={styles.error}>
                <MyError message={JSON.stringify(error)} />
              </View>
            )}
          </KeyboardAvoidingView>
        )}
      </TouchableWithoutFeedback>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: theme.spacings.sm,
  },
  photo: {
    flex: 1,
    alignItems: 'center',
    marginBottom: theme.spacings.lg,
  },
  form: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  buttonsContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'flex-end',
  },
  buttons: {
    width: '50%',
  },
  image: {
    width: 200,
    height: 200,
    borderColor: theme.colors.primary,
    borderWidth: 4,
  },
  error: {
    alignItems: 'center',
  },
})

export default CreatePostScreen
