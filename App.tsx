import { StatusBar } from 'react-native'
import { AppProvider, UserProvider } from '@realm/react'
import {
  useFonts,
  Roboto_400Regular,
  Roboto_700Bold,
} from '@expo-google-fonts/roboto'

import { REALM_APP_ID } from '@env'

import { Loading } from './src/components/Loading'
import { SignIn } from './src/screens/SignIn'
import { Home } from './src/screens/Home'

export default function App() {
  const [fontsLoaded] = useFonts({
    Roboto_400Regular,
    Roboto_700Bold,
  })

  if (!fontsLoaded) {
    return <Loading />
  }

  return (
    <AppProvider id={REALM_APP_ID}>
      <StatusBar
        barStyle="light-content"
        backgroundColor="transparent"
        translucent
      />
      <UserProvider fallback={SignIn}>
        <Home />
      </UserProvider>
    </AppProvider>
  )
}
