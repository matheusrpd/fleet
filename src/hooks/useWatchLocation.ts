import { useEffect } from 'react'
import {
  LocationAccuracy,
  LocationObjectCoords,
  LocationSubscription,
  watchPositionAsync,
} from 'expo-location'

interface useWatchLocationProps {
  permissionGranted: boolean
  time?: number
  watchLocation: (location: LocationObjectCoords) => Promise<void>
}

export function useWatchLocation({
  time = 1000,
  permissionGranted,
  watchLocation,
}: useWatchLocationProps) {
  useEffect(() => {
    if (!permissionGranted) {
      return
    }

    let subscription: LocationSubscription

    watchPositionAsync(
      {
        accuracy: LocationAccuracy.High,
        timeInterval: time,
      },
      (location) => watchLocation(location.coords),
    ).then((response) => (subscription = response))

    return () => {
      subscription?.remove()
    }
  }, [permissionGranted, time, watchLocation])
}
