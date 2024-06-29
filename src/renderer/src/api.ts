import { OpenFile, ReadExcel, ReadWord } from '@common/types'

export const readExcel: ReadExcel = async (path) => {
  return window.api.readExcel(path)
}

export const readWord: ReadWord = async (path) => {
  return window.api.readWord(path)
}

export const openFile: OpenFile = async (extensions) => {
  return window.api.openFile(extensions)
}
