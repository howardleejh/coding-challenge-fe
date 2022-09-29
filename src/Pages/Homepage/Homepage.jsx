import { Row } from 'antd'
import Welcome from '../../Components/Welcome/Welcome'
import './Homepage.scss'

const Homepage = () => {
  return (
    <div className='homepage'>
      <Row align='middle' justify='center'>
        <Welcome />
      </Row>
    </div>
  )
}
export default Homepage
