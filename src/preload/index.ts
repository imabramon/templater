import { contextBridge } from 'electron'
import { electronAPI } from '@electron-toolkit/preload'
import { ipcRenderer } from 'electron/renderer'
import { MakeFilesByTemplate, OpenFile, ReadExcel, ReadWord, SelectFolder } from '@common/types'

export interface IAPI {
  openFile: OpenFile
  readExcel: ReadExcel
  readWord: ReadWord
  selectFolder: SelectFolder
  makeFilesByTemplate: MakeFilesByTemplate
}

// Custom APIs for renderer
const api: IAPI = {
  openFile: (extensions) => ipcRenderer.invoke('open-file', extensions),
  readExcel: (path) => ipcRenderer.invoke('read-excel', path),
  readWord: (path) => ipcRenderer.invoke('read-word', path),
  selectFolder: () => ipcRenderer.invoke('select-folder'),
  makeFilesByTemplate: (...args: Parameters<MakeFilesByTemplate>) =>
    ipcRenderer.invoke('make-files-by-template', ...args)
}

// Use `contextBridge` APIs to expose Electron APIs to
// renderer only if context isolation is enabled, otherwise
// just add to the DOM global.
if (process.contextIsolated) {
  try {
    contextBridge.exposeInMainWorld('electron', electronAPI)
    contextBridge.exposeInMainWorld('api', api)
  } catch (error) {
    console.error(error)
  }
} else {
  // @ts-ignore (define in dts)
  window.electron = electronAPI
  // @ts-ignore (define in dts)
  window.api = api
}
