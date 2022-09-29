import { useState } from 'react'
import { Form, Input, Button, message } from 'antd'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import './Register.scss'

const Register = () => {
  const [form] = Form.useForm()
  const navigate = useNavigate()

  const [loading, setLoading] = useState(false)

  const onFinish = async (values) => {
    setLoading(true)
    const [firstName, lastName] = values.fullName.trim().split(' ')

    if (values.password !== values.repeatPassword) {
      message.error('Passwords do not match!', 5)
      setLoading(false)
      return
    }

    try {
      await axios({
        method: 'post',
        url: `${process.env.REACT_APP_BE}/api/v1/register`,
        data: {
          first_name: firstName,
          last_name: lastName,
          email: values.email,
          password: values.password,
          repeat_password: values.repeatPassword,
        },
      })
      setLoading(false)
      form.resetFields()
      message.success(
        'Registered successfully! Redirecting to Log In in 3 seconds.',
        5
      )
      setLoading(false)
      setTimeout(() => {
        navigate('/')
      }, 3000)
      return
    } catch (err) {
      message.error(`${err.response.data}`, 5)
      setLoading(false)
      return
    }
  }

  const onFinishFailed = () => {
    message.error(`Please fill in the required fields`, 5)
  }

  const resetHandler = () => {
    form.resetFields()
  }

  return (
    <div className='register-form-container'>
      <h2>Registration</h2>
      <Form
        form={form}
        name='register-form'
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
          label='Full Name'
          name='fullName'
          rules={[
            {
              required: true,
              message: 'Please provide your Full name with a space.',
              whitespace: true,
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label='Email'
          name='email'
          rules={[
            {
              type: 'email',
              required: true,
              message: 'Please provide a valid email.',
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
              message: 'Please provide a valid password.',
              whitespace: true,
            },
          ]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item
          label='Confirm Password'
          name='repeatPassword'
          rules={[
            {
              required: true,
              message: 'Please ensure password matches.',
              whitespace: true,
            },
          ]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item>
          <Button type='primary' htmlType='submit' loading={loading}>
            Register
          </Button>
          <Button type='danger' onClick={resetHandler} loading={loading}>
            Reset
          </Button>
        </Form.Item>
      </Form>
    </div>
  )
}
export default Register
