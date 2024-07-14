import { selectFolder, makeFilesByTemplate } from '@renderer/api'
import { useTableData, useTemplatePath } from '@renderer/state/hooks'
import { FC, useState } from 'react'
import { Table } from './Table'
import styled from 'styled-components'

const Button = styled.button`
  box-sizing: border-box;
  width: fit-content;
  height: fit-content;
  border-radius: 16px;
  display: flex;
  border: none;
  justify-content: center;
  align-items: center;
  padding: 16px;
  gap: 8px;
  margin-bottom: 16px;

  background-color: dodgerblue;
  color: white;

  &:disabled {
    background-color: grey;
    color: black;
  }
`

const Container = styled.div`
  padding-left: 16px;
  padding-top: 16px;
`

const SecondScreen: FC = () => {
  const [namesMap, setNamesMap] = useState({})

  const [templatePath] = useTemplatePath()
  const [tableData] = useTableData()

  const createFiles = async (): Promise<void> => {
    const distanation = await selectFolder()
    const result = await makeFilesByTemplate(templatePath, tableData, namesMap, distanation)
    console.log(result)
  }

  return (
    <Container>
      <Button type="button" onClick={createFiles}>
        Создать файлы
      </Button>
      <Table onMapChange={setNamesMap} />
    </Container>
  )
}

export default SecondScreen
