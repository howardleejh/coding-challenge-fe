import { Space } from 'antd'
import { useNavigate } from 'react-router-dom'
import { useCookies } from 'react-cookie'
import PillButton from '../Buttons/PillButton/PillButton'
import Login from '../Login/Login'
import './Welcome.scss'

const locations = ['dashboard', 'collections', 'profile']

const Welcome = () => {
  const user = JSON.parse(sessionStorage.getItem('user'))
  const navigate = useNavigate()
  // eslint-disable-next-line
  const [cookies, setCookie] = useCookies(['auth_token'])

  const navigationHandler = (e) => {
    navigate(`${e.target.id}`)
  }

  return (
    <div className='login-container'>
      <h2> Welcome to Mighty Jaxx!</h2>
      {user ? (
        <>
          <Space direction='vertical'>
            <h3 className='login-greeting'>
              Hello {`${user.first_name} ${user.last_name}!`}
            </h3>
            {locations.map((item) => {
              return (
                <PillButton
                  key={item}
                  title={item.toUpperCase()}
                  onClick={navigationHandler}
                  id={item}
                />
              )
            })}
          </Space>
        </>
      ) : (
        <Login />
      )}
    </div>
  )
}
export default Welcome
