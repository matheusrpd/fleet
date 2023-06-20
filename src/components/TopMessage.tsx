import { Text, View, useWindowDimensions } from 'react-native'

import colors from '../theme/colors'
import { IconBoxProps } from './ButtonIcon'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

interface TopMessageProps {
  title: string
  icon?: IconBoxProps
}

export function TopMessage({ title, icon: Icon }: TopMessageProps) {
  const { width } = useWindowDimensions()
  const { top } = useSafeAreaInsets()

  return (
    <View
      style={{ width, paddingTop: top + 4 }}
      className="absolute z-10 flex-row items-center justify-center bg-gray-500 pb-1"
    >
      {Icon ? <Icon size={18} color={colors.gray[100]} /> : null}
      <Text className="ml-1 font-sans text-xs text-gray-100">{title}</Text>
    </View>
  )
}
