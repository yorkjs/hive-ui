import { View, Text } from "@tarojs/components"
import { formatClassNames } from "../../util/function"

import styles from './index.module.styl'

export interface CellDescriptionProps {
  desc: string
  align?: 'left' | 'center' | 'right'
  className?: string
}

const CellDescription: React.FC<CellDescriptionProps> = ({ desc, align = 'left', className }) => {
  return (
    <View className={formatClassNames(
      styles['cell-description'],
      className)
    }>
      <Text
        className={styles['desc-text']}
        style={{ textAlign: align }}
      >
        {desc}
      </Text>
    </View>
  )
}

export default CellDescription