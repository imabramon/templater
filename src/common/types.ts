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

export type OpenFile = (extensions?: string[]) => Promise<string>
export type ReadExcel = (path: string) => Promise<TableData>
export type ReadWord = (path: string) => Promise<TemplateData>
export type SelectFolder = () => Promise<string>
export type MakeFilesByTemplate = (
  templatePath: string,
  tableData: TableData,
  namesMap: Record<string, string>,
  distanation: string
) => Promise<boolean>
