import { Row } from 'antd'
import ProductForm from '../../Components/ProductForm/ProductForm'
import './ProductPage.scss'

const ProductPage = () => {
  return (
    <div className='product-page'>
      <Row align='middle' justify='center'>
        <ProductForm />
      </Row>
    </div>
  )
}
export default ProductPage
