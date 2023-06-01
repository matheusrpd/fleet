import { Text, TextInput, TextInputProps, View } from 'react-native'
import colors from '../theme/colors'
import { forwardRef } from 'react'

interface LicensePlateInputProps extends TextInputProps {
  label: string
}

export const LicensePlateInput = forwardRef<TextInput, LicensePlateInputProps>(
  ({ label, ...rest }, ref) => {
    return (
      <View className="w-full rounded-md bg-gray-700 p-4">
        <Text className="font-sans text-sm text-gray-300">{label}</Text>

        <TextInput
          ref={ref}
          maxLength={7}
          autoCapitalize="characters"
          placeholderTextColor={colors.gray[400]}
          className="mt-4 text-center font-title text-3xl text-gray-200"
          {...rest}
        />
      </View>
    )
  },
)

LicensePlateInput.displayName = 'LicensePlateInput'
