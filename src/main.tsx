import { ViteReactSSG } from 'vite-react-ssg'
import './index.css'
import App from './App.tsx'

export const createRoot = ViteReactSSG(
  { routes: [{ path: '/', element: <App /> }] }
)
