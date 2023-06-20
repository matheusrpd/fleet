import Toast from 'react-native-toast-message'
import { NavigationContainer } from '@react-navigation/native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

import { TopMessage } from '../components/TopMessage'
import { AppRoutes } from './app.routes'

export function Routes() {
  const { top } = useSafeAreaInsets()

  return (
    <NavigationContainer>
      <AppRoutes />

      <Toast
        config={{ info: ({ text1 }) => <TopMessage title={String(text1)} /> }}
        topOffset={top}
      />
    </NavigationContainer>
  )
}
