import { FC, useEffect, useState } from 'react'
import { openFile, readExcel, readWord } from '@renderer/api'
import { useTemplateData } from '@renderer/state'

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

interface IStartScreen {}

type Optional<T> = T | undefined

export const StartScreen: FC<IStartScreen> = () => {
  const [templatePath, setTemplatePath] = useState<Optional<string>>(undefined)
  const [dataPath, setDataPath] = useState<Optional<string>>(undefined)
  const [_, setTamplateData] = useTemplateData()

  useEffect(() => {
    if (templatePath && dataPath) {
      console.log('Переход', dataPath, templatePath)
    }
  }, [templatePath, dataPath])

  const handleExcel: (path: string) => void = async (path) => {
    const tableData = await readExcel(path)
    setDataPath(path)
    console.log(tableData)
  }

  const handleWord: (path: string) => void = async (path) => {
    const templateData = await readWord(path)
    setTemplatePath(path)
    console.log(templateData)
    setTamplateData(templateData)
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
