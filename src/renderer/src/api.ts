import { TableData, TemplateData } from '@common/types'

export const mockTableData: TableData = {
  header: ['Номер договора', 'ИНН', 'ФИО'],
  rows: [
    ['1', 'ИНН 1', 'Пупкин Вася'],
    ['2', 'ИНН 2', 'Иванов Вася'],
    ['3', 'ИНН 3', 'Васькин Вася']
  ]
}

export const readExcel: (path: string) => TableData = () => {
  return mockTableData
}

export const mockTemplateData: TemplateData = {
  header: ['number', 'inn', 'fullname']
}

export const readWord: (path: string) => TemplateData = () => {
  return mockTemplateData
}
