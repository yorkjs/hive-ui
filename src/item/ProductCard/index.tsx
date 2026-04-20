import React, { useMemo } from 'react'
import { View, Text, ScrollView, Image, ITouchEvent } from '@tarojs/components'

import { formatClassNames, isEmpty } from '../../util/function'

import Tag from '../../components/Tag'
import Icon from '../../components/Icon'
import Checkbox from '../../components/Checkbox'

import styles from './index.module.styl'

import {
  MALL_PRODUCT_TYPE_REAL,
  MALL_PRODUCT_TYPE_VIRTUAL,
  MALL_PRODUCT_TYPE_SERVICE,
  MALL_PRODUCT_DELIVERY_TYPE_EXPRESS,
  MALL_PRODUCT_DELIVERY_TYPE_SELF,
  MALL_PRODUCT_DELIVERY_TYPE_SHOP,
  MALL_PRODUCT_DELIVERY_TYPE_DINE,
  PROMOTION_ACTIVITY_TYPE_FLASH,
  PROMOTION_ACTIVITY_TYPE_BRAND,
  PROMOTION_ACTIVITY_TYPE_HOT,
  PROMOTION_ACTIVITY_TYPE_PRESENT,
} from '../../constant/mall'

export interface IProductCardLabels {
  product_type?: { real: string; virtual: string; service: string }
  delivery_type?: { dine: string; self_pickup: string; delivery: string }
  activity_type?: { flash: string; brand: string; hot: string; present: string }
  present_badge?: string
  stock_label?: string
  sale_label?: string
  multiple_spec?: string
  barcode_label?: string
  spec_label?: string
  sold_out?: string
  offline?: string
}

/** 商品卡片组件属性 */
export interface IProductCardProps {
  /** 外部样式类 */
  className?: string
  /** 商品图片对象 */
  image: { url: string }
  /** 是否显示售罄标记 */
  showSoldOut?: boolean
  /** 是否显示已下架标记 */
  showOffline?: boolean
  /** 商品标题 */
  title: string
  /** 标题最大显示行数 (默认1) */
  titleMaxLines?: number
  /** 商品类型：实物/虚拟/服务 */
  productType?: number
  /** 是否显示“多规格”标签 */
  showMultipleSpec?: boolean
  /** 库存数量文案 */
  stockCount?: string | number
  /** 销量文案 */
  saleCount?: string | number
  /** 商品条码 */
  barcode?: string
  /** 规格描述文案 (如: 红色, 大号) */
  spec?: string
  /** 规格描述最大显示行数 (默认1) */
  specMaxLines?: number
  /** 活动类型：秒杀/品牌/热点/满赠 */
  activityType?: number
  /** 配送方式集合：堂食/自提/外送 */
  deliveryTypes?: number[]
  /** 做法/定制化信息描述 */
  customization?: string
  /** 做法描述最大显示行数 (默认3) */
  customizationMaxLines?: number
  /** 售价 */
  salePrice: string | number
  /** 原价 (划线价) */
  originalPrice?: string | number
  /** 已购数量 (显示为 xN) */
  buyCount?: number
  /** 是否显示左侧勾选框 */
  showCheckbox?: boolean
  /** 勾选框是否选中 */
  checkboxChecked?: boolean
  /** 勾选框是否禁用 */
  checkboxDisabled?: boolean
  /** 点击勾选框或卡片触发 (当 checkbox 可用时) */
  onCheckboxClick?: () => void
  /** 是否显示右上角删除按钮 */
  showDelete?: boolean
  /** 点击删除按钮回调 */
  onDelete?: () => void
  /** 右下角自定义操作区域 (与 buyCount 互斥) */
  action?: React.ReactNode
  /** 国际化标签注入 */
  labels?: IProductCardLabels
  // 卡片点击事件
  onClick?: () => void
  children?: React.ReactNode
}

const DEFAULT_LABELS: IProductCardLabels = {
  product_type: { real: '实物', virtual: '虚拟', service: '服务' },
  delivery_type: { dine: '堂食', self_pickup: '到店自取', delivery: '送货上门' },
  activity_type: { flash: '秒杀活动', brand: '品牌活动', hot: '热点活动', present: '买赠活动' },
  present_badge: '赠',
  stock_label: '库存',
  sale_label: '销量',
  multiple_spec: '多规格',
  barcode_label: '条码',
  spec_label: '规格',
  sold_out: '售罄',
  offline: '已下架'
}

