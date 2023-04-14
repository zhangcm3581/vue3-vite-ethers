# TS

# i18n
* 模版中
```js
<temlate>
 {{ $t('account.account') }}
  <div v-t="'account.account'"></div>
</temlate> 
```
* TypeScript
```js
import { useI18n } from 'vue-i18n';
const { t } = useI18n()
const account = $t('account.account') 
 ```
