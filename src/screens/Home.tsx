import { useCallback, useEffect, useState } from 'react'
import { Alert, View } from 'react-native'
import { useNavigation } from '@react-navigation/native'

import { HomeHeader } from '../components/HomeHeader'
import { CarStatus } from '../components/CarStatus'

import { useQuery, useRealm } from '../libs/realm'
import { Historic } from '../libs/realm/Historic'

export function Home() {
  const { navigate } = useNavigation()

  const historic = useQuery(Historic)
  const realm = useRealm()

  const [vehicleInUse, setVehicleInUse] = useState<Historic | null>(null)

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

  useEffect(() => {
    fetchVehicleInUse()
  }, [fetchVehicleInUse])

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

  return (
    <View className="flex-1 bg-gray-800">
      <HomeHeader />
      <View className="flex-1 px-8">
        <CarStatus
          licensePlate={vehicleInUse?.license_plate}
          onPress={handleRegisterMovement}
        />
      </View>
    </View>
  )
}
