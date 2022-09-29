import { Outlet } from 'react-router-dom'
import { BackTop } from 'antd'
import MainLayout from './Components/MainLayout/MainLayout'
import './App.scss'

const App = () => {
  return (
    <div className='App'>
      <MainLayout>
        <Outlet />
        <BackTop />
      </MainLayout>
    </div>
  )
}

export default App
