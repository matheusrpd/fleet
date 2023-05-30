import { ActivityIndicator, View } from 'react-native'
import colors from '../theme/colors'

export function Loading() {
  return (
    <View className="flex-1 items-center justify-center bg-gray-800">
      <ActivityIndicator color={colors.brand[400]} className="text-brand-400" />
    </View>
  )
}
