import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Row, Col, Spin, Descriptions, message, Checkbox } from 'antd'
import { useCookies } from 'react-cookie'
import PillButton from '../Buttons/PillButton/PillButton'
import axios from 'axios'
import './Status.scss'

const Status = () => {
  const user = JSON.parse(sessionStorage.getItem('user'))
  const navigate = useNavigate()
  // eslint-disable-next-line
  const [cookies, setCookie] = useCookies(['auth_token'])
  const [checkboxState, setCheckboxState] = useState(false)
  const [collectionItems, setCollectionItems] = useState(null)
  const [status, setStatus] = useState(null)

  const getCollections = async () => {
    let response

    try {
      response = await axios({
        method: 'get',
        url: `${process.env.REACT_APP_BE}/api/v1/products`,
        headers: {
          auth_token: cookies.auth_token,
        },
      })
      return response.data
    } catch (err) {
      message.error(`${err.response.data}`, 5)
      return
    }
  }

  const getStatus = (data) => {
    const collectionsArr = []
    const subCollectionsArr = []

    if (!data) {
      return
    }

    data.forEach((item) => {
      if (item.p_sub_collection !== undefined) {
        subCollectionsArr.push(item.p_sub_collection)
      }
      collectionsArr.push(item.p_collection)
    })

    const collections = new Set(collectionsArr)
    const subCollections = new Set(subCollectionsArr)

    setStatus({
      collections: collections.size,
      subCollections: subCollections.size,
      total: data.length,
    })
    return
  }

  const checkBoxHandler = () => {
    if (checkboxState === false) {
      setCheckboxState(true)
      const userItems = collectionItems.filter(
        (item) => item.createdBy === user.id
      )
      getStatus(userItems)
      return
    }
    getCollections().then((data) => {
      getStatus(data)
    })
    setCheckboxState(false)
    return
  }

  const collectionsHandler = () => {
    navigate('/collections')
  }

  useEffect(() => {
    getCollections().then((data) => {
      setCollectionItems(data)
      getStatus(data)
    })

    // eslint-disable-next-line
  }, [])

  return (
    <div className='dashboard-status'>
      <Row align='middle' justify='center'>
        <Col>
          {user ? (
            <>
              <h1>{`${user.first_name} ${user.last_name}`}</h1>
              <span className='user-label'>Email</span>
              <h3>{`${user.email}`}</h3>
              <span className='user-label'>Employee ID</span>
              <h4>{`${user.id}`}</h4>
            </>
          ) : (
            <Spin />
          )}
        </Col>
      </Row>
      <Row align='middle' justify='center' className='user-status'>
        <Descriptions bordered layout='vertical'>
          <Descriptions.Item label='Collections'>
            {status ? status.collections : <Spin />}
          </Descriptions.Item>
          <Descriptions.Item label='Sub Collections'>
            {status ? status.subCollections : <Spin />}
          </Descriptions.Item>
          <Descriptions.Item label='Total Products'>
            {status ? status.total : <Spin />}
          </Descriptions.Item>
        </Descriptions>
      </Row>

      <Col>
        <Checkbox
          checked={checkboxState}
          onChange={checkBoxHandler}
          className='dashboard-checkbox'
        >
          Display my collections only
        </Checkbox>
      </Col>
      <Col>
        <PillButton title='Go to Collections' onClick={collectionsHandler} />
      </Col>
    </div>
  )
}
export default Status
