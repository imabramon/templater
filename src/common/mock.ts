import { TableData, TemplateData } from './types'

export const mockTemplateData: TemplateData = {
  header: ['number', 'inn', 'fullname']
}

export const mockTableData: TableData = {
  header: ['Номер договора', 'ИНН', 'ФИО'],
  rows: [
    ['1', 'ИНН 1', 'Пупкин Вася'],
    ['2', 'ИНН 2', 'Иванов Вася'],
    ['3', 'ИНН 3', 'Васькин Вася']
  ]
}
