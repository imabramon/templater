import { mockTableData, mockTemplateData } from '@common/mock'
import { OpenFile, ReadExcel, ReadWord } from '@common/types'

export const openFileDialog: OpenFile = async () => {
  return 'test'
}

export const readExcel: ReadExcel = async (path) => {
  const XLSX = require('xlsx')
  const wb = XLSX.readFile(path)
  const sheetName = wb.SheetNames[0]
  const sheet = wb.Sheets[sheetName]
  const raw_data = XLSX.utils.sheet_to_json(sheet, { header: 1 })
  const [header, ...rows] = raw_data
  return { header, rows }
}

const templateNameRegexp = /\{(\s)*(\w)*(\s)*\}/gm

export const readWord: ReadWord = async (path) => {
  const WordExtractor = require('word-extractor')
  const extractor = new WordExtractor()
  const extracted = await extractor.extract(path)
  const body: string = extracted.getBody()
  const header = [...body.matchAll(templateNameRegexp)].map(([[firstSymbol, ...match]]) => {
    match.pop()
    return match.join('').trim()
  })
  return { header }
}
