import { useState, useEffect } from 'react'
import {
  Row,
  Col,
  message,
  Form,
  Input,
  Button,
  PageHeader,
  Spin,
  InputNumber,
  Upload,
  Space,
  Modal,
} from 'antd'
import { useParams, useNavigate } from 'react-router-dom'
import { useCookies } from 'react-cookie'
import { UploadOutlined } from '@ant-design/icons'
import './ProductForm.scss'
import axios from 'axios'

const ProductForm = () => {
  const { productId } = useParams()
  const navigate = useNavigate()
  // eslint-disable-next-line
  const [cookies, setCookie] = useCookies(['auth_token'])
  const [form] = Form.useForm()
  const [product, setProduct] = useState(null)
  const [isEditing, setIsEditing] = useState(false)
  const [imageUpload, setImageUpload] = useState(null)
  const [isModalOpen, setIsModalOpen] = useState(false)

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
        method: 'patch',
        url: `http://localhost:8000/api/v1/products/update`,
        headers: {
          auth_token: cookies.auth_token,
        },
        data: {
          sku: productId,
          p_collection: values.collection,
          p_sub_collection: values.sub_collection,
          p_title: values.title,
          image: imageUpload ?? '',
          stock: values.stock,
        },
      })
      message.success(`message: Successfully updated`, 5)
      navigate('/collections')
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

  const toggleEditing = () => {
    if (isEditing) {
      form.resetFields()
      setIsEditing(false)
      return
    }
    setIsEditing(true)
    return
  }

  const deleteProductHandler = () => {
    isModalOpen ? setIsModalOpen(false) : setIsModalOpen(true)
    return
  }

  const cancelDeleteHandler = () => {
    message.warning(`Message: User canceled request.`)
    setIsModalOpen(false)
    return
  }

  const ConfirmDeleteProductHandler = async () => {
    try {
      await axios({
        method: 'delete',
        url: `http://localhost:8000/api/v1/products/${productId}/delete`,
        headers: {
          auth_token: cookies.auth_token,
        },
        data: {
          sku: productId,
        },
      })
      message.success(`message: Successfully deleted!`, 5)
      navigate('/collections')
    } catch (err) {
      message.error(`${err.response.data}`, 5)
      return
    }
  }

  useEffect(() => {
    const getProduct = async () => {
      let response
      try {
        response = await axios({
          method: 'get',
          url: `http://localhost:8000/api/v1/products/${productId}`,
          headers: {
            auth_token: cookies.auth_token,
          },
        })
      } catch (err) {
        message.error(`${err.response.data},`, 5)
        return
      }
      if (response.data) {
        setProduct(response.data)
        return
      }
    }

    getProduct()
    // eslint-disable-next-line
  }, [])

  return (
    <div className='product-form-container'>
      <PageHeader
        className='product-page-header'
        onBack={goBackHandler}
        subTitle={`Back to Collections`}
      />
      {product ? (
        <Row justify='center'>
          <Col xs={20} xl={12}>
            <h1>{product.p_title}</h1>
            <h4>{product.sku}</h4>
            <img
              src={
                product.image
                  ? product.image
                  : `https://via.placeholder.com/400`
              }
              alt='Product'
            />
          </Col>
          <Col xs={20} xl={12}>
            <Row align='middle' justify='center'>
              <Button
                type='primary'
                onClick={toggleEditing}
                className='toggle-edit-btn'
                size='large'
              >
                {isEditing ? `Stop Editing` : `Edit Product`}
              </Button>
              <Form
                form={form}
                name='product-form'
                layout='vertical'
                requiredMark={false}
                scrollToFirstError
                initialValues={{
                  title: `${product.p_title}`,
                  collection: `${product.p_collection}`,
                  sub_collection: `${product.p_sub_collection}`,
                  stock: `${
                    product.stock === null || undefined ? 0 : product.stock
                  }`,
                  remember: true,
                }}
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                autoComplete='off'
                disabled={isEditing ? false : true}
                className='product-form'
              >
                <Form.Item
                  label='Title'
                  name='title'
                  rules={[
                    {
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
                <Form.Item className={isEditing ? null : 'visibility'}>
                  <Space direction='horizontal'>
                    <Button type='primary' htmlType='submit'>
                      Update
                    </Button>
                    <Button type='danger' onClick={resetHandler}>
                      Reset
                    </Button>
                  </Space>
                </Form.Item>
              </Form>
              {isEditing ? (
                <></>
              ) : (
                <>
                  <Button
                    className='delete-product-btn'
                    type='danger'
                    size='large'
                    onClick={deleteProductHandler}
                  >
                    Delete Product
                  </Button>
                  <Modal
                    open={isModalOpen}
                    onOk={ConfirmDeleteProductHandler}
                    onCancel={cancelDeleteHandler}
                    centered
                    closable
                    className='product-form-modal'
                  >
                    <p> Are you sure you want to delete this product?</p>
                  </Modal>
                </>
              )}
            </Row>
          </Col>
        </Row>
      ) : (
        <Spin />
      )}
    </div>
  )
}
export default ProductForm