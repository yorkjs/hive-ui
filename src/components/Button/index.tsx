import { View, Text } from '@tarojs/components'

import './index.styl'

interface ButtonProps {
  text: string
  onClick?: () => void
  type?: 'primary' | 'default'
}

const Button = ({ text, onClick, type = 'default' }: ButtonProps) => {
  return (
    <View className={`hive-btn hive-btn--${type}`} onClick={onClick}>
      <Text>{text}</Text>
    </View>
  )
}

export default Button