'use strict'

import { MakeFilesByTemplate, OpenFile, ReadExcel, ReadWord, SelectFolder } from '@common/types'
import Docxtemplater, { DXT } from 'docxtemplater'
import { dialog } from 'electron'
import { readFileSync, writeFileSync } from 'fs'
import path from 'path'
import PizZip from 'pizzip'

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
  return { header: header.map((x) => `${x}`), rows }
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
  const options = {
    // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
    parser: (tag) => {
      const trimmed = tag.trim()
      return {
        // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
        get: (scope) => {
          if (trimmed === '.') {
            return scope
          } else {
            return scope[trimmed]
          }
        }
      }
    },
    paragraphLoop: true,
    linebreaks: true
  }

  const mapper = makeMapper(tableData.header, namesMap)
  const makeFile = makeFileMaker(templatePath, options, mapper, distanation)

  tableData.rows.forEach((row, index) => makeFile(row, `output_${index}.docx`))

  return true
}

const makeFileMaker =
  (
    templatePath,
    options: DXT.Options,
    mapper: (data: string[]) => Record<string, string>,
    distanation: string
  ) =>
  (data: string[], output: string): void => {
    /**
     * Создать док
     * Создать объект [templateNames]: data[map[templateNames]]
     * Срендерить ддок с этим объектов,
     * Сохранить
     */
    const content = readFileSync(path.resolve(templatePath), 'binary')
    const zip = new PizZip(content)
    const doc = new Docxtemplater(zip, options)
    const templateNamesToDataMap = mapper(data)

    console.log(output)
    console.log(templateNamesToDataMap)

    doc.render(templateNamesToDataMap)

    const buf = doc.getZip().generate({
      type: 'nodebuffer',
      compression: 'DEFLATE'
    })

    writeFileSync(path.resolve(distanation, output), buf)
  }

const makeMapper = (
  header: string[],
  namesMap: Record<string, string>
): ((data: string[]) => Record<string, string>) => {
  const map = {}

  const templateNames = Object.keys(namesMap)

  templateNames.forEach((element) => {
    map[element] = header.indexOf(namesMap[element])
  })

  return (data: string[]): Record<string, string> => {
    const obj = {}
    templateNames.forEach((element) => {
      obj[element] = data[map[element]]
    })

    return obj
  }
}
