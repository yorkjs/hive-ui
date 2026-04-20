import Taro from "@tarojs/taro"

// 支付宝小程序
export const isAlipayApp = Taro.getEnv() === Taro.ENV_TYPE.ALIPAY
// 微信小程序
export const isWeApp = Taro.getEnv() === Taro.ENV_TYPE.WEAPP
// web
export const isWeb = Taro.getEnv() === Taro.ENV_TYPE.WEB

const userAgent = navigator && navigator.userAgent
export const isIos = /iphone|ipad/i.test(userAgent)
export const isAndroid = /android/i.test(userAgent)

const promoterAppMatch = userAgent.match(/promoter_app\/([\d.]+)/i)

export const isPromoterApp = promoterAppMatch && (isIos || isAndroid)
export const isApp = isPromoterApp