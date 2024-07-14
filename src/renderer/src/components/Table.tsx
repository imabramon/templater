import { TableData } from '@common/types'
import { useTemplateData, useTableData } from '@renderer/state'
import { FC } from 'react'
import { TableRow } from './TableRow'
import { TableHeader } from './TableHeadder'
import styled from 'styled-components'

const TableAtom = styled.table`
  border-collapse: collapse;
  border-spacing: 0;
  --padddingHorizontal: 16px;
  --marginHorizontal: 8px;

  /* & td {
    padding-left: 8px;
    padding-right: 16px;
  } */
`

interface ITable {
  data?: TableData
  templateNames?: string[]
  onMapChange: (map: Record<string, string>) => void
}

export const Table: FC<ITable> = ({ onMapChange }) => {
  const [{ header: templateNames }] = useTemplateData()
  const [{ header, rows }] = useTableData()
  const rowElements = rows.map((rowData, index) => <TableRow key={index} data={rowData} />)

  return (
    <TableAtom>
      <TableHeader header={header} templateNames={templateNames} onChange={onMapChange} />
      {rowElements}
    </TableAtom>
  )
}
