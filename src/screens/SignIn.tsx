import { ImageBackground, Text, View } from 'react-native'

import backgroundImg from '../assets/background.png'
import { Button } from '../components/Button'

export function SignIn() {
  return (
    <View className="flex-1">
      <ImageBackground
        source={backgroundImg}
        resizeMode="cover"
        className="flex-1 items-center justify-center p-14"
      >
        <Text className="text-center font-title text-3xl text-brand-400">
          Ignite Fleet
        </Text>

        <Text className="mb-8 text-center font-sans text-md text-gray-100">
          Gestão de uso de veículos
        </Text>

        <Button title="Entrar com Google" />
      </ImageBackground>
    </View>
  )
}
