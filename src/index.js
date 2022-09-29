import { RouterProvider } from "react-router-dom"
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { CookiesProvider } from 'react-cookie'
import { router } from './Routes/MainRoutes'
import HomeProvider from './Contexts/HomeProvider'
import './index.css'
import reportWebVitals from './reportWebVitals'

const root = createRoot(document.getElementById('root'))
root.render(
  <StrictMode>
    <HomeProvider>
      <CookiesProvider>
        <RouterProvider
          router={router}
          fallbackElement={'loading...'}
        />
      </CookiesProvider>
    </HomeProvider>
  </StrictMode>
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
