import { useState, useEffect } from 'react'
import { useCookies } from 'react-cookie'
import { Row, Spin, Select, Button, message } from 'antd'
import { useNavigate } from 'react-router-dom'
import CollectionCard from '../CollectionCard/CollectionCard'
import axios from 'axios'
import './Products.scss'

const Products = () => {
  const navigate = useNavigate()
  const { Option } = Select
  // eslint-disable-next-line
  const [cookies, setCookie] = useCookies(['auth_token'])
  const [products, setProducts] = useState(null)
  const [collections, setCollections] = useState(null)
  const [subCollections, setSubCollections] = useState(null)
  const [collectionsInput, setCollectionsInput] = useState(null)
  const [subCollectionsInput, setSubCollectionsInput] = useState(null)
  const [filtered, setFiltered] = useState([])

  const changeCollectionHandler = (values) => {
    setCollectionsInput(values)
    return
  }

  const changeSubCollectionHandler = (values) => {
    setSubCollectionsInput(values)
    return
  }

  const SearchHandler = () => {
    const inputs = [collectionsInput, subCollectionsInput]

    const filtered = products.filter((item) => {
      if (inputs[0] && inputs[1]) {
        return (
          item.p_collection === inputs[0] && item.p_sub_collection === inputs[1]
        )
      }
      return (
        item.p_collection === inputs[0] || item.p_sub_collection === inputs[1]
      )
    })
    setFiltered(filtered)
    return
  }

  const resetHandler = () => {
    setCollectionsInput(null)
    setSubCollectionsInput(null)
    setFiltered([])
  }

  const addProductHandler = () => {
    navigate('/collections/add-product')
    return
  }

  useEffect(() => {
    const getProducts = async () => {
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
        message.error(`${err.response.data}`)
        return
      }
    }

    getProducts().then((results) => {
      if (!results) {
        return
      }

      setProducts(results)

      const collectionsSet = new Set()
      const subCollectionsSet = new Set()

      results.forEach((item) => {
        collectionsSet.add(item.p_collection)
        subCollectionsSet.add(item.p_sub_collection)
      })
      const collectionsArr = Array.from(collectionsSet)
      const subCollectionsArr = Array.from(subCollectionsSet)

      for (const index in subCollectionsArr) {
        if (subCollectionsArr[index] === '') {
          subCollectionsArr.splice(index, 1)
        }
      }
      setCollections(collectionsArr)
      setSubCollections(subCollectionsArr)
    })
    // eslint-disable-next-line
  }, [])

  return (
    <div className='products'>
      <Row align='middle' justify='center' className='products-search'>
        <ul>
          <li>
            <h3>Filter Collections</h3>
          </li>
          <li>
            <Select
              value={collectionsInput}
              placeholder='Select a Collection'
              onChange={changeCollectionHandler}
              allowClear
            >
              {collections ? (
                collections.map((item) => {
                  return (
                    <Option key={item} value={item}>
                      {item}
                    </Option>
                  )
                })
              ) : (
                <></>
              )}
            </Select>
          </li>
          <li>
            <Select
              value={subCollectionsInput}
              placeholder='Select a Sub Collection'
              onChange={changeSubCollectionHandler}
              allowClear
            >
              {subCollections ? (
                subCollections.map((item) => {
                  return (
                    <Option key={item} value={item}>
                      {item}
                    </Option>
                  )
                })
              ) : (
                <></>
              )}
            </Select>
          </li>
          <li>
            <Button type='primary' onClick={addProductHandler}>
              Add Product
            </Button>
          </li>
          <li>
            <Button type='primary' onClick={SearchHandler}>
              Search!
            </Button>
          </li>
          <li>
            <Button type='danger' onClick={resetHandler}>
              Reset
            </Button>
          </li>
        </ul>
      </Row>
      {products ? (
        <Row className='products-list'>
          {filtered.length !== 0 ? (
            filtered.map((product) => {
              return (
                <CollectionCard
                  key={product.sku}
                  title={product.p_title}
                  collection={product.p_collection}
                  sub_collection={product.p_sub_collection}
                  sku={product.sku}
                  id={product.sku}
                  stock={product.stock}
                  image={product.image}
                  className='products-card'
                />
              )
            })
          ) : products ? (
            products.map((product) => {
              return (
                <CollectionCard
                  key={product.sku}
                  title={product.p_title}
                  collection={product.p_collection}
                  sub_collection={product.p_sub_collection}
                  sku={product.sku}
                  id={product.sku}
                  stock={product.stock}
                  image={product.image}
                  className='products-card'
                />
              )
            })
          ) : (
            <></>
          )}
        </Row>
      ) : (
        <Spin />
      )}
    </div>
  )
}
export default Products
