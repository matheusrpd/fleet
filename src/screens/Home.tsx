import { useCallback, useEffect, useState } from 'react'
import { Alert, FlatList, Text, View } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import dayjs from 'dayjs'

import { HomeHeader } from '../components/HomeHeader'
import { CarStatus } from '../components/CarStatus'
import { HistoricCard, HistoricCardProps } from '../components/HistoricCard'

import { useQuery, useRealm } from '../libs/realm'
import { Historic } from '../libs/realm/Historic'

export function Home() {
  const { navigate } = useNavigation()

  const historic = useQuery(Historic)
  const realm = useRealm()

  const [vehicleInUse, setVehicleInUse] = useState<Historic | null>(null)
  const [vehicleHistoric, setVehicleHistoric] = useState<
    Array<HistoricCardProps>
  >([])

  const fetchVehicleInUse = useCallback(() => {
    try {
      const vehicle = historic.filtered("status = 'departure'")[0]

      setVehicleInUse(vehicle)
    } catch (err) {
      console.error(err)

      Alert.alert(
        'Veículo em uso',
        'Não foi possível carregar o veículo em uso.',
      )
    }
  }, [historic])

  const fetchHistoric = useCallback(() => {
    try {
      const historicResponse = historic.filtered(
        "status = 'arrival' SORT(created_at DESC)",
      )

      const formattedHistoric = historicResponse.map((item) => ({
        id: String(item._id),
        licensePlate: item.license_plate,
        createdAt: formatDate(item.created_at),
        isSync: false,
      }))

      setVehicleHistoric(formattedHistoric)
    } catch (err) {
      console.error(err)

      Alert.alert('Histórico', 'Não foi possível carregar o histórico de uso.')
    }
  }, [historic])

  useEffect(() => {
    fetchVehicleInUse()
    fetchHistoric()
  }, [fetchVehicleInUse, fetchHistoric])

  useEffect(() => {
    realm.addListener('change', () => fetchVehicleInUse())

    return () => {
      realm.removeListener('change', fetchVehicleInUse)
    }
  }, [realm, fetchVehicleInUse])

  function handleRegisterMovement() {
    if (!vehicleInUse) {
      navigate('departure')
    } else {
      navigate('arrival', { id: vehicleInUse._id.toString() })
    }
  }

  function handleHistoricDetails(id: string) {
    navigate('arrival', { id })
  }

  function formatDate(date: Date) {
    return dayjs(date).format('[Saída em] DD/MM/YYYY [às] HH:mm')
  }

  return (
    <View className="flex-1 bg-gray-800">
      <HomeHeader />

      <View className="flex-1 px-8">
        <CarStatus
          licensePlate={vehicleInUse?.license_plate}
          onPress={handleRegisterMovement}
        />

        <Text className="mb-3 font-title text-base text-gray-100">
          Histórico
        </Text>

        <FlatList
          data={vehicleHistoric}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <HistoricCard
              data={item}
              onPress={() => handleHistoricDetails(item.id)}
            />
          )}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 100 }}
          ListEmptyComponent={
            <Text className="mt-8 text-center font-sans text-sm text-gray-400">
              Nenhum veículo utilizado.
            </Text>
          }
        />
      </View>
    </View>
  )
}
