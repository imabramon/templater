import { mockTableData, mockTemplateData } from '@common/mock'
import {
  MakeFilesByTemplate,
  OpenFile,
  ReadExcel,
  ReadWord,
  SelectFolder,
  TableData
} from '@common/types'
import { dialog } from 'electron'

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

export const selectFolder: SelectFolder = async () => {
  console.log('select folder')
  const data = await dialog.showOpenDialog({
    title: 'Open Dialogue',
    message: 'First Dialog',
    //pass 'openDirectory' to strictly open directories
    properties: ['openDirectory']
  })

  return data.filePaths[0]
}
export const makeFilesByTemplate: MakeFilesByTemplate = async (
  templatePath,
  tableData,
  namesMap,
  distanation
) => {
  console.log('call')
  console.log(templatePath, tableData, namesMap, distanation)
  return true
}

const makeMapper =
  (map: Record<string, string>, header: TableData['header']) =>
  (input: string): number =>
    header.indexOf(map[input])

const makeFile = async (
  templateNames: string[],
  data: string[],
  mapper: (string) => number
): Promise<boolean> => {
  console.log('names', templateNames)
  console.log('data', data)
  return true
}
