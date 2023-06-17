import { useNavigation, useRoute } from '@react-navigation/native'
import { View, Text, Alert } from 'react-native'
import { BSON } from 'realm'
import { X } from 'phosphor-react-native'

import { Header } from '../components/Header'
import { Button } from '../components/Button'
import { ButtonIcon } from '../components/ButtonIcon'
import { useObject, useRealm } from '../libs/realm'
import { Historic } from '../libs/realm/Historic'

interface RouteParams {
  id: string
}

export function Arrival() {
  const { goBack } = useNavigation()
  const { params } = useRoute()
  const { id } = params as RouteParams

  const historic = useObject(Historic, new BSON.UUID(id))
  const realm = useRealm()

  function handleRemoveVehicleUsage() {
    Alert.alert('Cancelar', 'Cancelar a utilização do veículo?', [
      { text: 'Não', style: 'cancel' },
      { text: 'Sim', onPress: removeVehicleUsage },
    ])
  }

  function removeVehicleUsage() {
    realm.write(() => {
      realm.delete(historic)
    })

    goBack()
  }

  function handleArrivalRegister() {
    try {
      if (!historic) {
        return Alert.alert(
          'Erro',
          'Não foi possível obter os dados para registrar a chegada do veículo.',
        )
      }

      realm.write(() => {
        historic.status = 'arrival'
        historic.updated_at = new Date()
      })

      Alert.alert('Chegada', 'Chegada registrada com sucesso!')

      goBack()
    } catch (err) {
      console.error(err)

      Alert.alert('Erro', 'Não foi possível registrar a chegada do veículo.')
    }
  }

  const title = historic?.status === 'departure' ? 'Chegada' : 'Detalhes'

  return (
    <View className="flex-1 bg-gray-800">
      <Header title={title} />

      <View className="flex-grow p-8">
        <Text className="mb-1 mt-8 font-sans text-sm text-gray-300">
          Placa do veículo
        </Text>
        <Text className="font-title text-3xl text-gray-100">
          {historic?.license_plate}
        </Text>

        <Text className="mb-1 mt-8 font-sans text-sm text-gray-300">
          Finalidade
        </Text>
        <Text className="text-md font-sans text-gray-100">
          {historic?.description}
        </Text>

        {historic?.status === 'departure' ? (
          <View className="mt-auto w-full flex-row" style={{ gap: 16 }}>
            <ButtonIcon icon={X} onPress={handleRemoveVehicleUsage} />
            <Button title="Registrar chegada" onPress={handleArrivalRegister} />
          </View>
        ) : null}
      </View>
    </View>
  )
}
