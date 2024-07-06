import { FC, useEffect } from 'react'
import { openFile, readExcel, readWord } from '@renderer/api'
import { useTemplateData, useTableData, useTablePath, useTemplatePath } from '@renderer/state'
import { useNavigate } from 'react-router'

interface IFileSelect {
  selectFileHandler?: (string) => void
  title: string
  extensions?: string[]
}

const FileSelect: FC<IFileSelect> = ({
  selectFileHandler: selectFile = (): void => {},
  title,
  extensions
}) => {
  return (
    <div
      onClick={async () => {
        const filename: string = await openFile(extensions)
        selectFile(filename)
      }}
    >
      {title}
    </div>
  )
}

export const StartScreen: FC = () => {
  const [, setTemplateData] = useTemplateData()
  const [templatePath, setTemplatePath] = useTemplatePath()

  const [, setTableData] = useTableData()
  const [dataPath, setDataPath] = useTablePath()

  const navigate = useNavigate()

  useEffect(() => {
    if (templatePath && dataPath) {
      console.log('Переход', dataPath, templatePath)
      navigate('/processing')
    }
  }, [templatePath, dataPath])

  const handleExcel: (path: string) => void = async (path) => {
    const tableData = await readExcel(path)
    setDataPath(path)
    setTableData(tableData)
  }

  const handleWord: (path: string) => void = async (path) => {
    const templateData = await readWord(path)
    setTemplatePath(path)
    setTemplateData(templateData)
  }

  return (
    <div>
      <FileSelect
        title="Выберете шаблон"
        selectFileHandler={handleWord}
        extensions={['docx', 'doc']}
      />
      <FileSelect
        title="Выберете данные"
        selectFileHandler={handleExcel}
        extensions={['xlsx', 'xls']}
      />
    </div>
  )
}
