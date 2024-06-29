import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from './store'
import { mockTemplateData } from '@common/mock'
import { TemplateData } from '@common/types'

interface ITemplateDataState {
  value: TemplateData
}

const initialState: ITemplateDataState = {
  value: mockTemplateData
}

export const wordSlice = createSlice({
  name: 'word',
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    set: (state, action: PayloadAction<TemplateData>) => {
      state.value = action.payload
    }
  }
})

export const { set } = wordSlice.actions

// Other code such as selectors can use the imported `RootState` type
export const selectTemplateData = (state: RootState): TemplateData => state.word.value

export default wordSlice.reducer
