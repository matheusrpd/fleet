import { IconProps } from 'phosphor-react-native'
import { TouchableOpacity, TouchableOpacityProps } from 'react-native'
import colors from '../theme/colors'

export type IconBoxProps = (props: IconProps) => JSX.Element

interface ButtonIconProps extends TouchableOpacityProps {
  icon: IconBoxProps
}

export function ButtonIcon({ icon: Icon, ...rest }: ButtonIconProps) {
  return (
    <TouchableOpacity
      className="h-14 w-14 items-center justify-center rounded-md bg-gray-600"
      activeOpacity={0.7}
      {...rest}
    >
      <Icon size={24} color={colors.brand[400]} />
    </TouchableOpacity>
  )
}
