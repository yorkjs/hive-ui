import { IProductCardLabels } from './ProductItem'

// 初始默认文案
let globalLabels: IProductCardLabels = {
  product_type: {
    real: '实物',
    virtual: '虚拟',
    service: '服务'
  },
  delivery_type: {
    dine: '堂食',
    self_pickup: '到店自取',
    delivery: '送货上门'
  },
  activity_type: {
    flash: '秒杀活动',
    brand: '品牌活动',
    hot: '热点活动',
    present: '买赠活动'
  },
  present_badge: '赠',
  stock_label: '库存',
  sale_label: '销量',
  multiple_spec: '多规格',
  barcode_label: '条码',
  spec_label: '规格',
  sold_out: '售罄',
  offline: '已下架'
}

export const setProductItemConfig = (labels: IProductCardLabels) => {
  globalLabels = { ...globalLabels, ...labels }
}

export const getProductItemConfig = () => globalLabels