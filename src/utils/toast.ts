import { Toast } from "vant"
import i18n from "@/i18n"
export const toastMsg = (error) => {
  const { t } = i18n.global
  error = JSON.parse(JSON.stringify(error)).reason || error as string || 'error'
  // 截取最后一个: 后面的字符串
	let indexsss = error.lastIndexOf(":")
	var resolvesss = error.substring(indexsss + 1, error.length)
  resolvesss = resolvesss.replace(' ', '').replace(/(.*)\./, '$1')
  error = t(`errorMsg.${resolvesss}`).indexOf('errorMsg.') != -1 ? resolvesss : t(`errorMsg.${resolvesss}`)
  Toast(error)
}