import { Row } from 'antd'
import AddProduct from '../../Components/AddProduct/AddProduct'
import './AddProductPage.scss'

const AddProductPage = () => {
  return (
    <div className='add-product-page'>
      <Row align='middle' justify='center'>
        <AddProduct />
      </Row>
    </div>
  )
}
export default AddProductPage
