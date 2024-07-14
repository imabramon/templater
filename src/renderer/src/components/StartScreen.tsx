import { FC } from 'react'
import { readExcel, readWord } from '@renderer/api'
import { useTemplateData, useTableData, useTablePath, useTemplatePath } from '@renderer/state'
import { useNavigate } from 'react-router'
import { FileSelect } from './FileSelect'
import DocIcon from '../assets/doc_file_icon.svg'
import XlsIcon from '../assets/xls_file_icon.svg'
import styled from 'styled-components'

const Button = styled.button`
  box-sizing: border-box;
  width: 100%;
  height: 50px;
  border-radius: 16px;
  display: flex;
  border: none;
  justify-content: center;
  align-items: center;
  padding: 8px;
  gap: 8px;

  background-color: green;
  color: white;

  &:disabled {
    background-color: grey;
    color: black;
  }
`

const Page = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`

const Container = styled.div`
  margin: auto;
  width: 250px;
  height: fit-content;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  gap: 8px;
`

export const StartScreen: FC = () => {
  const [, setTemplateData] = useTemplateData()
  const [templatePath, setTemplatePath] = useTemplatePath()

  const [, setTableData] = useTableData()
  const [dataPath, setDataPath] = useTablePath()

  const navigate = useNavigate()

  // useEffect(() => {
  //   if (templatePath && dataPath) {
  //     console.log('Переход', dataPath, templatePath)
  //     navigate('/processing')
  //   }s
  // }, [templatePath, dataPath])

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
    <Page>
      <Container>
        <FileSelect
          title="Выберете шаблон"
          selectFileHandler={handleWord}
          extensions={['docx', 'doc']}
          path={templatePath}
          icon={DocIcon}
        />
        <FileSelect
          title="Выберете данные"
          selectFileHandler={handleExcel}
          extensions={['xlsx', 'xls']}
          path={dataPath}
          icon={XlsIcon}
        />
        <Button
          disabled={templatePath === undefined || dataPath === undefined}
          onClick={() => navigate('/processing')}
        >
          Template it!
        </Button>
      </Container>
    </Page>
  )
}
