import { useDispatch, useSelector } from 'react-redux'
import type { RootState, AppDispatch } from './store'
import * as word from './word'
import * as excel from './excel'
import { TableData, TemplateData } from '@common/types'

// Use throughout your app instead of plain `useDispatch` and `useSelector`
export const useAppDispatch = useDispatch.withTypes<AppDispatch>()
export const useAppSelector = useSelector.withTypes<RootState>()

export const useTemplateData = (): [TemplateData, typeof changeState] => {
  const { selectTemplateData, setData } = word
  const templateData = useAppSelector(selectTemplateData)
  const dispatch = useAppDispatch()
  const changeState: (any) => void = (...args) => dispatch(setData(...args))
  return [templateData, changeState]
}

export const useTemplatePath = (): [string, typeof changeState] => {
  const { selectTemplatePath, setPath } = word
  const templatePath = useAppSelector(selectTemplatePath)
  const dispatch = useAppDispatch()
  const changeState: (any) => void = (...args) => dispatch(setPath(...args))
  return [templatePath, changeState]
}

export const useTableData = (): [TableData, typeof changeState] => {
  const { setData, selectTableData } = excel
  const tableData = useAppSelector(selectTableData)
  const dispatch = useAppDispatch()
  const changeState: (any) => void = (...args) => dispatch(setData(...args))
  return [tableData, changeState]
}

export const useTablePath = (): [string, typeof changeState] => {
  const { selectTablePath, setPath } = excel
  const tablePath = useAppSelector(selectTablePath)
  const dispatch = useAppDispatch()
  const changeState: (any) => void = (...args) => dispatch(setPath(...args))
  return [tablePath, changeState]
}
