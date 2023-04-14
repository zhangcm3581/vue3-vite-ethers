import { createI18n } from 'vue-i18n'
// locale/index.ts
// 导入全局中英文配置对象
// import EN from './EN.json'
// import ZH from './ZH.json'
export function loadLang() {
  const modules = import.meta.globEager('./*.json')
  // const modules: Record<string, any> = import.meta.glob('./*.json', { eager: true });
  const langs: Record<string, any> = {};
  for (const path in modules) {
    const name = path.replace(/(\.\/|\.json)/g, '');
    langs[name] = modules[path];
  }
  return langs;
}

// 默认读取本地存储语言设置
const defaultLocale = localStorage.getItem('locale') || 'EN'

const i18n = createI18n({
  locale: defaultLocale,// 默认语言
  fallbackLocale: 'EN',// 不存在默认则为英文
  allowComposition: true,// 允许组合式api
  legacy: false, // 解决 Not available in legacy mode
  messages: loadLang()
  // messages: {
  //   'EN': EN, // 标识:配置对象
  //   'ZH': ZH
  // },
})
export default i18n