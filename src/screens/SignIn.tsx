import { useEffect, useState } from 'react'
import { Alert, ImageBackground, Text, View } from 'react-native'
import * as WebBrowser from 'expo-web-browser'
import * as Google from 'expo-auth-session/providers/google'
import { Realm, useApp } from '@realm/react'

import { ANDROID_CLIENT_ID, IOS_CLIENT_ID } from '@env'

import { Button } from '../components/Button'

import backgroundImg from '../assets/background.png'

WebBrowser.maybeCompleteAuthSession()

export function SignIn() {
  const [isAuthenticating, setIsAuthenticating] = useState(false)

  const app = useApp()

  // eslint-disable-next-line no-unused-vars
  const [_, response, googleSignIn] = Google.useAuthRequest({
    androidClientId: ANDROID_CLIENT_ID,
    iosClientId: IOS_CLIENT_ID,
    scopes: ['profile', 'email'],
  })

  function handleGoogleSignIn() {
    setIsAuthenticating(true)

    googleSignIn().then((response) => {
      if (response.type !== 'success') {
        setIsAuthenticating(false)
      }
    })
  }

  useEffect(() => {
    if (response?.type === 'success') {
      if (response.authentication?.idToken) {
        const credentials = Realm.Credentials.jwt(
          response.authentication.idToken,
        )

        app.logIn(credentials).catch((err) => {
          console.error(err)

          Alert.alert('Não foi possível conectar-se a sua conta Google.')

          setIsAuthenticating(false)
        })
      } else {
        Alert.alert('Não foi possível conectar-se a sua conta Google.')

        setIsAuthenticating(false)
      }
    }
  }, [app, response])

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

        <Button
          title="Entrar com Google"
          isLoading={isAuthenticating}
          onPress={handleGoogleSignIn}
        />
      </ImageBackground>
    </View>
  )
}
