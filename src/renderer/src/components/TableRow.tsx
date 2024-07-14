import { FC } from 'react'
import styled from 'styled-components'

interface ITableRow {
  data: string[]
}

const Cell = styled.td`
  --padddingHorizontalValue: var(--padddingHorizontal, 8px);
  --marginHorizontalValue: var(--marginHorizontal, 8px);
  --cellPaddingLeft: calc(var(--padddingHorizontalValue) + var(--marginHorizontalValue));
  border: 1px gray solid;
  padding: 8px;
  padding-left: var(--cellPaddingLeft);
  padding-right: 16px;
`

export const TableRow: FC<ITableRow> = ({ data }) => {
  return (
    <tr>
      {data.map((value, index) => (
        <Cell key={index}>{value}</Cell>
      ))}
    </tr>
  )
}
