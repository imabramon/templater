import { useDispatch, useSelector } from 'react-redux'
import type { RootState, AppDispatch } from './store'
import { selectTemplateData, set } from './word'
import { TemplateData } from '@common/types'

// Use throughout your app instead of plain `useDispatch` and `useSelector`
export const useAppDispatch = useDispatch.withTypes<AppDispatch>()
export const useAppSelector = useSelector.withTypes<RootState>()

export const useTemplateData = (): [TemplateData, typeof changeState] => {
  const templateData = useAppSelector(selectTemplateData)
  const dispatch = useAppDispatch()
  const changeState: (any) => void = (...args) => dispatch(set(...args))
  return [templateData, changeState]
}
