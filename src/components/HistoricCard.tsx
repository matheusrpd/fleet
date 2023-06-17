import {
  TouchableOpacity,
  View,
  Text,
  TouchableOpacityProps,
} from 'react-native'
import { Check, ClockClockwise } from 'phosphor-react-native'
import colors from '../theme/colors'

export type HistoricCardProps = {
  id: string
  licensePlate: string
  createdAt: string
  isSync: boolean
}

interface Props extends TouchableOpacityProps {
  data: HistoricCardProps
}

export function HistoricCard({
  data: { licensePlate, createdAt, isSync },
  ...rest
}: Props) {
  return (
    <TouchableOpacity
      className="mb-3 w-full flex-row items-center justify-between rounded-md bg-gray-700 px-4 py-5"
      activeOpacity={0.7}
      {...rest}
    >
      <View className="flex-1">
        <Text className="font-title text-sm text-white">{licensePlate}</Text>
        <Text className="mt-1 font-sans text-xs text-gray-200">
          {createdAt}
        </Text>
      </View>

      {isSync ? (
        <Check size={24} color={colors.brand[400]} />
      ) : (
        <ClockClockwise size={24} color={colors.gray[400]} />
      )}
    </TouchableOpacity>
  )
}
