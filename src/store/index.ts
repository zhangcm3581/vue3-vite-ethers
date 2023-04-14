import useReloadStore from './realod'
import useAccountStore from "./account";
export default function useStore() {
  return {
    reloadStore:useReloadStore(),
    accountStore:useAccountStore()
  }
}