import { useState, useEffect } from 'react'
import {
  Row,
  Col,
  message,
  Form,
  Input,
  Button,
  PageHeader,
  InputNumber,
  Upload,
  Space,
} from 'antd'
import { useNavigate } from 'react-router-dom'
import { useCookies } from 'react-cookie'
import { UploadOutlined } from '@ant-design/icons'
import axios from 'axios'
import './AddProduct.scss'

const AddProduct = () => {
  const navigate = useNavigate()
  // eslint-disable-next-line
  const [cookies, setCookie] = useCookies(['auth_token'])
  const [form] = Form.useForm()
  const [imageUpload, setImageUpload] = useState(null)

  const props = {
    name: 'file',
    method: 'post',
    action: `https://api.cloudinary.com/v1_1/${process.env.REACT_APP_CLOUD_NAME}/auto/upload`,
    data: {
      upload_preset: `${process.env.REACT_APP_UPLOAD_PRESET}`,
    },

    onChange(info) {
      if (info.file.status === 'done') {
        setImageUpload(`${info.file.response.secure_url}`)
        message.success(`${info.file.name} file uploaded successfully`, 5)
        return
      } else if (info.file.status === 'error') {
        message.error(`${info.file.name} file upload failed.`, 5)
        return
      }
    },

    progress: {
      strokeColor: {
        '0%': '#108ee9',
        '100%': '#87d068',
      },
      strokeWidth: 3,
      format: (percent) => percent && `${parseFloat(percent.toFixed(2))}%`,
    },
  }

  const goBackHandler = () => {
    navigate('/collections')
  }

  const onFinish = async (values) => {
    try {
      await axios({
        method: 'post',
        url: `${process.env.REACT_APP_BE}/api/v1/products/create`,
        headers: {
          auth_token: cookies.auth_token,
        },
        data: {
          p_collection: values.collection,
          p_sub_collection: values.sub_collection,
          p_title: values.title,
          image: imageUpload ?? '',
          stock: values.stock ?? '',
        },
      })
      message.success(`message: Successfully created`, 5)
      form.resetFields()
      setImageUpload(null)
      return
    } catch (err) {
      message.error(`${err.response.data}`, 5)
      return
    }
  }

  const onFinishFailed = (err) => {
    message.error(`Error: ${err}`, 5)
    return
  }

  const resetHandler = () => {
    form.resetFields()
    return
  }

  useEffect(() => {}, [imageUpload])

  return (
    <div className='new-product-form-container'>
      <PageHeader
        className='new-product-page-header'
        onBack={goBackHandler}
        subTitle={`Back to Collections`}
      />
      <Row justify='center'>
        <Col xs={20} xl={12}>
          <h1>Add New Product</h1>
          <img
            src={imageUpload ?? 'https://via.placeholder.com/400'}
            alt='Product'
          />
        </Col>
        <Col xs={20} xl={12}>
          <Row align='middle' justify='center'>
            <Form
              form={form}
              name='new-product-form'
              layout='vertical'
              requiredMark={false}
              scrollToFirstError
              initialValues={{
                remember: true,
              }}
              onFinish={onFinish}
              onFinishFailed={onFinishFailed}
              autoComplete='off'
              className='new-product-form'
            >
              <Form.Item
                label='Title'
                name='title'
                rules={[
                  {
                    required: true,
                    message: 'Please provide title of collection.',
                    whitespace: true,
                  },
                ]}
              >
                <Input />
              </Form.Item>
              <Form.Item
                label='Collection'
                name='collection'
                rules={[
                  {
                    required: true,
                    message: 'Please provide a collection name.',
                    whitespace: true,
                  },
                ]}
              >
                <Input />
              </Form.Item>
              <Form.Item
                label='Sub Collection'
                name='sub_collection'
                rules={[
                  {
                    message: 'Please provide a sub collection if available.',
                    whitespace: true,
                  },
                ]}
              >
                <Input />
              </Form.Item>
              <Form.Item
                label='Stock'
                name='stock'
                rules={[
                  {
                    type: Number,
                    message: 'Please only insert integers',
                    whitespace: true,
                  },
                ]}
              >
                <InputNumber />
              </Form.Item>
              <Form.Item>
                <Upload {...props} className='product-img-upload'>
                  <Button type='primary' icon={<UploadOutlined />}>
                    Update Image
                  </Button>
                </Upload>
              </Form.Item>
              <Form.Item>
                <Space direction='horizontal'>
                  <Button type='primary' htmlType='submit'>
                    Add Item
                  </Button>
                  <Button type='danger' onClick={resetHandler}>
                    Reset
                  </Button>
                </Space>
              </Form.Item>
            </Form>
          </Row>
        </Col>
      </Row>
    </div>
  )
}
export default AddProduct
