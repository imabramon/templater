import SecondScreen from '@renderer/components/SecondScreen'
import { StartScreen } from '@renderer/components/StartScreen'
import { createBrowserRouter } from 'react-router-dom'

export const router = createBrowserRouter([
  {
    path: '/',
    element: <StartScreen />
  },
  {
    path: '/processing',
    element: <SecondScreen />
  }
])
