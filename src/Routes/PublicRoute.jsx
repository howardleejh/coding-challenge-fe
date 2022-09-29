import { useCookies } from 'react-cookie'
import { Navigate } from 'react-router-dom'

const PublicRoute = ({ children }) => {
  // eslint-disable-next-line
  const [cookies, setCookie] = useCookies(['auth_token'])
  const user = sessionStorage.getItem('user')

  return cookies.auth_token && user ? (
    <Navigate to='/dashboard' replace />
  ) : (
    children
  )
}
export default PublicRoute
