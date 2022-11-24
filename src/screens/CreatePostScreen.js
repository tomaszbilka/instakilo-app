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
  ScrollView,
} from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useNavigation } from '@react-navigation/native'
import * as ImagePicker from 'expo-image-picker'

import theme from '../styles/theme'
import { addPostValidation as validation } from '../utilities/validations'
import MyTextInput from '../components/MyTextInput'
import MyError from '../components/MyError'
import MyButton from '../components/MyButton'
import { createPost, uploadFile } from '../api/api'
import Loader from '../components/Loader'

const imageUrl =
  'https://upload.wikimedia.org/wikipedia/commons/thumb/3/3f/Placeholder_view_vector.svg/681px-Placeholder_view_vector.svg.png'

const CreatePostScreen = () => {
  const [isLoading, setIsLoading] = useState(false)
  const [image, setImage] = useState({ uri: imageUrl })
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

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [3, 3],
      quality: 1,
      base64: true,
    })

    if (!result.canceled) {
      setImage(result.assets[0])
    }
  }

  const onSubmit = async values => {
    setIsLoading(true)
    setError(null)

    try {
      const imagePath = await uploadFile({ imageName: values.title, imageFile: image })

      const resposne = await createPost(values.description, imagePath)
      if (resposne.error) {
        throw new Error('Sth went wrong...!!')
      }
      reset()
      setIsLoading(false)
      navigate('Home')
    } catch (err) {
      setIsLoading(false)
      console.log(err)
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
            <ScrollView>
              <View style={styles.photo}>
                <Image
                  style={styles.image}
                  source={{
                    uri: image.uri,
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
            </ScrollView>
            <View style={styles.buttonsContainer}>
              <View style={styles.buttons}>
                <MyButton title="Camera" onPress={pickImage} />
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
