import { Text, View } from 'react-native'

import { IconBox, IconProps } from './IconBox'

interface LocationInfoProps {
  label: string
  description: string
  icon: IconProps
}

export function LocationInfo({ label, description, icon }: LocationInfoProps) {
  return (
    <View className="w-full flex-row items-center">
      <IconBox icon={icon} />

      <View className="ml-3 flex-1">
        <Text className="text-sans text-sm text-gray-300" numberOfLines={1}>
          {label}
        </Text>

        <Text className="text-sans text-sm text-gray-100" numberOfLines={1}>
          {description}
        </Text>
      </View>
    </View>
  )
}
