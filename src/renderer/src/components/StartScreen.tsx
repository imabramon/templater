import { FC, useEffect, useState } from 'react'
import { openFileDialog } from '@renderer/api'

interface IFileSelect {
  selectFileHandler?: (string) => void
  title: string
}

const FileSelect: FC<IFileSelect> = ({ selectFileHandler: selectFile = (): void => {}, title }) => {
  return (
    <div
      onClick={async () => {
        const filename: string = await openFileDialog()
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

  useEffect(() => {
    if (templatePath && dataPath) {
      console.log('Переход', dataPath, templatePath)
    }
  }, [templatePath, dataPath])

  return (
    <div>
      <FileSelect title="Выберете шаблон" selectFileHandler={setTemplatePath} />
      <FileSelect title="Выберете данные" selectFileHandler={setDataPath} />
    </div>
  )
}
