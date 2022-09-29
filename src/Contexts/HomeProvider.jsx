import { createContext } from 'react'
import { decodeToken } from 'react-jwt'

export const HomeContext = createContext({})

export default function HomeProvider({ children }) {
  const loggedIn = (auth_token) => {
    const decoded = decodeToken(auth_token)
    const user = JSON.stringify(decoded)
    sessionStorage.setItem('user', user)
    return
  }

  return (
    <HomeContext.Provider value={{ loggedIn }}>{children}</HomeContext.Provider>
  )
}
