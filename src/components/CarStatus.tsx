import {
  Text,
  View,
  TouchableOpacityProps,
  TouchableOpacity,
} from 'react-native'
import { Car, Key } from 'phosphor-react-native'

import colors from '../theme/colors'

interface CarStatusProps extends TouchableOpacityProps {
  licensePlate?: string
}

export function CarStatus({ licensePlate, ...rest }: CarStatusProps) {
  const Icon = licensePlate ? Key : Car

  const message = licensePlate
    ? `Veículo ${licensePlate} em uso. `
    : 'Nenhum veículo em uso. '

  const status = licensePlate ? 'chegada' : 'saída'

  return (
    <TouchableOpacity
      className="my-8 w-full flex-row items-center rounded-md bg-gray-700 p-6"
      activeOpacity={0.7}
      {...rest}
    >
      <View className="mr-3 h-20 w-20 items-center justify-center rounded-md bg-gray-600">
        <Icon size={40} color={colors.brand[400]} />
      </View>

      <Text
        className="flex-1 font-sans text-sm text-gray-100"
        style={{ textAlignVertical: 'center' }}
      >
        {message}

        <Text className="font-title text-sm text-brand-400">
          Clique aqui para registrar a {status}
        </Text>
      </Text>
    </TouchableOpacity>
  )
}
