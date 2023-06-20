import 'react-native-get-random-values'
import './src/libs/dayjs'

import { StatusBar } from 'react-native'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import { AppProvider, UserProvider } from '@realm/react'
import {
  useFonts,
  Roboto_400Regular,
  Roboto_700Bold,
} from '@expo-google-fonts/roboto'
import { useNetInfo } from '@react-native-community/netinfo'
import { WifiSlash } from 'phosphor-react-native'

import { REALM_APP_ID } from '@env'

import { RealmProvider, syncConfig } from './src/libs/realm'

import { TopMessage } from './src/components/TopMessage'
import { Loading } from './src/components/Loading'
import { SignIn } from './src/screens/SignIn'
import { Routes } from './src/routes'

export default function App() {
  const netInfo = useNetInfo()

  const [fontsLoaded] = useFonts({
    Roboto_400Regular,
    Roboto_700Bold,
  })

  if (!fontsLoaded) {
    return <Loading />
  }

  return (
    <AppProvider id={REALM_APP_ID}>
      <SafeAreaProvider className="flex-1 bg-gray-800">
        <StatusBar
          barStyle="light-content"
          backgroundColor="transparent"
          translucent
        />

        {!netInfo.isConnected ? (
          <TopMessage title="Você está off-line" icon={WifiSlash} />
        ) : null}

        <UserProvider fallback={SignIn}>
          <RealmProvider sync={syncConfig} fallback={Loading}>
            <Routes />
          </RealmProvider>
        </UserProvider>
      </SafeAreaProvider>
    </AppProvider>
  )
}
