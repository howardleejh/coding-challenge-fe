import { useEffect } from 'react'
import { Row, message } from 'antd'
import Welcome from '../../Components/Welcome/Welcome'
import axios from 'axios'
import './Homepage.scss'

const Homepage = () => {
  useEffect(() => {
    const checkServer = async () => {
      let response
      try {
        response = await axios({
          method: 'get',
          url: `${process.env.REACT_APP_BE}/`,
        })
        if (response.status !== 200) {
          message.error(`Waiting for server.`, 5)
          checkServer()
          return
        }
        message.success(response.data)
        return
      } catch (err) {
        message.error(`${err.response.data}`)
        return
      }
    }

    checkServer()
  }, [])

  return (
    <div className='homepage'>
      <Row align='middle' justify='center'>
        <Welcome />
      </Row>
    </div>
  )
}
export default Homepage
