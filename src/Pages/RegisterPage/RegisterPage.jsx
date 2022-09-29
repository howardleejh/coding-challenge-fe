import { Row } from 'antd'
import Register from '../../Components/Register/Register'
import './RegisterPage.scss'

const RegisterPage = () => {
  return (
    <div className='register-page'>
      <Row align='middle' justify='center'>
        <Register />
      </Row>
    </div>
  )
}
export default RegisterPage
