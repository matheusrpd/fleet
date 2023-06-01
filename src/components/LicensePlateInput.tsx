import { Text, TextInput, TextInputProps, View } from 'react-native'
import colors from '../theme/colors'

interface LicensePlateInputProps extends TextInputProps {
  label: string
}

export function LicensePlateInput({ label, ...rest }: LicensePlateInputProps) {
  return (
    <View className="w-full rounded-md bg-gray-700 p-4">
      <Text className="font-sans text-sm text-gray-300">{label}</Text>

      <TextInput
        maxLength={7}
        autoCapitalize="characters"
        placeholderTextColor={colors.gray[400]}
        className="mt-4 text-center font-title text-3xl text-gray-200"
        {...rest}
      />
    </View>
  )
}
