import { Row } from 'antd'
import Status from '../../Components/Status/Status'
import './Dashboard.scss'

const Dashboard = () => {
  return (
    <div className='dashboard'>
      <Row align='middle' justify='center'>
        <Status />
      </Row>
    </div>
  )
}
export default Dashboard
