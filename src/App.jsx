import './index.css'
import routes from './routes/routes'
import { Outlet, RouterProvider } from 'react-router-dom'


export default function App(){
  return(
    <RouterProvider router={routes}>
      <Outlet/>
    </RouterProvider>
  )
}