const ProductCard: React.FC<IProductCardProps> = (props) => {
  const {
    image,
    title,
    titleMaxLines = 1,
    productType,
    showMultipleSpec,
    stockCount,
    saleCount,
    barcode,
    spec,
    specMaxLines = 1,
    activityType,
    deliveryTypes = [],
    customization,
    customizationMaxLines = 3,
    salePrice,
    originalPrice,
    buyCount,
    showSoldOut = false,
    showOffline = false,
    showCheckbox = false,
    checkboxChecked = false,
    checkboxDisabled = false,
    onCheckboxClick,
    showDelete,
    onDelete,
    action,
    className,
    labels: customLabels,
    onClick,
    children
  } = props

  const handleCardClick = (e: ITouchEvent) => {
    if (showCheckbox) {
      if (!checkboxDisabled) {
        onCheckboxClick?.()
      }
    }
    else {
      onClick?.()
    }
  }

  const labels = useMemo(() => ({
    ...DEFAULT_LABELS,
    ...customLabels,
    product_type: { ...DEFAULT_LABELS.product_type, ...customLabels?.product_type },
    delivery_type: { ...DEFAULT_LABELS.delivery_type, ...customLabels?.delivery_type },
    activity_type: { ...DEFAULT_LABELS.activity_type, ...customLabels?.activity_type }
  }), [customLabels])

  const productTypeTag = useMemo(() => {
    if (productType === undefined) return null
    const colorMap: Record<number, { color: string; text: string | undefined }> = {
    [MALL_PRODUCT_TYPE_REAL]: {
      color: 'var(--primary)',
      text: labels.product_type?.real
    },
    [MALL_PRODUCT_TYPE_VIRTUAL]: {
      color: '#E4B700',
      text: labels.product_type?.virtual
    },
    [MALL_PRODUCT_TYPE_SERVICE]: {
      color: '#03BE02',
      text: labels.product_type?.service
    },
  }
    const item = colorMap[productType]
    if (!item) return null
    return (
      <View className={styles['product-tag-container']}>
        <Tag
          type='light-warning'
          text={item.text}
          className={styles['product-tag']}
          style={{ backgroundColor: item.color, color: '#fff' }}
        />
      </View>
    )
  }, [productType, labels])

  const deliveryTags = useMemo(() => {
    if (isEmpty(deliveryTypes)) return null
    return deliveryTypes.map(type => {
      let tagProps: any = null
      if (type === MALL_PRODUCT_DELIVERY_TYPE_DINE) {
        tagProps = {
          text: labels.delivery_type?.dine,
          color: '#2db7f5',
          bg: 'rgba(145, 213, 255, 0.16)'
        }
      }
      else if (type === MALL_PRODUCT_DELIVERY_TYPE_SELF) {
        tagProps = {
          text: labels.delivery_type?.self_pickup,
          color: '#FF3D15',
          bg: 'rgba(255,61,21,0.16)'
        }
      }
      else if (type === MALL_PRODUCT_DELIVERY_TYPE_EXPRESS || type === MALL_PRODUCT_DELIVERY_TYPE_SHOP) {
        tagProps = {
          text: labels.delivery_type?.delivery,
          color: '#FF8901',
          bg: 'rgba(255,137,1,0.16)'
        }
      }
      if (!tagProps) return null
      return (
        <Tag
          key={type}
          text={tagProps.text}
          style={{ color: tagProps.color, backgroundColor: tagProps.bg, borderColor: tagProps.color }}
          className={styles['delivery-tag']}
        />
      )
    })
  }, [deliveryTypes, labels])

    const stockAndSaleElem = useMemo(() => {
    if (!stockCount && !saleCount) return null
    return (
      <View className={styles['stock-and-sale']}>
        {stockCount && (
          <View className={styles['stock-box']}>
            <Text className={styles['info-text']}>{labels.stock_label}</Text>
            <Text className={styles['stock-text']}>{stockCount}</Text>
          </View>
        )}
        {saleCount && (
          <Text className={styles['info-text']}>
            {labels.sale_label} {saleCount}
          </Text>
        )}
      </View>
    )
  }, [stockCount, saleCount, labels])

  return (
    <View className={formatClassNames(styles['item-container'], className)} onClick={handleCardClick}>
      <View className={styles['card-main-body']}>
        {showCheckbox && (
          <View className={styles['checkbox-container']}>
            <Checkbox
              checked={checkboxChecked}
              disabled={checkboxDisabled}
              readOnly
            />
          </View>
        )}
        <View className={styles['image-container']}>
          <Image
            src={image?.url}
            className={styles['product-image']}
            mode='aspectFill'
          />
          {(showSoldOut || showOffline) && (
            <View className={styles['status-overlay']}>
              <Text className={styles['status-text']}>
                {showSoldOut ? labels.sold_out : labels.offline}
              </Text>
            </View>
          )}
        </View>
        <View className={styles['content-container']}>
          <View className={styles['content-body']}>
            <View className={styles['title-row']} style={{ marginRight: showDelete ? '30PX' : '0' }}>
              {productTypeTag}
              <Text className={styles['title']} style={{ WebkitLineClamp: titleMaxLines }}>{title}</Text>
            </View>
            {(showMultipleSpec || stockCount || saleCount || barcode) && (
              <ScrollView scrollX className={styles['second-row']} showScrollbar={false}>
                <View className={styles['second-row-inner']}>
                  {showMultipleSpec && <Text className={styles['primary-text']}>{labels.multiple_spec}</Text>}
                  {showMultipleSpec && stockAndSaleElem && <View className={styles['info-line']} />}
                  {stockAndSaleElem}
                  {((showMultipleSpec || stockAndSaleElem) && barcode) && <View className={styles['info-line']} />}
                  {barcode && <Text className={styles['info-text']}>{labels.barcode_label} {barcode}</Text>}
                </View>
              </ScrollView>
            )}
            {(activityType || deliveryTags) && (
              <View className={styles['tag-row']}>
                {activityType && labels.activity_type && (
                  <View className={styles['activity-tag']}>
                    {activityType === PROMOTION_ACTIVITY_TYPE_PRESENT && <View className={styles['activity-tag-badge']}><Text className={styles['activity-tag-badge-text']}>{labels.present_badge}</Text></View>}
                    <View className={styles['activity-tag-content']}>
                      <Text className={styles['activity-tag-text']}>
                        {activityType === PROMOTION_ACTIVITY_TYPE_FLASH && labels.activity_type.flash}
                        {activityType === PROMOTION_ACTIVITY_TYPE_BRAND && labels.activity_type.brand}
                        {activityType === PROMOTION_ACTIVITY_TYPE_HOT && labels.activity_type.hot}
                        {activityType === PROMOTION_ACTIVITY_TYPE_PRESENT && labels.activity_type.present}
                      </Text>
                    </View>
                  </View>
                )}
                {deliveryTags}
              </View>
            )}
            {
              spec
              ? (
                <Text
                  className={styles['spec-text']}
                  style={{ WebkitLineClamp: specMaxLines }}
                >
                  {labels.spec_label}：{spec}
                </Text>
              )
              : undefined
            }
            {
              customization
              ? (
                <Text
                  className={styles['customization-text']}
                  style={{ WebkitLineClamp: customizationMaxLines }}
                >
                  {customization}
                </Text>
              )
              : undefined
            }
          </View>
          <View className={styles['content-bottom']}>
            <View className={styles['price-container']}>
              <View className={styles['price-row']}>
                <Text className={styles['price-symbol']}>
                  ¥
                </Text>
                <Text className={styles['price-value']}>
                  {salePrice}
                </Text>
              </View>
              {
                originalPrice
                ? (
                  <Text className={styles['original-price']}>
                    ¥{originalPrice}
                  </Text>
                )
                : undefined
              }
            </View>
            <View
              className={styles['action-area']}
            >
              {
                buyCount
                ? (
                  <Text className={styles['buy-count-value']}>
                    x{buyCount}
                  </Text>
                )
                : action
              }
            </View>
          </View>
        </View>
      </View>
      {
        children
        ? (
          <View
            className={styles['card-footer']}
            onClick={e => e.stopPropagation()}
          >
            {children}
          </View>
        )
        : undefined
      }
      {
        showDelete
        ? (
          <View
            className={styles['delete-container']}
            onClick={(e: ITouchEvent) => {
              e.stopPropagation()
              onDelete?.()
            }}
          >
            <Icon
              name='trash'
              size={13}
              className={styles['delete-icon']}
            />
          </View>
        )
        : undefined
      }
    </View>
  )
}

export default React.memo(ProductCard)