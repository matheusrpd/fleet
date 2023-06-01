import {
  ActivityIndicator,
  Text,
  TouchableOpacity,
  TouchableOpacityProps,
} from 'react-native'

interface ButtonProps extends TouchableOpacityProps {
  title: string
  isLoading?: boolean
}

export function Button({ title, isLoading = false, ...rest }: ButtonProps) {
  return (
    <TouchableOpacity
      className="max-h-14 min-h-[56] w-full flex-1 items-center justify-center rounded-md bg-brand-700"
      activeOpacity={0.7}
      disabled={isLoading}
      {...rest}
    >
      {isLoading ? (
        <ActivityIndicator color="#ffffff" />
      ) : (
        <Text className="font-title text-base text-white">{title}</Text>
      )}
    </TouchableOpacity>
  )
}
