import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from './store'
import { mockTableData } from '@common/mock'
import { TableData } from '@common/types'

interface ITemplateDataState {
  path: string | undefined
  value: TableData
}

const initialState: ITemplateDataState = {
  path: undefined,
  value: mockTableData
}

export const excelSlice = createSlice({
  name: 'excel',
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    setData: (state, action: PayloadAction<TableData>) => {
      state.value = action.payload
    },
    setPath: (state, action: PayloadAction<string>) => {
      state.path = action.payload
    }
  }
})

export const { setData, setPath } = excelSlice.actions

// Other code such as selectors can use the imported `RootState` type
export const selectTableData = (state: RootState): TableData => state.excel.value
export const selectTablePath = (state: RootState): string => state.excel.path

export default excelSlice.reducer
