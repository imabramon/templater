import { openFile } from '@renderer/api'
import { FC } from 'react'
import styled from 'styled-components'
import SuccessIcon from '../assets/succes_icon.svg'

const getFileNameByPath = (path: string | undefined): string | undefined => {
  if (!path) {
    // очень не очень
    return undefined
  }

  const regex = /(\w*\.\w*)/gm
  const mathes = path.match(regex)

  if (!mathes) {
    // очень не очень
    return undefined
  }

  return mathes[0]
}

type DataAttributte = `data-${string}`
type DataAttributesProps = {
  [key: DataAttributte]: string | number | boolean
}

const isPathSelectedDataAttributte: DataAttributte = 'data-path-selected'

const Container = styled.div`
  box-sizing: border-box;
  width: 100%;
  height: 50px;
  border-width: 1px;
  border-radius: 16px;
  border-color: black;
  border-style: solid;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 8px;
  gap: 8px;
`

const Title = styled.span`
  font-size: inherit;

  &[${isPathSelectedDataAttributte}='true'] {
    color: green;

    &::before {
      display: inline-block;
      content: ' ';
      height: 1em;
      width: 1em;
      background-image: url(${SuccessIcon});
      background-repeat: no-repeat;
      background-size: cover;
      margin-right: 4px;
      transform: translateY(0.2em);
    }
  }
`

const Icon = styled.img`
  height: 30px;
`

interface IFileSelect {
  selectFileHandler?: (string) => void
  title: string
  extensions?: string[]
  path?: string
  icon: string
}

export const FileSelect: FC<IFileSelect> = ({
  selectFileHandler: selectFile = (): void => {},
  title,
  extensions,
  path,
  icon
}) => {
  const text = getFileNameByPath(path) ?? title

  const isPathSelected = path !== undefined

  const titleDataProps: DataAttributesProps = {
    [isPathSelectedDataAttributte]: isPathSelected
  }

  return (
    <Container
      onClick={async () => {
        const filename: string = await openFile(extensions)
        selectFile(filename)
      }}
    >
      <Title {...titleDataProps}>{text}</Title>
      <Icon src={icon} />
    </Container>
  )
}
