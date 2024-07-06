import { Provider } from 'react-redux'
import { store } from './state'
import { RouterProvider } from 'react-router-dom'
import { router } from './routing'

function App(): JSX.Element {
  return (
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  )
}

export default App
