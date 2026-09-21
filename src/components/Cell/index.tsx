import CellMain from './Cell'
import CellGroup from './CellGroup'
import CellCard from './CellCard'
import CellTitle from './CellTitle'
import CellValue from './CellValue'
import CellArrow from './CellArrow'
import CellDescription from './CellDescription'

export type { CellProps } from './Cell'
export type { CellCardProps } from './CellCard'
export type { CellTitleProps } from './CellTitle'

export { setCellConfig } from './config'

const Cell = Object.assign(CellMain, {
  Group: CellGroup,
  Card: CellCard,
  Title: CellTitle,
  Value: CellValue,
  Arrow: CellArrow,
  Description: CellDescription
})

export default Cell