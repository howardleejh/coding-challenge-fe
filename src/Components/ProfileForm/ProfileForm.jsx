import { useState } from 'react'
import { useCookies } from 'react-cookie'
import axios from 'axios'
import { Form, Input, Button, message, Modal } from 'antd'
import './ProfileForm.scss'

const ProfileForm = () => {
  const [form] = Form.useForm()
  const user = JSON.parse(sessionStorage.getItem('user'))
  // eslint-disable-next-line
  const [cookies, setCookie, removeCookie] = useCookies()
  const [isEditing, setIsEditing] = useState(false)
  const [isModalOpen, setIsModalOpen] = useState(false)

  const onFinish = async (values) => {
    const [firstName, lastName] = values.fullName.trim().split(' ')

    if (values.password !== values.repeatPassword) {
      message.error('Passwords do not match!', 5)
      return
    }

    try {
      await axios({
        method: 'patch',
        url: `http://localhost:8000/api/v1/profile`,
        headers: {
          auth_token: cookies.auth_token,
        },
        data: {
          initial_email: user.email,
          first_name: firstName,
          last_name: lastName,
          email: values.email,
          password: values.password,
          repeat_password: values.repeatPassword,
        },
      })
    } catch (err) {
      message.error(`${err.response.data}`, 5)
      return
    }
    removeCookie('auth_token', { path: '/' })
    sessionStorage.clear()
    message.success('Profile updated successfully!', 5)
    return
  }

  const onFinishFailed = () => {
    message.error('Please try again', 5)
    return
  }

  const resetHandler = () => {
    form.resetFields()
    return
  }

  const setIsEditingHandler = () => {
    if (isEditing) {
      form.resetFields()
      setIsEditing(false)
      return
    }
    setIsEditing(true)
    return
  }

  const deleteProfileHandler = () => {
    isModalOpen ? setIsModalOpen(false) : setIsModalOpen(true)
    return
  }

  const cancelDeleteHandler = () => {
    message.warning(`Message: User canceled request.`)
    setIsModalOpen(false)
    return
  }

  const confirmDeleteHandler = async () => {
    try {
      await axios({
        method: 'delete',
        url: `http://localhost:8000/api/v1/profile`,
        headers: {
          auth_token: cookies.auth_token,
        },
        data: {
          email: user.email,
        },
      })
    } catch (err) {
      message.error(`${err.response.data}`, 5)
      return
    }
    setIsModalOpen(false)
    removeCookie('auth_token', { path: '/' })
    sessionStorage.clear()
    message.success('Profile deleted successfully!', 5)
    return
  }

  return (
    <div className='profile-form-container'>
      <Button
        size='large'
        type='primary'
        className='edit-profile-button'
        onClick={setIsEditingHandler}
      >
        {isEditing ? 'STOP EDITING' : 'EDIT PROFILE'}
      </Button>
      <Form
        form={form}
        name='profile-form'
        layout='vertical'
        requiredMark={false}
        scrollToFirstError
        initialValues={
          user
            ? {
                fullName: `${user.first_name} ${user.last_name}`,
                email: user.email,
                remember: true,
              }
            : null
        }
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete='off'
        disabled={isEditing ? false : true}
      >
        <Form.Item
          label='Full Name'
          name='fullName'
          rules={[
            {
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
              message: 'Please ensure password matches.',
              whitespace: true,
            },
          ]}
        >
          <Input.Password />
        </Form.Item>

        {isEditing ? (
          <>
            <Form.Item>
              <Button type='primary' htmlType='submit'>
                Submit
              </Button>
              <Button type='danger' onClick={resetHandler}>
                Reset
              </Button>
            </Form.Item>
          </>
        ) : (
          <></>
        )}
      </Form>
      {isEditing ? (
        <></>
      ) : (
        <Button
          size='large'
          type='danger'
          className='delete-profile-button'
          onClick={deleteProfileHandler}
        >
          DELETE PROFILE
        </Button>
      )}
      <Modal
        open={isModalOpen}
        onOk={confirmDeleteHandler}
        onCancel={cancelDeleteHandler}
        centered
        closable
        className='profile-form-modal'
      >
        <p> Are you sure you want to delete your account?</p>
      </Modal>
    </div>
  )
}
export default ProfileForm