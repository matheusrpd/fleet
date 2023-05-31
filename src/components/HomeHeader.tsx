import { Text, TouchableOpacity, View } from 'react-native'
import { Image } from 'expo-image'
import { useUser, useApp } from '@realm/react'
import { Power } from 'phosphor-react-native'

import colors from 'tailwindcss/colors'

export function HomeHeader() {
  const user = useUser()
  const app = useApp()

  function handleLogout() {
    app.currentUser?.logOut()
  }

  return (
    <View className="w-full flex-row items-center bg-gray-700 p-8">
      <Image
        source={{ uri: user?.profile.pictureUrl }}
        className="h-14 w-14 rounded-md"
        placeholder="L184i9ofbHof00ayjsay~qj[ayju"
      />

      <View className="ml-3 flex-1">
        <Text className="font-sans text-md text-gray-100">Olá,</Text>
        <Text className="font-title text-lg text-gray-100">
          {user?.profile.name}
        </Text>
      </View>

      <TouchableOpacity activeOpacity={0.7} onPress={handleLogout}>
        <Power size={32} color={colors.gray[400]} />
      </TouchableOpacity>
    </View>
  )
}
