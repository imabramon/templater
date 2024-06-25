import { mockTableData, mockTemplateData } from '@common/mock'
import { OpenFile, ReadExcel, ReadWord } from '@common/types'

export const openFileDialog: OpenFile = async () => {
  return 'test'
}

export const readExcel: ReadExcel = async () => {
  return mockTableData
}

export const readWord: ReadWord = async () => {
  return mockTemplateData
}
