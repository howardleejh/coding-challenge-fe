import { useState, useContext } from 'react'
import { HomeContext } from '../../Contexts/HomeProvider'
import { Form, Input, Button, message } from 'antd'
import { useCookies } from 'react-cookie'
import { useNavigate, Link } from 'react-router-dom'
import axios from 'axios'
import './Login.scss'

const Login = () => {
  const home = useContext(HomeContext)
  const [form] = Form.useForm()
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)
  // eslint-disable-next-line
  const [cookies, setCookie] = useCookies(['auth_token'])

  const onFinish = async (values) => {
    setLoading(true)
    const { email, password } = values
    let response
    try {
      response = await axios({
        method: 'post',
        url: `${process.env.REACT_APP_BE}/api/v1/login`,
        data: {
          email: email,
          password: password,
        },
      })
    } catch (err) {
      message.error(`Error: Your email or password is incorrect.`, 5)
      setLoading(false)
      return
    }
    setCookie('auth_token', response.data.token)
    home.loggedIn(response.data.token)
    form.resetFields()
    setLoading(false)
    message.success('Login successfully!', 5)
    navigate('/')
    return
  }

  const onFinishFailed = (errorInfo) => {
    message.error(`Please try to login again.`, 5)
  }

  const resetHandler = () => {
    form.resetFields()
  }

  return (
    <div className='login-form-container'>
      <Form
        form={form}
        name='login-form'
        layout='vertical'
        requiredMark={false}
        scrollToFirstError
        initialValues={{
          remember: true,
        }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete='off'
      >
        <Form.Item
          label='Email'
          name='email'
          rules={[
            {
              required: true,
              message: 'Please input your email address!',
              whitespace: true,
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label='Password'
          name='password'
          rules={[
            {
              required: true,
              message: 'Please input your password!',
              whitespace: true,
            },
          ]}
        >
          <Input.Password />
        </Form.Item>
        <h4>
          Not yet a member? Please register{' '}
          <span>
            <Link to='/register'>here</Link>
          </span>
          .
        </h4>
        <Form.Item>
          <Button type='primary' htmlType='submit' loading={loading}>
            Login
          </Button>
          <Button type='danger' onClick={resetHandler} loading={loading}>
            Reset
          </Button>
        </Form.Item>
      </Form>
    </div>
  )
}
export default Login
