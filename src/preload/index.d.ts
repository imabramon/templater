import { ElectronAPI } from '@electron-toolkit/preload'
import { IAPI } from './index'

declare global {
  interface Window {
    electron: ElectronAPI
    api: IAPI
  }
}
