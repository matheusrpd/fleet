import { useRef, useState } from 'react'
import { Alert, ScrollView, TextInput, View } from 'react-native'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { useUser } from '@realm/react'
import { useNavigation } from '@react-navigation/native'

import { Header } from '../components/Header'
import { LicensePlateInput } from '../components/LicensePlateInput'
import { TextAreaInput } from '../components/TextAreaInput'
import { Button } from '../components/Button'

import { licensePlateValidade } from '../utils/licensePlateValidate'
import { useRealm } from '../libs/realm'
import { Historic } from '../libs/realm/Historic'

export function Departure() {
  const { goBack } = useNavigation()

  const licensePlateRef = useRef<TextInput>(null)
  const descriptionRef = useRef<TextInput>(null)

  const [licensePlate, setLicensePlate] = useState('')
  const [description, setDescription] = useState('')

  const [isRegistering, setIsRegistering] = useState(false)

  const realm = useRealm()
  const user = useUser()

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

  return (
    <View className="flex-1 bg-gray-800">
      <Header title="Saída" />

      <KeyboardAwareScrollView>
        <ScrollView>
          <View className="flex-1 p-8 pt-12" style={{ gap: 16 }}>
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
