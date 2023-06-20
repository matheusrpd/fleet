import { Text, TouchableOpacity, View } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { ArrowLeft } from 'phosphor-react-native'

import colors from '../theme/colors'

interface HeaderProps {
  title: string
}

export function Header({ title }: HeaderProps) {
  const { top } = useSafeAreaInsets()
  const { goBack } = useNavigation()

  return (
    <View
      className="w-full flex-row justify-between bg-gray-700 px-8 pb-6"
      style={{ paddingTop: top + 42 }}
    >
      <TouchableOpacity activeOpacity={0.7} onPress={goBack}>
        <ArrowLeft size={24} weight="bold" color={colors.brand[400]} />
      </TouchableOpacity>

      <Text className="font-title text-xl text-gray-100">{title}</Text>
    </View>
  )
}
