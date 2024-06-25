export const openFileDialog: () => Promise<string> = async () => {
  return 'test'
}

export type TemplateData = {
  header: string[]
}

export type ExcelData = {
  rows: string[][]
}

export type TableData = TemplateData & ExcelData
