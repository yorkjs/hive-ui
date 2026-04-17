import React from 'react'

import Icon from '../Icon'
import { formatClassNames } from '../../util/function'

import styles from './index.module.styl'

export interface CellArrowProps {
  className?: string
}
const CellArrow: React.FC<CellArrowProps> = ({
  className
}) => (
  <Icon
    name="right"
    className={formatClassNames(
      styles['arrow-icon'],
      className
    )}
    color="var(--textPlaceholder)"
    size={12}
  />
)

export default CellArrow