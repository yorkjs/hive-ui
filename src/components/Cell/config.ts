let onTooltipPress = (data: { title: string; tooltip: any }) => {
  console.log('触发 Tooltip:', data)
}

export const setCellConfig = (config: { onTooltipPress: typeof onTooltipPress }) => {
  if (config.onTooltipPress) {
    onTooltipPress = config.onTooltipPress
  }
}

export const getCellConfig = () => ({
  onTooltipPress
})