import { createContext, useState } from 'react'
import { message } from 'antd'
import { decodeToken } from 'react-jwt'
import axios from 'axios'

export const HomeContext = createContext({})

export default function HomeProvider({ children }) {
  const [isServerReady, setIsServerReady] = useState(false)

  const loggedIn = (auth_token) => {
    const decoded = decodeToken(auth_token)
    const user = JSON.stringify(decoded)
    sessionStorage.setItem('user', user)
    return
  }

  const checkServer = async () => {
    let response
    try {
      response = await axios({
        method: 'get',
        url: `${process.env.REACT_APP_BE}/`,
      })
      setIsServerReady(true)
      message.success(response.data)
      return true
    } catch (err) {
      message.error(`${err.response.data}`)
      return false
    }
  }

  return (
    <HomeContext.Provider value={{ loggedIn, checkServer, isServerReady }}>
      {children}
    </HomeContext.Provider>
  )
}
