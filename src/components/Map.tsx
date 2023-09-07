import { useRef } from 'react'
import MapView, {
  PROVIDER_GOOGLE,
  MapViewProps,
  LatLng,
  Marker,
  Polyline,
} from 'react-native-maps'
import { Car, FlagCheckered } from 'phosphor-react-native'

import { IconBox } from './IconBox'
import colors from '../theme/colors'

interface MapProps extends MapViewProps {
  coordinates: Array<LatLng>
}

export function Map({ coordinates, ...props }: MapProps) {
  const mapRef = useRef<MapView | null>(null)

  const lastCoordinate = coordinates[coordinates.length - 1]

  async function onMapLoaded() {
    if (coordinates.length > 1) {
      mapRef.current?.fitToSuppliedMarkers(['departure', 'arrival'], {
        edgePadding: {
          top: 50,
          right: 50,
          bottom: 50,
          left: 50,
        },
      })
    }
  }

  return (
    <MapView
      ref={mapRef}
      provider={PROVIDER_GOOGLE}
      region={{
        latitude: lastCoordinate.latitude,
        longitude: lastCoordinate.longitude,
        latitudeDelta: 0.005,
        longitudeDelta: 0.005,
      }}
      onMapLoaded={onMapLoaded}
      className="aspect-video w-full"
      {...props}
    >
      <Marker identifier="departure" coordinate={coordinates[0]}>
        <IconBox icon={Car} size="sm" />
      </Marker>

      {coordinates.length > 1 ? (
        <>
          <Marker identifier="arrival" coordinate={lastCoordinate}>
            <IconBox icon={FlagCheckered} size="sm" />
          </Marker>

          <Polyline
            coordinates={coordinates}
            strokeColor={colors.gray[700]}
            strokeWidth={7}
          />
        </>
      ) : null}
    </MapView>
  )
}
