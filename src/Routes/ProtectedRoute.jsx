import { useCookies } from 'react-cookie'
import { Navigate } from 'react-router-dom'

const ProtectedRoute = ({ children }) => {
  // eslint-disable-next-line
  const [cookies, setCookie] = useCookies(['auth_token'])
  const user = sessionStorage.getItem('user')

  return cookies.auth_token && user ? children : <Navigate to='/' replace />
}
export default ProtectedRoute
