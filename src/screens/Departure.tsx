import { useCallback, useEffect, useRef, useState } from 'react'
import { Alert, ScrollView, Text, TextInput, View } from 'react-native'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { useUser } from '@realm/react'
import { useNavigation } from '@react-navigation/native'
import { useForegroundPermissions, LocationObjectCoords } from 'expo-location'
import { Car } from 'phosphor-react-native'

import { Header } from '../components/Header'
import { Button } from '../components/Button'
import { Loading } from '../components/Loading'
import { LocationInfo } from '../components/LocationInfo'
import { LicensePlateInput } from '../components/LicensePlateInput'
import { TextAreaInput } from '../components/TextAreaInput'
import { Map } from '../components/Map'

import { licensePlateValidade } from '../utils/licensePlateValidate'
import { useRealm } from '../libs/realm'
import { Historic } from '../libs/realm/Historic'
import { useWatchLocation } from '../hooks/useWatchLocation'
import { getAddressLocation } from '../utils/getAddressLocation'

export function Departure() {
  const { goBack } = useNavigation()

  const licensePlateRef = useRef<TextInput>(null)
  const descriptionRef = useRef<TextInput>(null)

  const [licensePlate, setLicensePlate] = useState('')
  const [description, setDescription] = useState('')

  const [currentAddress, setcurrentAddress] = useState<string | null>(null)
  const [currentCords, setCurrentCords] = useState<LocationObjectCoords | null>(
    null,
  )

  const [isRegistering, setIsRegistering] = useState(false)
  const [isLoadingAddress, setIsLoadingAddress] = useState(true)

  const [locationForegroundPermission, requestLocationForegroundPermission] =
    useForegroundPermissions()

  const realm = useRealm()
  const user = useUser()

  const handleWatchLocation = useCallback(
    async (location: LocationObjectCoords) => {
      try {
        setCurrentCords(location)

        const address = await getAddressLocation(location)

        if (address) {
          setcurrentAddress(address)
        }
      } catch (err) {
        console.error(err)
      } finally {
        setIsLoadingAddress(false)
      }
    },
    [],
  )

  useWatchLocation({
    permissionGranted: !!locationForegroundPermission?.granted,
    watchLocation: handleWatchLocation,
  })

  useEffect(() => {
    requestLocationForegroundPermission()
  }, [requestLocationForegroundPermission])

  function handleDepartureRegister() {
    try {
      if (!licensePlateValidade(licensePlate)) {
        licensePlateRef.current?.focus()
        return Alert.alert(
          'Placa inválida',
          'A placa é inválida, por favor informe a placa correta do veículo.',
        )
      }

      if (!description.trim()) {
        descriptionRef.current?.focus()
        return Alert.alert(
          'Finalidade',
          'Por favor, informe a finalidade da utilização do veículo.',
        )
      }

      setIsRegistering(true)

      realm.write(() => {
        realm.create(
          'Historic',
          Historic.generate({
            user_id: user!.id,
            license_plate: licensePlate.toUpperCase(),
            description,
          }),
        )
      })

      Alert.alert('Saída', 'Saída do veículo registrada com sucesso!')

      goBack()
    } catch (error) {
      console.error(error)
      Alert.alert('Error', 'Não foi possível registrar a saída do veículo.')
    } finally {
      setIsRegistering(false)
    }
  }

  if (isLoadingAddress) {
    return <Loading />
  }

  if (!locationForegroundPermission?.granted) {
    return (
      <View className="flex-1 bg-gray-800">
        <Header title="Saída" />
        <Text className="m-6 text-center font-sans leading-relaxed text-white">
          Você precisa permitir que o aplicativo tenha acesso a localização para
          utilizar essa funcionalidade. Por favor acesse as configurações do seu
          dispositivo para conceder essa permissão ao aplicativo.
        </Text>
      </View>
    )
  }

  return (
    <View className="flex-1 bg-gray-800">
      <Header title="Saída" />

      <KeyboardAwareScrollView>
        <ScrollView>
          {currentCords ? <Map coordinates={[currentCords]} /> : null}

          <View className="flex-1 p-8" style={{ gap: 16 }}>
            {currentAddress ? (
              <LocationInfo
                icon={Car}
                label="Localização atual"
                description={currentAddress}
              />
            ) : null}

            <LicensePlateInput
              ref={licensePlateRef}
              label="Placa de veículo"
              placeholder="BRA-0000"
              onSubmitEditing={() => descriptionRef.current?.focus()}
              returnKeyType="next"
              onChangeText={setLicensePlate}
            />

            <TextAreaInput
              ref={descriptionRef}
              label="Finalidade"
              placeholder="Vou utilizar o veículo para..."
              onSubmitEditing={handleDepartureRegister}
              returnKeyType="send"
              blurOnSubmit
              onChangeText={setDescription}
            />

            <Button
              title="Registrar saída"
              onPress={handleDepartureRegister}
              isLoading={isRegistering}
            />
          </View>
        </ScrollView>
      </KeyboardAwareScrollView>
    </View>
  )
}
