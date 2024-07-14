import { objectDependensies } from '@renderer/utils'
import { FC, useMemo, useReducer, useEffect } from 'react'
import styled from 'styled-components'

const Cell = styled.td``

const CellContainer = styled.div`
  --padddingHorizontalValue: var(--padddingHorizontal, 8px);
  --marginHorizonltalValue: var(--marginHorizontal, 8px);
  display: flex;
  flex-direction: column;
  width: max(fit-content, 100%);
  height: fit-content;
  box-sizing: border-box;
  gap: 8px;
  border: 1px solid black;
  padding: 8px;
  margin: 4px;
  padding: var(--padddingHorizontalValue);
  margin: var(--marginHorizonltalValue);
  border-radius: var(--padddingHorizontalValue);
  margin-bottom: 24px;
`

const Row = styled.tr`
  margin-bottom: 16px;
`

interface ITableHeader {
  header: string[]
  templateNames: string[]
  onChange: (map: Record<string, string>) => void
}

export const TableHeader: FC<ITableHeader> = ({ header, templateNames, onChange: change }) => {
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

  const [{ headerTemplateMap, templateHeaderMap }, dispath] = useReducer(
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

  useEffect(() => {
    change(templateHeaderMap)
  }, [change, ...objectDependensies(templateHeaderMap)])

  return (
    <>
      <Row>
        {header.map((columnName, index) => {
          return (
            <Cell key={index}>
              <CellContainer>
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
                {columnName}
              </CellContainer>
            </Cell>
          )
        })}
      </Row>
      {/* <tr>
        {header.map((name, index) => (
          <Cell key={index}>{name}</Cell>
        ))}
      </tr> */}
    </>
  )
}
