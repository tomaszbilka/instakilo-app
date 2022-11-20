import AsyncStorage from '@react-native-async-storage/async-storage'

export const getItem = async key => {
  try {
    const storeData = await AsyncStorage.getItem(key)

    if (storeData) {
      return JSON.parse(storeData)
    }

    return null
  } catch (error) {
    console.error(error)
  }
}

export const storeItem = async (key, value) => {
  try {
    const jsonValue = JSON.stringify(value)

    await AsyncStorage.setItem(key, jsonValue)
  } catch (error) {
    console.error(error)
  }
}

export const removeItem = async key => {
  try {
    await AsyncStorage.removeItem(key)
  } catch (error) {
    console.error(error)
  }
}
