import { Provider } from 'react-redux'
import SecondScreen from './components/SecondScreen'
import { StartScreen } from './components/StartScreen'
import { store } from './state'

function App(): JSX.Element {
  return (
    <Provider store={store}>
      <StartScreen />
      <SecondScreen />
    </Provider>
  )
}

export default App
