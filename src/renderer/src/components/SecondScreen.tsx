import { mockTableData, mockTemplateData } from '@common/mock'
import { TableData } from '@common/types'
import { useTemplateData } from '@renderer/state'
import { FC, useMemo, useReducer } from 'react'
interface IRow {
  data: string[]
}

const Row: FC<IRow> = ({ data }) => {
  return (
    <tr>
      {data.map((value, index) => (
        <td key={index}>{value}</td>
      ))}
    </tr>
  )
}

interface ITableHeader {
  header: string[]
  templateNames: string[]
}

const TableHeader: FC<ITableHeader> = ({ header, templateNames }) => {
  const initHeaderObject: { [name: string]: string } = useMemo(() => {
    return header.reduce((init, elem, index) => {
      init[elem] = templateNames[index]
      return init
    }, {})
  }, [header])

  const initTemplateObject = useMemo(() => {
    return Object.entries(initHeaderObject).reduce((init, [header, template]) => {
      init[template] = header
      return init
    }, {})
  }, [templateNames])

  //   console.log(initHeaderObject, initTemplateObject)

  const [{ headerTemplateMap }, dispath] = useReducer(
    (state, action) => {
      switch (action.type) {
        case 'switch': {
          const { header, templateName } = action.payload
          const { headerTemplateMap, templateHeaderMap } = state
          const prevTemplate = headerTemplateMap[header]
          const prevHeader = templateHeaderMap[templateName]

          headerTemplateMap[header] = templateName
          headerTemplateMap[prevHeader] = prevTemplate

          templateHeaderMap[prevTemplate] = prevHeader
          templateHeaderMap[templateName] = header

          return { headerTemplateMap, templateHeaderMap }
        }
        default: {
          return state
        }
      }
    },
    { headerTemplateMap: initHeaderObject, templateHeaderMap: initTemplateObject }
  )

  return (
    <>
      <tr>
        {header.map((columnName, index) => {
          return (
            <td key={index}>
              <select
                value={headerTemplateMap[columnName]}
                onChange={(e) => {
                  const {
                    target: { value }
                  } = e
                  dispath({
                    type: 'switch',
                    payload: {
                      header: columnName,
                      templateName: value
                    }
                  })
                }}
              >
                {templateNames.map((name, index) => (
                  <option key={index}>{name}</option>
                ))}
              </select>
            </td>
          )
        })}
      </tr>
      <tr>
        {header.map((name, index) => (
          <td key={index}>{name}</td>
        ))}
      </tr>
    </>
  )
}

interface ITable {
  data?: TableData
  templateNames?: string[]
}

const Table: FC<ITable> = ({ data = mockTableData }) => {
  const [{ header: templateNames }] = useTemplateData()
  const { rows, header } = data
  const rowElements = rows.map((rowData, index) => <Row key={index} data={rowData} />)

  return (
    <table>
      <TableHeader header={header} templateNames={templateNames} />
      {rowElements}
    </table>
  )
}

const SecondScreen: FC = () => {
  return <Table />
}

export default SecondScreen
