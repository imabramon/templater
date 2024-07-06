import { Store, configureStore } from '@reduxjs/toolkit'
import wordReducer from './word'
import excelReducer from './excel'
// ...

export const store: Store = configureStore({
  reducer: {
    word: wordReducer,
    excel: excelReducer
  }
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch
