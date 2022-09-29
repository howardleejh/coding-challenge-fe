import { Row, Col } from 'antd'
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import { useCookies } from 'react-cookie'
import ProfileMenu from '../ProfileMenu/ProfileMenu'
import PillButton from '../Buttons/PillButton/PillButton'
import logo from '../../Assets/Images/MJLogo.svg'
import './Navbar.scss'

const Navbar = () => {
  const user = JSON.parse(sessionStorage.getItem('user'))
  const navigate = useNavigate()
  // eslint-disable-next-line
  const [cookies, setCookie, removeCookie] = useCookies(['auth_token'])

  const registerHandler = () => {
    if (!cookies.auth_token) {
      navigate('/register')
      return
    }
  }

  const logoutHandler = () => {
    removeCookie('auth_token', { path: '/' })
    sessionStorage.clear()
    return
  }

  return (
    <div className='navbar'>
      <Row align='middle' justify='space-between'>
        <Col>
          <Link to='/'>
            <img src={logo} alt='Organization Logo' className='logo' />
          </Link>
        </Col>
        <Col>
          {user ? (
            <>
              <Row align='middle'>
                <Col>
                  <ProfileMenu
                    name={user ? user.first_name : 'U'}
                    className='profile-avatar'
                  />
                </Col>
                <Col>
                  <PillButton
                    title='Logout'
                    onClick={logoutHandler}
                    className='log-out-btn'
                  />
                </Col>
              </Row>
            </>
          ) : (
            <PillButton title='Register' onClick={registerHandler} />
          )}
        </Col>
      </Row>
    </div>
  )
}
export default Navbar
