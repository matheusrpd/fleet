import { View } from 'react-native'
import { IconProps as IconPrimitiveProps } from 'phosphor-react-native'

import colors from '../theme/colors'

export type IconProps = (props: IconPrimitiveProps) => JSX.Element

interface IconBoxProps {
  size?: 'sm' | 'md'
  icon: IconProps
}

export function IconBox({ size = 'md', icon: Icon }: IconBoxProps) {
  return (
    <View
      className={`items-center justify-center rounded-md bg-gray-700 ${
        size === 'sm' ? 'h-8 w-8' : 'h-12 w-12'
      }`}
    >
      <Icon size={size === 'md' ? 24 : 16} color={colors.brand[400]} />
    </View>
  )
}
