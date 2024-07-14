import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from './store'
import { mockTemplateData } from '@common/mock'
import { TemplateData } from '@common/types'

interface ITemplateDataState {
  path: string | undefined
  value: TemplateData
}

const initialState: ITemplateDataState = {
  path: undefined,
  value: mockTemplateData
}

export const wordSlice = createSlice({
  name: 'word',
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    setData: (state, action: PayloadAction<TemplateData>) => {
      state.value = action.payload
    },
    setPath: (state, action: PayloadAction<string>) => {
      state.path = action.payload
    }
  }
})

export const { setData, setPath } = wordSlice.actions

// Other code such as selectors can use the imported `RootState` type
export const selectTemplateData = (state: RootState): TemplateData => state.word.value
export const selectTemplatePath = (state: RootState): string => state.word.path

export default wordSlice.reducer
