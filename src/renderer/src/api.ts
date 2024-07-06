import { MakeFilesByTemplate, OpenFile, ReadExcel, ReadWord, SelectFolder } from '@common/types'

export const readExcel: ReadExcel = async (path) => {
  return window.api.readExcel(path)
}

export const readWord: ReadWord = async (path) => {
  return window.api.readWord(path)
}

export const openFile: OpenFile = async (extensions) => {
  return window.api.openFile(extensions)
}

export const selectFolder: SelectFolder = async () => {
  return window.api.selectFolder()
}
export const makeFilesByTemplate: MakeFilesByTemplate = async (...args) => {
  return window.api.makeFilesByTemplate(...args)
}
