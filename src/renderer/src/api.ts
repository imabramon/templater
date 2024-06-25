import { mockTemplateData, mockTableData } from '@common/mock'
import { OpenFile, ReadExcel, ReadWord, TableData, TemplateData } from '@common/types'

export const readExcel: ReadExcel = async (path) => {
  return window.api.readExcel(path)
}

export const readWord: ReadWord = async (path) => {
  return window.api.readWord(path)
}

export const openFile: OpenFile = async () => {
  return window.api.openFile()
}
