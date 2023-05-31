import { View } from 'react-native'

import { HomeHeader } from '../components/HomeHeader'

export function Home() {
  return (
    <View className="flex-1 bg-gray-800">
      <HomeHeader />
    </View>
  )
}
