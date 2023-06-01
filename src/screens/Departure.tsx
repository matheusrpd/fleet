import { useRef } from 'react'
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  TextInput,
  View,
} from 'react-native'

import { Header } from '../components/Header'
import { LicensePlateInput } from '../components/LicensePlateInput'
import { TextAreaInput } from '../components/TextAreaInput'
import { Button } from '../components/Button'

const keyboardAvoidingViewBehavior =
  Platform.OS === 'android' ? 'height' : 'position'

export function Departure() {
  const descriptionRef = useRef<TextInput>(null)

  function handleDepartureRegister() {
    console.log('1')
  }

  return (
    <View className="flex-1 bg-gray-800">
      <Header title="Saída" />

      <KeyboardAvoidingView
        behavior={keyboardAvoidingViewBehavior}
        className="flex-1"
      >
        <ScrollView>
          <View className="flex-1 p-8 pt-12" style={{ gap: 16 }}>
            <LicensePlateInput
              label="Placa de veículo"
              placeholder="BRA-0000"
              onSubmitEditing={() => descriptionRef.current?.focus()}
              returnKeyType="next"
            />

            <TextAreaInput
              ref={descriptionRef}
              label="Finalidade"
              placeholder="Vou utilizar o veículo para..."
              onSubmitEditing={handleDepartureRegister}
              returnKeyType="send"
              blurOnSubmit
            />

            <Button title="Registrar saída" onPress={handleDepartureRegister} />
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  )
}
