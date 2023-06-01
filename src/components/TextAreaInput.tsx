import { Text, TextInput, TextInputProps, View } from 'react-native'
import colors from '../theme/colors'
import { forwardRef } from 'react'

interface TextAreaInputProps extends TextInputProps {
  label: string
}

export const TextAreaInput = forwardRef<TextInput, TextAreaInputProps>(
  ({ label, ...rest }, ref) => {
    return (
      <View className="h-36 w-full rounded-md bg-gray-700 p-4">
        <Text className="font-sans text-sm text-gray-300">{label}</Text>

        <TextInput
          ref={ref}
          multiline
          autoCapitalize="sentences"
          placeholderTextColor={colors.gray[400]}
          className="py-4 align-top font-sans text-base text-gray-200"
          {...rest}
        />
      </View>
    )
  },
)

TextAreaInput.displayName = 'TextAreaInput'
